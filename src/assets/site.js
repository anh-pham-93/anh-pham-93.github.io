(() => {
  const TURNSTILE_SITE_KEY = '0x4AAAAAAEXTc3f55Ww5Vs0y';
  const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('site-nav');

  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('is-menu-open', open);
    });
    nav.addEventListener('click', closeMenu);
  }

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm instanceof HTMLFormElement) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = contactForm.querySelector('[data-submit-label]');
    const status = contactForm.querySelector('[data-form-status]');
    const messageField = contactForm.querySelector('#contact-message');
    const messageCount = contactForm.querySelector('[data-message-count]');
    const actions = contactForm.querySelector('.contact-form-actions');
    const defaultSubmitLabel = submitLabel?.textContent || 'Send note';
    let turnstileWidgetId = null;

    function updateMessageCount() {
      if (!(messageField instanceof HTMLTextAreaElement) || !messageCount) return;
      messageCount.textContent = String(messageField.value.length);
    }

    function setFormStatus(message, state = '') {
      if (!status) return;
      status.textContent = message;
      if (state) status.dataset.state = state;
      else delete status.dataset.state;
    }

    function setSubmitting(isSubmitting, label = 'Sending...') {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = isSubmitting;
        submitButton.setAttribute('aria-busy', String(isSubmitting));
      }
      if (submitLabel) submitLabel.textContent = isSubmitting ? label : defaultSubmitLabel;
    }

    function resetTurnstile() {
      if (turnstileWidgetId === null || !window.turnstile) return;
      window.turnstile.reset(turnstileWidgetId);
    }

    function renderTurnstile() {
      if (!window.turnstile || !actions || turnstileWidgetId !== null) return;
      const container = document.createElement('div');
      container.className = 'contact-turnstile';
      actions.before(container);
      turnstileWidgetId = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        theme: 'light',
        size: 'flexible',
        'error-callback': () => {
          setFormStatus('Verification could not load. Please refresh the page or use the direct email link.', 'error');
        }
      });
    }

    function loadTurnstile() {
      if (window.turnstile) {
        renderTurnstile();
        return;
      }
      const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
      if (existing) {
        existing.addEventListener('load', renderTurnstile, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', renderTurnstile, { once: true });
      document.head.appendChild(script);
    }

    updateMessageCount();
    messageField?.addEventListener('input', updateMessageCount);
    loadTurnstile();

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const endpoint = contactForm.dataset.formEndpoint?.trim() || '';
      const fallbackEmail = contactForm.dataset.fallbackEmail?.trim() || '';
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const honeypot = String(formData.get('_gotcha') || '').trim();
      const turnstileToken = String(formData.get('cf-turnstile-response') || '').trim();

      if (honeypot) {
        contactForm.reset();
        updateMessageCount();
        setFormStatus('Message sent. Thanks - it is now in my inbox.', 'success');
        status?.focus();
        return;
      }

      if (!endpoint) {
        if (!fallbackEmail) {
          setFormStatus('This form is not configured yet. Please use the LinkedIn link beside it.', 'error');
          status?.focus();
          return;
        }
        const subject = `Message from ${name || 'a visitor to anhpham.me'}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        setFormStatus('Opening your email app with this message filled in...', 'sending');
        window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return;
      }

      if (!turnstileToken) {
        setFormStatus('Please wait a moment for the security check to finish, then try again.', 'error');
        status?.focus();
        return;
      }

      setSubmitting(true);
      setFormStatus('Sending your message...', 'sending');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          let errorMessage = response.status === 429
            ? 'Too many messages were sent recently. Please wait a moment and try again.'
            : 'That did not go through. Please try again or use the direct email link beside the form.';
          const responseData = await response.json().catch(() => null);
          if (responseData?.error) errorMessage = responseData.error;
          else if (responseData?.errors?.length) {
            const details = responseData.errors.map((item) => item.message).filter(Boolean).join(' ');
            if (details) errorMessage = details;
          }
          throw new Error(errorMessage);
        }

        contactForm.reset();
        updateMessageCount();
        setFormStatus('Message sent. Thanks - it is now in my inbox.', 'success');
        status?.focus();
      } catch (error) {
        setFormStatus(
          error instanceof Error && error.message
            ? error.message
            : 'That did not go through. Please try again or use the direct email link beside the form.',
          'error'
        );
        status?.focus();
      } finally {
        setSubmitting(false);
        resetTurnstile();
      }
    });
  }

  const dialogBackdrop = document.getElementById('dialog-backdrop');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCopy = document.getElementById('dialog-copy');
  const dialogClose = document.getElementById('dialog-close');
  let dialogReturnFocus = null;

  function openDialog(title, copy) {
    if (!dialogBackdrop || !dialogTitle || !dialogCopy || !dialogClose) return;
    dialogReturnFocus = document.activeElement;
    dialogTitle.textContent = title;
    dialogCopy.textContent = copy;
    dialogBackdrop.classList.add('is-open');
    dialogBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-dialog-open');
    dialogClose.focus();
  }

  function closeDialog() {
    if (!dialogBackdrop) return;
    dialogBackdrop.classList.remove('is-open');
    dialogBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-dialog-open');
    if (dialogReturnFocus instanceof HTMLElement) dialogReturnFocus.focus();
  }

  document.addEventListener('click', (event) => {
    const coffee = event.target.closest('[data-coffee]');
    if (coffee) {
      openDialog(
        'Buy me a ca phe sua da',
        'The button is ready. Add your Buy Me a Coffee, Ko-fi, or other support URL in src/site.json before launch.'
      );
    }
  });

  if (dialogClose) dialogClose.addEventListener('click', closeDialog);
  if (dialogBackdrop) {
    dialogBackdrop.addEventListener('click', (event) => {
      if (event.target === dialogBackdrop) closeDialog();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialogBackdrop?.classList.contains('is-open')) closeDialog();
  });
})();
