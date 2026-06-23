# ZaWin Booking — Implementation Handoff

> **Audience:** the next developer/agent who picks this up once the real ZaWin
> data (and optionally a reCAPTCHA key) is available.
>
> **Branch:** `feat/zawin-booking-integration`
> **Companion doc:** [`zawin_integration_todo.md`](./zawin_integration_todo.md) — the
> original checklist + the clinic-side (administrative) steps and ZaWin support
> contact details. This file is the *technical* continuation.

---

## 1. TL;DR — what's already done

The full **frontend booking flow is built and shipping as boilerplate**. It works
end-to-end today; it just shows a placeholder where the real ZaWin widget will
go, because we don't have the widget URL yet.

Concretely, on this branch:

- A new page lives at the hash route **`#/booking`** (`Termin vereinbaren`).
- The **Hero** and **Header** CTAs no longer dial directly — on all devices they
  now link to `#/booking` (label "Termin vereinbaren" / "Termin buchen",
  calendar icon).
- The booking page offers **two paths**: (1) call the clinic (`tel:` fallback),
  (2) book online via ZaWin.
- The online path is gated behind a **binding/chargeable consent checkbox** and,
  **when a reCAPTCHA site key is configured**, a **Google reCAPTCHA v2** check.
- All copy is translated in **de / en / fr / it** (`src/locales/*.json`, under
  the `booking.*` namespace). Nothing is hardcoded.

**To go live you essentially only need to fill in two config values** (Section 3)
— and, for real bot protection, add a small server-side step (Section 4).

---

## 2. How the feature is wired (data flow)

```
Hero / Header CTA ──(href "#/booking")──▶ useHashRoute ──▶ PageRouter ──▶ <Booking/>
                                                                              │
                          ┌───────────────────────────────────────────────────┤
                          ▼                                                     ▼
                  Option 1: Call                                   Option 2: Online (ZaWin)
                  tel:{phoneRaw}                                              │
                                                       consent checkbox  +  reCAPTCHA (if key set)
                                                                  │
                                                          "Weiter zur Online-Buchung"
                                                                  │
                                              ┌───────────────────┴───────────────────┐
                                              ▼                                         ▼
                                 clinicConfig.zawinBookingUrl set?            not set (current state)
                                              │                                         │
                                   <iframe src=…?lang=xx>                    "integration pending"
                                   (syncs to clinic's ZaWin calendar)         placeholder + phone CTA
```

### Files to know

