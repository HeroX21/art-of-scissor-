# ART OF SCISSOR Unisex Salon — Implementation Plan

A production-ready, mobile-first website for **ART OF SCISSOR Unisex Salon** in Burari, New Delhi, featuring an interactive Three.js 3D golden shears showcase, a client booking workflow with instant WhatsApp message generation and printable salon appointment pass, 14 indexable service and package pages, and a PIN-protected Owner Portal for business and pricing management.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned during Phase 1 clarification:

- **Confirmed Decision 1 (Three.js Visual Experience)**: An interactive 3D procedural golden shears showcase with studio PBR lighting (`ACESFilmicToneMapping`, `RoomEnvironment`), smooth damping tilt controls, and a collapsible bottom control dock.
- **Confirmed Decision 2 (Owner Configuration & Pricing)**: An in-app PIN-protected Owner Portal (`/admin` or accessible via discrete lock toggle in footer) allowing the salon manager to update contact details, announcement text, price visibility, and publish/draft toggles for packages without code edits.
- **Confirmed Decision 3 (Appointment Workflow)**: Validates customer details (Indian mobile format, date/time, selected services), immediately generates a formatted WhatsApp inquiry link to `+91 95822 53329`, renders an on-screen booking confirmation pass with salon address and Google Calendar `.ics` export, and provides a direct call fallback to `+91 70429 41836`.

---

### 1. Overview & Core Concept

- **What It Does**: Provides a modern digital presence for ART OF SCISSOR in Burari, Delhi. Clients can browse the complete salon menu (haircuts, styling, hair spa, INOA hair colour, facials, d-tan, clean-ups, and 29 curated grooming packages), inspect services with transparent factual descriptions, check location proximity to Rani Public School, and initiate instant appointment requests via WhatsApp or phone call.
- **Target Audience / Persona**: Residents and professionals in Burari, West Sant Nagar, Virendar Nagar, A-2 Block, and North Delhi seeking premium hair and skin care services.
- **Key Value**: Frictionless local discovery, trust-centered service information with zero fabricated claims, authentic 3D visual craftsmanship, and direct WhatsApp-driven lead conversion.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Dominant Palette (60-30-10)**:
  - *Canvas (60%)*: Deep obsidian and rich charcoal (`#0C0D0E`, `#141619`) with warm off-white reading surfaces (`#F8F7F4`, `#EDECE8`).
  - *Structural Surfaces (30%)*: Muted slate-black cards (`#1B1D22`), subtle 1px hairline dividers (`rgba(212, 175, 55, 0.15)`), and ivory typography (`#F4F4F0`).
  - *Accent Budget (10%)*: Warm champagne gold (`#D4AF37`, `#DFBE58`) and muted bronze (`#9E8043`) concentrated strictly at primary CTAs, active filters, and subtle highlights.
- **Typography**:
  - *Display / Hero*: Editorial high-contrast serif (`Playfair Display` or `Cormorant Garamond` loaded via Google Fonts) for distinguished luxury titles.
  - *Body Prose*: Clean, highly legible geometric sans (`Plus Jakarta Sans` or `Outfit`) for service descriptions, benefits, and form inputs.
  - *Tabular Data / Codes*: Clean `tabular-nums` for prices, phone numbers, and time slots.
- **Anti-Slop Discipline**:
  - No generic AI purple gradients or neon glows.
  - Zero pill badges on cards; all metadata rendered as clean inline text with `·` dividers.
  - No fake 5-star badges, invented awards, or fabricated claims.
  - Single-line controls with `whitespace-nowrap` across navigation and buttons.

#### Key User Flows
1. **Explore & Discover**: User arrives on the homepage with an announcement banner, sticky navigation, Three.js 3D shears hero with tilt interaction, service highlights, packages preview, location directions card, and floating WhatsApp CTA.
2. **Service Deep Dive**: Detailed service pages (Haircuts, Hair Spa, Hair Colour, INOA, Facial Treatments, Fruit Clean-Up, D-Tan, Charcoal Scrub, Threading, Masks) with benefits, FAQs, and package cross-links.
3. **Package Comparison**: Filterable Men's (15 packages) and Women's (14 packages) menus. Hidden prices by default with owner toggle; draft packages cleanly isolated.
4. **Appointment Inquiry**: Step-by-step booking form generating a WhatsApp message (`wa.me/919582253329?text=...`) and on-screen salon pass with directions and calendar download.
5. **Owner Settings**: Secure PIN entry (`110084` or customizable) to edit contact numbers, toggle price visibility, publish draft packages, and update announcement text.

---

### 3. Key Product Decisions & Trade-Offs

- **Client-Side Routing with Clean Hash/Path History**:
  - *Chosen Approach*: Fast, zero-latency SPA view router supporting clean URL states (`/about`, `/mens-salon`, `/womens-salon`, `/haircut-and-styling`, `/hair-spa`, `/hair-colour`, `/facial-and-skincare`, `/special-packages`, `/gallery`, `/contact`, `/book-appointment`, `/privacy-policy`, `/terms-and-conditions`, and `/admin`) with seamless browser history (`pushState`/`popState`) and scroll-to-top on route changes.
  - *Why*: Delivers instant page transitions without server round-trips while keeping canonical links crawlable and sharable.
