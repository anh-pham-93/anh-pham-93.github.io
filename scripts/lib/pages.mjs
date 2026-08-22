import { site, experience, url, asset, escapeHtml, renderBlocks, renderCaseSections } from './context.mjs';
import { footer, layout } from './components.mjs';

function aboutPage() {
  const role = site.currentRole;
  const content = `
  <main id="main-content" class="page-main">
    <section class="parallax-stage" id="parallax-stage" aria-labelledby="about-hero-title">
      <div class="parallax-sticky">
        <div class="parallax-media" aria-hidden="true"><img src="${asset('about-hero-sunrise.jpeg')}" alt=""></div>
        <div class="parallax-shade" aria-hidden="true"></div>
        <div class="parallax-noise" aria-hidden="true"></div>
        <div class="hero-copy">
          <h1 id="about-hero-title">Hi, I&rsquo;m<br>${escapeHtml(site.name)}.</h1>
          <p class="hero-role">Product at <em>${escapeHtml(role.company)}</em>.</p>
          <p class="hero-summary">I turn complex product and data problems into clear decisions, useful systems and work that teams can actually ship.</p>
          <div class="hero-actions">
            <a class="button" href="#about-intro">Get to know me <span aria-hidden="true">&darr;</span></a>
            <span class="hero-start">${escapeHtml(role.area)} &middot; ${escapeHtml(role.status)}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="about-sheet" id="about-intro">
      <section class="about-section">
        <div class="shell">
          <div class="about-lead-grid">
            <div>
              <p class="section-number">04 / About</p>
              <h2 class="about-heading">A little bit more about me.</h2>
            </div>
            <div class="about-copy">
              <p class="lead">I started in energy and offshore project delivery, moved through retail compliance and localisation, and eventually found my way into digital product work.</p>
              <p>It doesn't look coherent on the surface, but underneath it: I enjoy understanding complicated systems, working across different groups, and making decisions when the answer is not obvious.</p>
              <p>Outside work, I translate books from English to Vietnamese (been doing that for 8 years), read (big fan of Haruki Murakami), run (or at least try to), and play games with my daughter on our Switch 2 (we're both huge fans of Pokemon).</p>
              <div class="hero-actions">
                <a class="button" href="${url('/work/')}">See my work <span aria-hidden="true">&rarr;</span></a>
                <a class="text-link" href="${url('/contact/')}">Say hello <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </div>

          <div class="facts-grid" aria-label="A few facts about Anh">
            <article class="fact"><p class="fact-label">${escapeHtml(role.statusLabel)}</p><strong>${escapeHtml(role.company)}</strong><p>${escapeHtml(role.title)}, ${escapeHtml(role.area)}.</p></article>
            <article class="fact"><p class="fact-label">Location</p><strong>Auckland</strong><p>New Zealand.</p></article>
            <article class="fact"><p class="fact-label">Translation</p><strong>9 books</strong><p>Published English-to-Vietnamese titles.</p></article>
            <article class="fact"><p class="fact-label">Current habit</p><strong>Running</strong><p>Embarrassingly slow and steady.</p></article>
          </div>

          <div class="link-panels" aria-label="Explore the site">
            <a class="link-panel" href="${url('/work/')}"><span class="symbol" aria-hidden="true">&nearr;</span><h3>Work</h3><p>My current role and what I've done in the past.</p><span class="arrow" aria-hidden="true">&rarr;</span></a>
            <a class="link-panel" href="${url('/writing/')}"><span class="symbol" aria-hidden="true">&#9998;</span><h3>Writing</h3><p>Where I jot down my thoughts about random topics.</p><span class="arrow" aria-hidden="true">&rarr;</span></a>
            <a class="link-panel" href="${url('/hobbies/')}"><span class="symbol" aria-hidden="true">&#9671;</span><h3>Hobbies</h3><p>What I do to wind down, have a look if you're curious.</p><span class="arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </section>
      ${footer()}
    </div>
  </main>`;
  return layout({ title: site.name, current: 'about', content, overlay: true, aboutScript: true, route: '/' });
}

