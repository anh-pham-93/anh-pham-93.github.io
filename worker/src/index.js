const ALLOWED_ORIGINS = new Set([
  'https://anhpham.me',
  'https://www.anhpham.me'
]);

const CONTACT_RECIPIENT = 'anhpham.workcom@gmail.com';
const FROM_ADDRESS = 'Anh Pham Website <hello@mail.anhpham.me>';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_EMAIL_URL = 'https://api.resend.com/emails';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function jsonResponse(body, status, origin = '') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(origin ? corsHeaders(origin) : {})
    }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function verifyTurnstile(token, secret, remoteIp) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body
  });

  if (!response.ok) return { success: false };
  return response.json();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed.' }, 405);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ error: 'Origin not allowed.' }, 403);
    }

    if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
      console.error('Required Worker secrets are missing.');
      return jsonResponse({ error: 'Contact service is temporarily unavailable.' }, 503, origin);
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return jsonResponse({ error: 'Invalid request format.' }, 415, origin);
    }

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > 16384) {
      return jsonResponse({ error: 'Message is too large.' }, 413, origin);
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse({ error: 'Invalid form submission.' }, 400, origin);
    }

    const honeypot = String(formData.get('_gotcha') || '').trim();
    if (honeypot) {
      return jsonResponse({ ok: true }, 200, origin);
    }

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const turnstileToken = String(formData.get('cf-turnstile-response') || '').trim();

    if (!name || name.length > 100) {
      return jsonResponse({ error: 'Please enter your name.' }, 400, origin);
    }
    if (!email || email.length > 254 || !isValidEmail(email)) {
      return jsonResponse({ error: 'Please enter a valid email address.' }, 400, origin);
    }
    if (message.length < 20 || message.length > 3000) {
      return jsonResponse({ error: 'Please enter a message between 20 and 3000 characters.' }, 400, origin);
    }
    if (!turnstileToken || turnstileToken.length > 2048) {
      return jsonResponse({ error: 'Security verification is required. Please try again.' }, 400, origin);
    }

    const remoteIp = request.headers.get('CF-Connecting-IP') || '';
    let verification;
    try {
      verification = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, remoteIp);
    } catch (error) {
      console.error('Turnstile verification failed:', error);
      return jsonResponse({ error: 'Security verification is temporarily unavailable. Please try again.' }, 502, origin);
    }

    const allowedHostname = verification.hostname === 'anhpham.me' || verification.hostname === 'www.anhpham.me';
    if (!verification.success || !allowedHostname) {
      return jsonResponse({ error: 'Security verification failed. Please try again.' }, 403, origin);
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

    const resendResponse = await fetch(RESEND_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [CONTACT_RECIPIENT],
        reply_to: email,
        subject: `New message from anhpham.me - ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`
      })
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error('Resend request failed:', resendResponse.status, details);
      return jsonResponse({ error: 'Your message could not be sent. Please try again or use the direct email link.' }, 502, origin);
    }

    return jsonResponse({ ok: true }, 200, origin);
  }
};