| File | Role |
| --- | --- |
| `src/config/navigation.ts` | Defines `Page` (`'booking'`), `BOOKING_ROUTE = '#/booking'`, and the `PAGE_ROUTES` map. |
| `src/router/PageRouter.tsx` | Renders `<Booking />` when `page === 'booking'`. |
| `src/sections/Booking/Booking.tsx` | The whole booking page: two options, consent + reCAPTCHA gate, iframe-or-placeholder. **This is where most changes happen.** |
| `src/sections/Booking/Booking.css` | Styling for the page (mobile-first, 2-column ≥ 900px). |
| `src/config/clinicConfig.ts` | Holds **`zawinBookingUrl`** (currently `''`). |
| `src/config/integrations.ts` | Holds **`RECAPTCHA_SITE_KEY`** (currently `''`). |
| `src/locales/{de,en,fr,it}.json` | All `booking.*` strings + the legal text. |
| `src/components/Button/Button.tsx` | Extended with `disabled` + `type` (used by the gate's submit button). |

---

## 3. Step 1 — drop in the real ZaWin widget

**Prereq (clinic side):** the "Online-Agenda" module is activated and ZaWin
support (Martin Engineering AG) has provided the Web-Widget URL
(`https://webtermin.zawin.ch/...`) or an `<iframe>` snippet. See
[`zawin_integration_todo.md`](./zawin_integration_todo.md) for the contact info
and the administrative checklist (calendar slots, confirmation emails, etc.).

### 3a. Paste the URL

In `src/config/clinicConfig.ts`:

```ts
// TODO(zawin): paste the Web-Widget URL from ZaWin support here to go live.
zawinBookingUrl: 'https://webtermin.zawin.ch/<the-real-path>',
```

That's the **only** required change to swap the placeholder for the live iframe.
`Booking.tsx` already builds the final URL and appends the active UI language:

```ts
const bookingUrl = clinicConfig.zawinBookingUrl
  ? `${clinicConfig.zawinBookingUrl}${
      clinicConfig.zawinBookingUrl.includes('?') ? '&' : '?'
    }lang=${lang}`        // lang ∈ 'de' | 'en' | 'fr' | 'it'
  : '';
```

### 3b. Verify the language parameter

We assume ZaWin accepts `?lang=de|en|fr|it`. **Confirm this with support.** If
ZaWin uses a different param name (e.g. `?sprache=` / `?l=`) or different codes,
adjust the template literal above. If ZaWin does **not** support a language
param, just drop the `lang=` part and remove the `lang` usage.

### 3c. Reconcile iframe attributes

If support hands you a specific `<iframe>` snippet, reconcile it with ours in
`Booking.tsx` (the `<iframe className="booking__iframe">`). Things to check:

- **Height** — we set `min-height: 640px` in `Booking.css` (`.booking__iframe`).
  ZaWin widgets are often taller; adjust, or implement `postMessage`-based
  auto-resize if ZaWin emits height events.
- **`sandbox` / `allow`** attributes — add if the snippet specifies them.
- **Scrolling** — make sure the widget isn't clipped on mobile.

### 3d. Confirm bookings land in the clinic calendar

The whole point ("gets saved on the admin's account"): book a **test
appointment** through the live iframe and confirm it appears in the clinic's
on-premise ZaWin calendar. Test in all 4 languages and on a real phone.

---

## 4. Step 2 — reCAPTCHA (optional but recommended)

Bot protection is **reCAPTCHA-only by design** (we removed the earlier
honeypot/manual-checkbox fallback at the product owner's request). If no site key
is set, there is **no bot check** — online booking only requires the consent
checkbox.

### 4a. Get + paste the site key

1. Create a key at <https://www.google.com/recaptcha/admin> → **reCAPTCHA v2 →
   "I'm not a robot" Checkbox**. Register the clinic domain(s) **and `localhost`**
   for local testing.
2. Paste the **SITE** key into `src/config/integrations.ts`:
   ```ts
   export const RECAPTCHA_SITE_KEY = '6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   ```
   The page switches to the real reCAPTCHA widget automatically
   (`useRecaptcha = RECAPTCHA_SITE_KEY !== ''`).
3. **Cost:** free for this traffic volume. Enterprise tiers cost money; not needed.

### 4b. ⚠️ The real work: server-side verification

This is the **most important open item** and is flagged in-code as
`TODO(recaptcha)` in `Booking.tsx`.

Right now reCAPTCHA is **client-side only** — we reveal the iframe once the widget
returns a token, but we never *verify* that token. A determined attacker can
bypass client-side state. Full protection requires POSTing the token + the
**secret** key to `https://www.google.com/recaptcha/api/siteverify` from a
**server** and only proceeding if `success === true`.

This site is a **static Vite SPA with no backend**, so you must add one of:

- A **serverless function** (Cloudflare Workers / Netlify / Vercel function) that
  verifies the token and returns ok/not-ok; the frontend calls it before
  revealing the iframe.
- Verification handled by **ZaWin's own backend**, *if* their booking endpoint
  can accept and verify a reCAPTCHA token (ask support — unlikely, but check).

> **NEVER** put the reCAPTCHA **secret** key in this repo or the client bundle.
> It belongs only in the server's environment variables.

Important nuance to keep in mind: because the actual booking happens **inside the
ZaWin iframe** (which has its own backend), our reCAPTCHA only gates *access to
the widget* on our page — it does not protect the ZaWin submission itself. ZaWin
typically has its own abuse handling. Decide with the clinic whether client-side
gating is "good enough" or whether the serverless verification is worth building.

### 4c. Privacy-friendly alternative

If the Google dependency is a concern (see Section 5), **hCaptcha** is a drop-in
alternative with the same UX and a similar React component. Swapping is
straightforward: replace the `react-google-recaptcha` usage in `Booking.tsx` and
the key in `integrations.ts`.

---

## 5. Legal, privacy & CSP (don't skip — this is a Swiss medical site)

- **Binding/chargeable notice** is already on the page
  (`booking.legal_title` / `booking.legal_text` in every locale). It states the
  appointment is binding and that no-shows / late cancellations (< 24 h) may be
  charged. **Have the clinic's lawyer confirm** the exact wording, the cancellation
  window (we used 24 h), and the fee policy before launch.
- **Privacy policy (revDSG / GDPR):** both the ZaWin iframe (Martin Engineering)
  and Google reCAPTCHA send user data to third parties and may set cookies. Update
  the Impressum / privacy policy accordingly, and ideally load reCAPTCHA + the
  iframe **behind cookie consent**.
- **Content-Security-Policy:** there is currently **no CSP**. If one is added
  later, it must `frame-src`/`child-src` allow `https://webtermin.zawin.ch` (and
  Google reCAPTCHA domains: `https://www.google.com` / `https://www.gstatic.com`),
  plus `script-src` for reCAPTCHA.

---

## 6. Testing checklist

- [ ] `npm run dev`, navigate to `#/booking` — both options render.
- [ ] Hero CTA **and** Header CTA both open `#/booking` (mobile + desktop).
- [ ] Consent checkbox gates the "Weiter zur Online-Buchung" button.
- [ ] With a site key set: reCAPTCHA must be solved before the button enables.
- [ ] Live iframe loads and renders in **de / en / fr / it**.
- [ ] A **test booking** appears in the clinic's ZaWin calendar.
- [ ] Mobile viewport (≤ 360px): reCAPTCHA + iframe don't overflow horizontally.
- [ ] `npm run build && npm run lint` pass, `npx tsc --noEmit` clean.
- [ ] (If serverless verification added) tampering with client state can't reveal
      the widget without a valid, server-verified token.

---

## 7. Decisions already made (please don't silently undo)

These were explicitly chosen with the product owner:

1. **A standalone page, not a modal.** (The original `zawin_integration_todo.md`
   proposed a modal; we went with a routed page per the owner's request.)
2. **CTAs changed on ALL devices** (mobile + desktop), Hero + Header.
3. **`tel:` fallbacks are intentionally kept** in the Footer and Contact section
   and as Option 1 on the booking page — do not remove them.
4. **reCAPTCHA-only spam protection**, no lightweight fallback. If no key is set,
   there is deliberately no bot check.

---

## 8. Handy commands

```bash
npm run dev          # local dev server
npm run build        # tsc + vite build (must pass)
npm run lint         # eslint, max-warnings 0
npx tsc --noEmit     # typecheck only
npx prettier --write .
```

## 9. Dependencies added on this branch

- `react-google-recaptcha` (runtime) + `@types/react-google-recaptcha` (dev).
- The 2 npm-audit warnings present are pre-existing (`esbuild`/`vite`, dev-only) —
  **not** introduced by this work.