function workPage(workItems) {
  const role = site.currentRole;
  const workRows = workItems.map(({ data }) => `
    <article class="work-item">
      <div class="work-meta"><span>${escapeHtml(data.meta1 || data.period)}</span><span>${escapeHtml(data.meta2 || data.company)}</span></div>
      <div class="work-copy"><p class="work-kicker">${escapeHtml(data.kicker)}</p><h3>${escapeHtml(data.title)}</h3><p>${escapeHtml(data.summary)}</p></div>
      <a class="text-link work-action" href="${url(`/work/${data.slug}/`)}">View case study <span aria-hidden="true">&nearr;</span></a>
    </article>`).join('');

  const timeline = experience.map((item) => `
    <li><span class="timeline-year">${escapeHtml(item.period)}</span><div><h3>${escapeHtml(item.role)} &middot; ${escapeHtml(item.company)}</h3><p>${escapeHtml(item.summary)}</p></div></li>`).join('');

  const content = `
  <main id="main-content" class="inner-main">
    <section class="page-section">
      <div class="shell">
        <div class="section-heading">
          <p class="section-number">01 / Work</p>
          <div><h1>Selected product work</h1><p>A first look at the product problems and systems I have been responsible for. Detailed case studies will only include information that is safe and useful to publish.</p></div>
        </div>
        <div class="next-chapter"><span class="label">${escapeHtml(role.statusLabel)}</span><strong>${escapeHtml(role.title)} &middot; ${escapeHtml(role.area)} at ${escapeHtml(role.company)}</strong><span>${escapeHtml(role.status)}</span></div>
        <div class="work-list">${workRows}</div>
        <section class="career-block" aria-labelledby="career-title">
          <div class="career-intro"><p class="section-number">Career path</p><h2 id="career-title">Not a straight line &mdash; and better for it.</h2><p>My work has moved through energy-market development, offshore project delivery, retail compliance and digital products. Each role changed how I understand systems, risk and collaboration.</p></div>
          <ol class="timeline">${timeline}</ol>
        </section>
      </div>
    </section>
    ${footer()}
  </main>`;
  return layout({ title: 'Work', description: 'Selected product work and career experience from Anh Pham.', current: 'work', content, route: '/work/' });
}

function writingPage(posts) {
  const hasPosts = posts.length > 0;
  const introTitle = hasPosts ? 'Writing.' : 'Writing, eventually.';
  const introCopy = hasPosts
    ? 'Essays, notes, reviews and anything else that became worth finishing.'
    : 'A place for essays, notes, reviews and anything else worth finishing. I&rsquo;m leaving it empty rather than filling it with demo content.';
  const body = hasPosts
    ? `<div class="post-list">${posts.map(({ data }) => `
        <a class="post-row" href="${url(`/writing/${data.slug}/`)}">
          <time datetime="${escapeHtml(data.date || '')}">${escapeHtml(data.displayDate || data.date || '')}</time>
          <div><h2>${escapeHtml(data.title)}</h2><p>${escapeHtml(data.description || '')}</p></div>
          <span class="arrow" aria-hidden="true">&nearr;</span>
        </a>`).join('')}</div>`
    : `<div class="empty-editorial" aria-label="No posts yet"><p class="empty-label">No posts yet</p><blockquote class="empty-quote">&ldquo;The first one will arrive when it is ready.&rdquo;</blockquote><span class="empty-mark" aria-hidden="true">&#10035;</span></div>`;
  const content = `
  <main id="main-content" class="inner-main writing-page">
    <section class="page-section"><div class="shell">
      <div class="section-heading"><p class="section-number">02 / Writing</p><div><h1>${introTitle}</h1><p>${introCopy}</p></div></div>
      ${body}
      <div class="writing-note"><p class="section-number">What belongs here</p><p>The subject is intentionally open. A post can be about product, a book, memory, work, or something that has nothing to do with any of those.</p></div>
    </div></section>
    ${footer()}
  </main>`;
  return layout({ title: 'Writing', description: 'Writing by Anh Pham.', current: 'writing', content, route: '/writing/' });
}

function hobbySymbol(symbol) {
  if (symbol === 'arrow') return '&nearr;';
  if (symbol === 'wave') return '&#8761;';
  return '&#9671;';
}

