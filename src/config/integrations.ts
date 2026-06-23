/**
 * Third-party integration settings (single source of truth).
 *
 * Keep only PUBLIC keys/URLs here. Never put secret keys in this file or
 * anywhere else in the client bundle — anything imported here ships to the
 * browser. The reCAPTCHA *secret* key in particular belongs only on a server.
 */

/**
 * Google reCAPTCHA v2 ("I'm not a robot") public SITE key.
 *
 * How to obtain (free):
 *   1. Go to https://www.google.com/recaptcha/admin
 *   2. Create a site → reCAPTCHA v2 → "I'm not a robot" Checkbox.
 *   3. Register the clinic's domain(s) (and `localhost` for local testing).
 *   4. Paste the generated SITE key below (the SECRET key stays on the server).
 *
 * While this is empty, the booking page falls back to the lightweight,
 * dependency-free gate (honeypot + manual confirmation checkbox).
 *
 * ⚠️ Client-side reCAPTCHA only proves the widget was solved in the browser.
 * For full protection, the token the widget produces must additionally be
 * verified server-side via https://www.google.com/recaptcha/api/siteverify
 * (requires the SECRET key + a backend endpoint — not yet available on this
 * static site). See the TODO in src/sections/Booking/Booking.tsx.
 */
export const RECAPTCHA_SITE_KEY = '';