- **Central Business Data Store with Local Storage Persistence**:
  - *Chosen Approach*: `salonConfig.ts` holds all verified facts (address, phone numbers, services, packages, prices, draft flags) with a reactive layer that syncs modifications made in the Owner Portal to `localStorage`.
  - *Why*: Allows the salon owner to toggle pricing and modify details immediately without requiring an external database setup.
- **Procedural 3D Golden Shears (Zero-404 Asset Guarantee)**:
  - *Chosen Approach*: Multi-part procedural model created using Three.js `ExtrudeGeometry`, `LatheGeometry`, and `CylinderGeometry` (two contoured blades, pivot screw, finger rings, tang/finger rest, and studio softbox reflections) rather than an external `.glb` file that could fail to load.
  - *Why*: Guarantee 100% reliability, instant loading, zero 404s, and full programmatic control over metallic finishes and studio PBR lighting.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ART OF SCISSOR SALON WEB APP                    │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐        ┌──────────────────┐
│  Layout & Nav    │       │ 3D Shears Studio │        │ Booking & Pass   │
│  - Sticky Header │       │ - Three.js PBR   │        │ - Form Validator │
│  - Announcement  │       │ - Tilt & Damping │        │ - WhatsApp Gen   │
│  - Mobile Drawer │       │ - Studio Lights  │        │ - Salon Pass PDF │
│  - Global Footer │       │ - Ambient Rig    │        │ - Fallback Call  │
└────────┬─────────┘       └──────────────────┘        └────────┬─────────┘
         │                                                      │
         ├──────────────────────────────────────────────────────┤
         ▼                                                      ▼
┌──────────────────────────────────────┐       ┌───────────────────────────┐
│        14 Public Pages & Views       │       │    Owner Admin Portal     │
│  - Home, About, Men's, Women's       │       │  - PIN Authentication     │
│  - 8 Service Pages, Packages         │◄──────┤  - Price Visibility On/Off│
│  - Gallery, Contact & Location       │       │  - Draft/Publish Packages │
│  - Privacy Policy & Terms            │       │  - Contact & Text Updates │
└──────────────────┬───────────────────┘       └───────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Central Salon Store (salonConfig.ts)              │
│  - Verified Business Details (Burari, Delhi)                           │
│  - 15 Men's Packages & 14 Women's Packages                             │
│  - Individual Service Catalog with FAQs & Benefits                     │
│  - Structured Data (Schema.org / HairSalon JSON-LD)                    │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Components & Modules
1. `src/config/salonConfig.ts`: Central truth for address, phone numbers, WhatsApp, email, individual services, draft/published package catalogs, and business settings.
2. `src/components/ThreeShearsHero.tsx`: Three.js procedural 3D golden shears with studio lighting, metallic roughness/anisotropy, smooth pointer damping, and collapsible dock.
3. `src/components/Navbar.tsx`: 3-zone header conforming to Top Bar Contract, sticky after scrolling, mobile drawer.
4. `src/components/AppointmentModal.tsx` & `src/pages/BookAppointmentPage.tsx`: Client-side validated form, pre-filled WhatsApp link generator, and interactive booking voucher pass.
5. `src/pages/OwnerPortalModal.tsx`: PIN authentication dialog (`110084`) allowing live toggling of package prices, draft visibility, and contact phone numbers.
6. `src/components/LocationSection.tsx`: Burari address, landmark note (near Rani Public School), Google Maps directions generator, and interactive iframe embed.
7. `src/components/SeoHead.tsx`: Dynamic document title, meta descriptions, canonical URLs, and Schema.org `HairSalon` JSON-LD injection.
8. `public/sitemap.xml` & `public/robots.txt`: Search engine crawling files with clean URLs.

---

### Verification & Testing Plan

1. **Automated Compilation**: Run `compile_applet` to ensure clean TypeScript compilation with zero errors.
2. **Navigation & Links**: Test all 14 routes, breadcrumbs, internal cross-links, and mobile drawer transitions.
3. **WhatsApp & Phone CTAs**: Verify that all WhatsApp buttons link to `https://wa.me/919582253329` with properly encoded text and that phone call links target `tel:+919582253329` and `tel:+917042941836`.
4. **Three.js Performance**: Verify 60fps rendering, graceful context handling, and smooth pointer damping.
5. **Form Validation**: Test name, Indian 10-digit mobile number, date picker, service selection, and the resulting booking pass generation.
6. **Owner Admin Functions**: Verify PIN entry, price visibility toggle, draft package toggling, and data persistence across refreshes.
7. **SEO & Structured Data**: Check `<title>`, `<meta description>`, OpenGraph cards, and valid JSON-LD in DOM.