function hobbiesPage(hobbies) {
  const cards = hobbies.map(({ data }) => {
    const featured = data.theme === 'featured';
    const size = data.size || 'standard';
    const stat = data.stat ? `<p class="hobby-stat"><strong>${escapeHtml(data.stat)}</strong> ${escapeHtml(data.statLabel || '')}</p>` : '';
    const books = featured ? '<div class="book-lines" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>' : '';
    const symbol = featured ? '' : `<span class="hobby-symbol" aria-hidden="true">${hobbySymbol(data.symbol)}</span>`;
    return `
      <a class="hobby-card hobby-card-link size-${escapeHtml(size)}${featured ? ' is-featured' : ''}" href="${url(`/hobbies/${data.slug}/`)}">
        <div class="hobby-topline"><span>${escapeHtml(data.title)}</span><span>${escapeHtml(data.subtitle || '')}</span></div>
        <div class="hobby-content">${stat}<h2>${escapeHtml(data.headline)}</h2><p>${escapeHtml(data.summary)}</p><div class="hobby-footer"><span class="text-link${featured ? ' is-inverse' : ''}">${escapeHtml(data.cta || 'Explore')} <span aria-hidden="true">&rarr;</span></span>${symbol}</div></div>
        ${books}
      </a>`;
  }).join('');
  const content = `
  <main id="main-content" class="inner-main">
    <section class="page-section"><div class="shell">
      <div class="section-heading"><p class="section-number">03 / Hobbies</p><div><h1>Things I do because I enjoy them.</h1><p>A growing collection rather than three fixed categories. Translation starts large because it already has a history; new interests can join the mosaic without redesigning the page.</p></div></div>
      <div class="hobby-grid">${cards}</div>
    </div></section>
    ${footer()}
  </main>`;
  return layout({ title: 'Hobbies', description: 'Translation, reading, running and other interests.', current: 'hobbies', content, route: '/hobbies/' });
}

function contactPage() {
  const contactEmail = site.contactEmail || site.email;
  const contactFormEndpoint = String(site.contactFormEndpoint || '').trim();
  const contactFormAction = contactFormEndpoint || `mailto:${contactEmail}`;
  const contactFormEncoding = contactFormEndpoint ? '' : ' enctype="text/plain"';
  const contactSubmitLabel = 'Send note';
  const contactFormSubject = site.contactFormSubject || 'New message from anhpham.me - {{ name }}';
  const content = `
  <main id="main-content" class="inner-main">
    <section class="contact-page" aria-labelledby="contact-title">
      <div class="shell contact-intro">
        <p class="section-number">05 / Contact</p>
        <div class="contact-intro-copy">
          <h1 id="contact-title">Say hello.</h1>
          <p>Tell me what you are working on, what you are curious about, or the specific question that brought you here. A few clear sentences are enough.</p>
        </div>
      </div>

      <div class="shell contact-grid">
        <div class="contact-form-panel">
          <form class="contact-form" action="${escapeHtml(contactFormAction)}" method="post"${contactFormEncoding} data-contact-form data-form-endpoint="${escapeHtml(contactFormEndpoint)}" data-fallback-email="${escapeHtml(contactEmail)}">
            <input type="hidden" name="subject" value="${escapeHtml(contactFormSubject)}">
            <div class="contact-honeypot" aria-hidden="true">
              <label for="contact-company">Leave this field empty</label>
              <input id="contact-company" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
            </div>

            <div class="form-field">
              <label for="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autocomplete="name" maxlength="100" placeholder="How should I address you?" required>
            </div>

            <div class="form-field">
              <label for="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" placeholder="you@example.com" required>
            </div>

            <div class="form-field form-field-message">
              <div class="field-heading">
                <label for="contact-message">Message</label>
                <span><span data-message-count>0</span> / 3000</span>
              </div>
              <textarea id="contact-message" name="message" rows="7" minlength="20" maxlength="3000" aria-describedby="contact-message-hint" placeholder="What would you like to talk about?" required></textarea>
              <p class="field-hint" id="contact-message-hint">Please do not include confidential information.</p>
            </div>

            <div class="contact-form-actions">
              <button class="button contact-submit" type="submit"><span data-submit-label>${contactSubmitLabel}</span><span aria-hidden="true">&rarr;</span></button>
              <p class="contact-privacy">Your details will only be used to respond to this message.</p>
            </div>
            <p class="form-status" data-form-status role="status" aria-live="polite" tabindex="-1"></p>
          </form>
        </div>

        <aside class="contact-aside">
          <blockquote>Good conversations usually start with a specific question.</blockquote>
          <div class="contact-aside-copy">
            <p>I am based in ${escapeHtml(site.location)}. Prefer another route?</p>
            <div class="contact-links">
              <a href="mailto:${escapeHtml(contactEmail)}"><span>Email directly</span><span>Open email &nearr;</span></a>
              <a href="${escapeHtml(site.linkedin)}" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Open profile &nearr;</span></a>
            </div>
            <p class="contact-boundary">No automated sales or bulk outreach, please.</p>
          </div>
        </aside>
      </div>
    </section>
    ${footer()}
  </main>`;
  return layout({ title: 'Contact', description: `Contact ${site.name}.`, current: 'contact', content, route: '/contact/' });
}

