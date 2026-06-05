# Checklist: ZaWin Online-Agenda Integration

This document outlines the step-by-step checklist to integrate the official ZaWin Online-Agenda booking widget into the Sumadent website.

---

## 📋 Phase 1: Clinic Actions (Administrative)

These steps must be completed by the clinic administration or dentist directly with their software provider:

- [ ] **Contact ZaWin Support (Martin Engineering AG)**
  - Phone: `+41 44 905 25 55`
  - Email: `support@martin.ch`
- [ ] **Request the "Online-Agenda" module activation** for the practice.
- [ ] **Retrieve the integration links**:
  - Ask for the unique Web-Widget link (URL starting with `https://webtermin.zawin.ch/...`) or the HTML `<iframe>` snippet.
  - Ask if they support language query parameters (e.g. `?lang=de`, `?lang=en`) to dynamically match the website's language.
- [ ] **Configure booking rules in ZaWin (on-premise app)**:
  - Define which dental treatments can be booked online (e.g., Dental Hygiene, Emergency).
  - Set up active calendar slots available for online booking.
  - Define notifications (e.g., automated email/SMS confirmations).

---

## 🛠️ Phase 2: Technical Requirements (Information Needed)

Once support provides the details, save them below:

*   **ZaWin Booking Base URL**: `https://webtermin.zawin.ch/...`
*   **Alternative IFrame Snippet**: `[Insert iframe string here]`
*   **Supported Language Codes**: `de` / `en` / `fr` / `it` (Verify if supported)

---

## 💻 Phase 3: Developer Implementation (Frontend Code)

Once the credentials/links are available, the developer will execute the following steps:

- [ ] **Update Configuration**
  - Add the `zawinBookingUrl` property to [**`src/config/clinicConfig.ts`**](file:///c:/Users/egan/Documents/sumadent/sumadent/src/config/clinicConfig.ts).
- [ ] **Create React Booking Modal Component**
  - Implement a clean modal element that overlays the page when a user clicks any "Termin buchen" or "Book Appointment" CTA.
  - Embed the ZaWin iframe inside the modal, passing the active language as a parameter to the URL if supported.
- [ ] **Hook Up CTAs**
  - Change all current mobile/desktop click-to-call buttons ("Termin buchen") to open the modal instead of triggering a direct call (`tel:` links will remain in the footer and contact sections as a secondary fallback).
- [ ] **Verification & Testing**
  - Test modal behavior on mobile responsive viewports.
  - Verify that closing the modal correctly resets the iframe state.
  - Confirm the booking synchronization works by running a test appointment and checking if it lands in the clinic's local ZaWin calendar.
