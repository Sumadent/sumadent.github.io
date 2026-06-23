import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, CalendarCheck, AlertTriangle, ShieldCheck } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { clinicConfig } from '@/config/clinicConfig';
import { toLanguageCode } from '@/config/languages';
import { RECAPTCHA_SITE_KEY } from '@/config/integrations';
import { Button } from '@/components/Button/Button';
import './Booking.css';

/**
 * Standalone appointment-booking page (`#/booking`).
 *
 * Offers the patient two paths:
 *   1. Call the clinic directly (`tel:` fallback).
 *   2. Book online through the embedded ZaWin "Online-Agenda" widget, which
 *      syncs the appointment straight into the clinic's local ZaWin calendar.
 *
 * The online widget is gated behind a binding-/chargeable-appointment consent
 * and — when a reCAPTCHA site key is configured — a Google reCAPTCHA v2 check,
 * before it is revealed. Until a `zawinBookingUrl` is configured (see
 * brainstorm/zawin_integration_todo.md), an "integration pending" placeholder
 * is shown in place of the iframe.
 */
export function Booking(): JSX.Element {
  const { t, i18n } = useTranslation();
  const lang = toLanguageCode(i18n.language);

  // --- Spam protection -------------------------------------------------------
  // Bot protection is provided by Google reCAPTCHA v2 ("I'm not a robot") when a
  // site key is configured in src/config/integrations.ts. Until a key is set
  // there is no bot check — booking online then only requires the consent below.
  //
  // ⚠️ reCAPTCHA here is CLIENT-SIDE only. For full protection the token it
  // produces must ALSO be verified server-side via
  // https://www.google.com/recaptcha/api/siteverify (needs the secret key + a
  // backend, which this static site does not have yet).
  // TODO(recaptcha): verify `recaptchaToken` server-side before trusting it.
  const useRecaptcha = RECAPTCHA_SITE_KEY !== '';

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const botCheckPassed = useRecaptcha ? recaptchaToken !== null : true;
  const canUnlock = consentGiven && botCheckPassed;

  const handleUnlock = () => {
    if (!canUnlock) return;
    setUnlocked(true);
  };

  // Append the active UI language so ZaWin renders the widget in the same
  // language, if the configured widget supports a `lang` query parameter.
  const bookingUrl = clinicConfig.zawinBookingUrl
    ? `${clinicConfig.zawinBookingUrl}${
        clinicConfig.zawinBookingUrl.includes('?') ? '&' : '?'
      }lang=${lang}`
    : '';

  return (
    <section className="booking section" id="booking">
      <div className="container booking__container">
        <h1 className="booking__title">{t('booking.title')}</h1>
        <p className="booking__intro">{t('booking.intro')}</p>

        <div className="booking__options">
          {/* Option 1 — Call the clinic ----------------------------------- */}
          <article className="booking__option">
            <div className="booking__option-head">
              <Phone size={24} aria-hidden="true" />
              <h2 className="booking__option-title">
                {t('booking.call_title')}
              </h2>
            </div>
            <p className="booking__option-desc">{t('booking.call_desc')}</p>
            <Button
              as="a"
              href={`tel:${clinicConfig.phoneRaw}`}
              variant="secondary"
              className="booking__action"
            >
              <Phone size={18} aria-hidden="true" />
              {clinicConfig.phoneDisplay}
            </Button>
          </article>

          {/* Option 2 — Online booking via ZaWin -------------------------- */}
          <article className="booking__option booking__option--primary">
            <div className="booking__option-head">
              <CalendarCheck size={24} aria-hidden="true" />
              <h2 className="booking__option-title">
                {t('booking.online_title')}
              </h2>
            </div>
            <p className="booking__option-desc">{t('booking.online_desc')}</p>

            {/* Binding / chargeable legal notice */}
            <div className="booking__legal" role="note">
              <AlertTriangle
                size={20}
                className="booking__legal-icon"
                aria-hidden="true"
              />
              <div>
                <strong className="booking__legal-title">
                  {t('booking.legal_title')}
                </strong>
                <p className="booking__legal-text">{t('booking.legal_text')}</p>
              </div>
            </div>

            {!unlocked ? (
              <div className="booking__gate">
                <label className="booking__check">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                  />
                  <span>{t('booking.consent_label')}</span>
                </label>

                {useRecaptcha && (
                  <div className="booking__recaptcha">
                    <ReCAPTCHA
                      key={lang}
                      sitekey={RECAPTCHA_SITE_KEY}
                      hl={lang}
                      onChange={(token) => setRecaptchaToken(token)}
                      onExpired={() => setRecaptchaToken(null)}
                      onErrored={() => setRecaptchaToken(null)}
                    />
                  </div>
                )}

                <Button
                  variant="primary"
                  className="booking__action"
                  onClick={handleUnlock}
                  disabled={!canUnlock}
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  {t('booking.unlock_button')}
                </Button>
              </div>
            ) : (
              <div className="booking__widget">
                {bookingUrl ? (
                  <iframe
                    src={bookingUrl}
                    title={t('booking.iframe_title')}
                    className="booking__iframe"
                    loading="lazy"
                  />
                ) : (
                  // No widget URL configured yet -> graceful fallback.
                  <div className="booking__pending" role="status">
                    <ShieldCheck size={28} aria-hidden="true" />
                    <p className="booking__pending-text">
                      {t('booking.pending_text')}
                    </p>
                    <Button
                      as="a"
                      href={`tel:${clinicConfig.phoneRaw}`}
                      variant="primary"
                      className="booking__action"
                    >
                      <Phone size={18} aria-hidden="true" />
                      {clinicConfig.phoneDisplay}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
