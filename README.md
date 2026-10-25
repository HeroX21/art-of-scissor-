# ART OF SCISSOR Unisex Salon — Official Web Application

Production-ready, mobile-first website for **ART OF SCISSOR Unisex Salon**, located at Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, A-2 Block, Virendar Nagar, Block B, West Sant Nagar, Burari, New Delhi, Delhi 110084, India.

## Business Profile
- **Salon Name**: ART OF SCISSOR
- **Descriptor**: UNISEX SALON
- **Primary Phone / WhatsApp**: +91 95822 53329 (`https://wa.me/919582253329`)
- **Secondary Phone (Alternative Call)**: +91 70429 41836
- **Email**: artofscissorunisexsalon@gmail.com
- **Service Area**: Burari, West Sant Nagar, Virendar Nagar, A-2 Block, North Delhi

---

## Key Features & Architecture

1. **Three.js 3D Shears Hero Visualizer**:
   - Procedural 3D golden styling shears with multi-part assembly (tapered bevel blades, shanks, finger rings, tang, and pivot screw).
   - Studio PBR lighting (`ACESFilmicToneMapping`, `RoomEnvironment` PMREMGenerator).
   - Responsive pointer tilt damping and snip animation.
   - Collapsible ergonomic bottom control dock with finish selector (Champagne Gold, Rose Gold, Platinum, Obsidian).

2. **14 Dedicated Clean-URL Pages**:
   - `//` — Homepage with 3D hero, services highlights, package spotlights, and location map.
   - `//about` — Salon philosophy, sterilized tool hygiene standards, and unisex approach.
   - `//mens-salon` — Men's haircuts, beard grooming, and 15 complete special packages.
   - `//womens-salon` — Women's hair spa, styling, facials, and approved special packages.
   - `//special-packages` — Searchable and filterable package directory.
   - `//gallery` — Salon ambiance, styling stations, and treatment gallery with lightbox.
   - `//contact` — Direct contact channels, Google Maps directions, and location details.
   - `//book-appointment` — Full appointment booking inquiry page.
   - `//privacy-policy` & `//terms-and-conditions` — Compliant legal notices.
   - 12 Individual service pages (`/haircut-and-styling`, `/hair-spa`, `/hair-colour`, `/inoa-hair-colour`, `/facial-and-skincare`, `/fruit-clean-up`, `/d-tan-treatments`, etc.) with benefits, FAQs, and package cross-sells.

3. **In-App PIN-Protected Owner Portal (`/admin` / lock toggle in footer)**:
   - Default PIN: `110084` (Burari Pincode).
   - Live toggling of public price visibility.
   - Package status toggle (Published vs. Draft) for all 29 packages.
   - Edit announcement bar text and phone contact details.

4. **Appointment Workflow & Salon Pass**:
   - Client-side validation (10-digit Indian phone format, dates, time slots).
   - Instant WhatsApp link generation with pre-filled inquiry details.
   - On-screen printable salon appointment pass with reference ID.
   - One-click `.ics` calendar file download.
   - Direct call fallback for non-WhatsApp users.

5. **Local SEO & Structured Data**:
   - Semantic HTML5 with dynamic `<title>` and `<meta name="description">` per page.
   - Schema.org `HairSalon` JSON-LD structured data with verified NAP details.
   - `public/sitemap.xml` and `public/robots.txt` included.

---

## Development & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start local development server on port 3000
npm run dev
```

### Production Build
```bash
# Compile and build optimized static assets
npm run build

# Preview production build
npm run preview
```

### Google Search Console & Google Business Profile Setup
1. Claim or verify the Google Business Profile listing for **ART OF SCISSOR Unisex Salon** at `Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, West Sant Nagar, Burari, Delhi 110084`.
2. Add the primary website URL to the Google Business Profile website field.
3. Submit `https://artofscissor.com/sitemap.xml` to Google Search Console to index all 14 service and package URLs.
