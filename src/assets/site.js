(() => {
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
