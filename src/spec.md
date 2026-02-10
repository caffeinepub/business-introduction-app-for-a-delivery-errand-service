# Specification

## Summary
**Goal:** Build a responsive business introduction app for a local delivery/errand service with a polished landing page, a request/contact flow, and an admin-only review area.

**Planned changes:**
- Create a mobile-first landing page with sections: Overview, Services, How It Works, Contact, using an warm/charcoal/cream/orange theme (no blue/purple-dominant palette) and clear CTAs.
- Implement a Services section with three categories (Grocery Delivery, Restaurant Delivery, Special Delivery) each with a short description and “Request this service” CTA.
- Add a “Request an Errand / Contact” form collecting: name, phone, optional email, service type, pickup details, drop-off details, notes, preferred time window; validate required fields; show confirmation and reset on success.
- Add backend Motoko canister storage for submitted requests (including created timestamp) with methods to create and list entries (consistent ordering) and stable persistence across upgrades.
- Add an admin-only frontend page (list + detail view) protected by Internet Identity; enforce admin access via a configured admin principal list checked in the backend.
- Generate and include static brand assets (logo + hero banner) stored under `frontend/public/assets/generated` and referenced directly in the landing page UI.

**User-visible outcome:** Visitors can learn about the business, browse services, and submit an errand request; admins can sign in with Internet Identity and review submitted requests in a protected admin page.