function casePage(entry) {
  const { data, body } = entry;
  const isFinished = data.status === 'Case study';
  const caseStatusNote = isFinished
    ? ''
    : '<p>The structure is publishable. Detailed narrative, visuals and sensitive metrics still need a review before you treat this as a finished case study.</p>';
  const content = `
  <main id="main-content" class="case-main">
    <section class="case-hero"><div class="shell">
      <div class="case-back"><a class="text-link" href="${url('/work/')}">&larr; Back to work</a></div>
      <div class="case-hero-grid"><aside class="case-meta"><p class="case-eyebrow">${escapeHtml(data.kicker || 'Case study')}</p><dl><div><dt>Company</dt><dd>${escapeHtml(data.company)}</dd></div><div><dt>Period</dt><dd>${escapeHtml(data.period)}</dd></div><div><dt>Role</dt><dd>${escapeHtml(data.role)}</dd></div></dl></aside><div><h1 class="case-title">${escapeHtml(data.title)}</h1><p class="case-deck">${escapeHtml(data.summary)}</p></div></div>
    </div></section>
    <section class="case-content"><div class="shell case-grid"><aside class="case-aside"><div class="case-status"><strong>${escapeHtml(data.status || 'Case study outline')}</strong>${caseStatusNote}</div></aside><div class="case-body">${renderCaseSections(body)}</div></div></section>
    ${footer()}
  </main>`;
  return layout({ title: data.title, description: data.summary, current: 'work', content, route: `/work/${data.slug}/` });
}

function postPage(entry) {
  const { data, body } = entry;
  const content = `
  <main id="main-content" class="article-main">
    <section class="article-hero"><div class="shell"><div class="case-back"><a class="text-link" href="${url('/writing/')}">&larr; Back to writing</a></div><h1>${escapeHtml(data.title)}</h1><p class="article-deck">${escapeHtml(data.description || '')}</p><div class="article-meta"><time datetime="${escapeHtml(data.date || '')}">${escapeHtml(data.displayDate || data.date || '')}</time>${data.language ? `<span>${escapeHtml(data.language)}</span>` : ''}</div></div></section>
    <article class="article-content"><div class="prose">${renderBlocks(body)}</div></article>
    ${footer()}
  </main>`;
  return layout({ title: data.title, description: data.description || '', current: 'writing', content, route: `/writing/${data.slug}/` });
}

function hobbyPage(entry) {
  const { data, body } = entry;
  const stat = data.stat ? `<p class="hobby-detail-stat"><strong>${escapeHtml(data.stat)}</strong>${escapeHtml(data.statLabel || '')}</p>` : '';
  const content = `
  <main id="main-content" class="article-main">
    <section class="article-hero"><div class="shell"><div class="case-back"><a class="text-link" href="${url('/hobbies/')}">&larr; Back to hobbies</a></div>${stat}<h1>${escapeHtml(data.headline || data.title)}</h1><p class="article-deck">${escapeHtml(data.summary || '')}</p></div></section>
    <article class="article-content"><div class="prose">${renderBlocks(body)}</div></article>
    ${footer()}
  </main>`;
  return layout({ title: data.title, description: data.summary || '', current: 'hobbies', content, route: `/hobbies/${data.slug}/` });
}

function genericPage(entry) {
  const { data, body } = entry;
  const route = `/${data.slug}/`;
  const content = `
  <main id="main-content" class="article-main">
    <section class="article-hero"><div class="shell"><div class="case-back"><a class="text-link" href="${url('/')}">&larr; Back to About</a></div><p class="case-eyebrow">${escapeHtml(data.label || 'Page')}</p><h1>${escapeHtml(data.title)}</h1><p class="article-deck">${escapeHtml(data.description || '')}</p></div></section>
    <article class="article-content"><div class="prose">${renderBlocks(body)}</div></article>
    ${footer()}
  </main>`;
  return layout({ title: data.title, description: data.description || '', current: '', content, route });
}

function notFoundPage() {
  const content = `<main id="main-content" class="inner-main"><section class="not-found"><div><p class="section-number">404</p><h1>Lost?</h1><p>This page does not exist, but the rest of the site is still here.</p><a class="button" href="${url('/')}">Return home <span aria-hidden="true">&rarr;</span></a></div></section>${footer()}</main>`;
  return layout({ title: 'Page not found', current: '', content, route: '/404.html' });
}

export { aboutPage, workPage, writingPage, hobbiesPage, contactPage, casePage, postPage, hobbyPage, genericPage, notFoundPage };
