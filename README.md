# HopeBridge Frontend Handoff Guide

## Project Overview
This project is a polished static frontend for a nonprofit donation platform called HopeBridge. It includes:
- a public landing page
- a contact page
- a donation/checkout page
- an admin login and dashboard mockup

The site is built with:
- HTML
- Tailwind CSS via CDN
- jQuery for interactivity
- a shared stylesheet in assets/css/style.css
- a shared script in assets/js/app.js

## Folder Structure
- index.html — landing/home page
- contact.html — contact form page
- donation.html — donation/payment page
- admin/index.html — admin login page
- admin/dashboard.html — admin dashboard mockup
- assets/css/style.css — shared custom styles
- assets/js/app.js — shared interactive behavior
- README.md — this handoff document

## How the Frontend Works
### Public Pages
- Home page introduces the NGO mission and impact areas.
- Contact page contains a validated contact form.
- Donation page contains a cause selector, amount input, payment method selector, and card/payment validation UI.

### Admin Pages
- Admin login uses demo credentials:
  - Email: superadmin@hopebridge.org
  - Password: admin1234
- Admin dashboard is a static mockup for future backend integration.

## Important Frontend Notes
### Forms and Validation
- Contact form validation checks required name, email, subject, and message fields.
- Donation form validation checks:
  - amount input
  - payment method selection
  - card details when card is chosen
- The card UI is designed as a frontend placeholder and is ready to be connected to a real payment webhook or gateway later.

### Payment Flow Status
- The current version is a polished frontend prototype.
- The actual payment processing is not live yet.
- The frontend is structured so backend integration can be added later for:
  - Flutterwave
  - PayPal
  - card processing APIs

## Backend Integration Notes
### Expected Data from the Donation Form
The frontend currently collects:
- donation amount
- selected cause
- payment method
- card details (for visual validation only in this prototype)

### Recommended Backend Hand-off
When integrating, your backend developer should:
1. Capture the donation amount from the amount input.
2. Capture the selected cause from the active cause tab.
3. Send the payment method choice to the backend.
4. For card payments, process the card details securely on the backend or through a payment gateway.
5. Replace the frontend success placeholder with a real API response flow.

## Responsive Behavior
The site is designed to be responsive on:
- mobile phones
- tablets
- desktops

The navigation menu collapses into a mobile-friendly menu on smaller screens.

## Styling Notes
- Tailwind CSS is loaded from a CDN.
- Custom styles live in assets/css/style.css.
- Buttons, forms, cards, and social links already have consistent styling.

## JavaScript Notes
- The main script is assets/js/app.js.
- It handles:
  - cause tab switching
  - donation form validation
  - card number/expiry/CVC formatting
  - mobile menu toggle
  - admin login simulation

## Future Improvements
Possible next steps for the backend team:
- connect the donation form to a live payment gateway
- connect the contact form to an email or CRM endpoint
- replace the admin demo login with a real authentication system
- connect dashboard stats to live data

## Quick Start
Open index.html in a browser to view the frontend.

If you want, the next step can be to add a real API integration layer for payment processing and contact submission.
