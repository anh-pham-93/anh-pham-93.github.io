# Contact form setup

The contact page works in two modes:

1. With `contactFormEndpoint` set, it submits in-page to Formspree and shows accessible success or error states.
2. With the endpoint left blank, it opens the visitor's email app with the form content pre-filled.

## Connect Formspree

1. Create a form in Formspree and verify the notification email address.
2. Copy the endpoint, which looks like `https://formspree.io/f/yourFormId`.
3. Add it to `src/site.json`:

   ```json
   "contactFormEndpoint": "https://formspree.io/f/yourFormId"
   ```

4. In Formspree settings, restrict submissions to `anhpham.me` and keep reCAPTCHA enabled.
5. Submit one real test from the deployed site and confirm that the reply-to address is the visitor's email.

The form already includes a `_gotcha` honeypot, field length limits, duplicate-submit prevention, and a specific message for HTTP 429 rate limits.

## Recommended mailbox setup

Set `contactEmail` to a dedicated alias such as `hello@anhpham.me`, then forward it to the inbox you already use. This keeps the public contact address separate from your primary address and makes filtering or replacing it easier later.
