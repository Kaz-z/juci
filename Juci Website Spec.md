Juci Website — Next.js (Fuel Juice Bars–style)
Objective

Ship a fast, accessible, mobile-first site for Juci, echoing the structure/feel of fueljuicebars.com while staying true to Juci’s identity.

Brand (must-use)

Name: Juci

Tagline: “Sip happens, keep it juci”

Location: Birmingham (UK)

Typeface: Aftetir (Regular) primary; system fallbacks. 

Accent (from brand swatch): CMYK 26/11/22/0 → RGB(189,227,199) → HEX #BDE3C7 (nearest sRGB). 

Palette usage: White/black base; supporting green / pink / beige; subtle greenery motifs (illustrations/overlays). 

Tone: Fresh, minimal, upbeat, health-focused.

Accessibility note: Maintain AA contrast; if #BDE3C7 is used as text on white, pair with an outline/badge or darken 8–12% for contrast.

Tech & Conventions

Framework: Next.js (App Router). If plain React, use Vite + React Router and mirror routes.

Styling: Tailwind CSS; expose brand tokens as CSS variables.

UI: shadcn/ui primitives; lucide-react icons; framer-motion for gentle hero/CTA motion.

Images: next/image (or responsive <img srcset> in plain React).

Forms: zod validation (client + server), simple honeypot.

QR: qrcode.react (or equivalent).

Content config: Single site.config.ts for copy/links.

SEO: Per-page metadata, OG tags, sitemap.xml, robots.txt.

Pages & Requirements
1) Home /

Hero with tagline + CTAs: View Menu (primary) and Order Online for Collection (secondary).

Short intro and greenery/lifestyle imagery.

Three tiles to Menu, About/Location, Careers, Contact.

Acceptance: First contentful paint < 2.0s on 4G; Lighthouse Perf ≥ 90; hero text readable on ≤375px wide screens.

2) Menu /menu

Download PDF menu button (links to provided PDF).

Either: embedded PDF preview or “Highlights” grid (Bowls, Smoothies, Juices) with placeholder items.

“Call us” (tel:) + “Order online for collection” (external).

QR code to order URL; optional second QR for PDF menu.

Acceptance: PDF downloads; tel: opens dialer on mobile; both QR codes scan to correct URLs.

3) About / Location /about

Short brand story; Birmingham map embed; opening hours table.

Address + simple travel/parking note.

Acceptance: Map renders; hours use semantic table; address selectable/copyable.

4) Careers /careers

Application form: Name, Email, Phone, Role (select), Message, CV upload (PDF/DOC).

Success/error states; zod validation; size/type checks.

Acceptance: Posts to mock /api/apply; rejects invalid inputs; accepts only allowed file types/sizes.

5) Contact /contact

Business enquiries form: Name, Email, Message.

Clickable phone + mailto: above form.

Acceptance: Posts to /api/contact; visible confirmation; mailto:/tel: work.

Global UX

Header: Logo wordmark (Aftetir), sticky; nav: Home/Menu/About/Careers/Contact; mobile sheet/drawer.

Footer: Address, hours snippet, socials (placeholders), legal links.

Buttons: Primary (accent), Secondary (outline); clear hover/active/focus.

Grid: 12-col desktop / 6-col tablet / 4-col mobile; consistent spacing scale.

A11y: WCAG 2.2 AA; semantic HTML; keyboard-navigable; focus visible; aria-label on tel/download/order.

Configuration (single source of truth)
// site.config.ts
export const site = {
  phone: "+44 XXX XXX XXXX",
  email: "hello@juci.example",
  orderUrl: "https://order.juci.example",
  pdfMenuUrl: "/menu/juci-menu.pdf",
  address: "Birmingham, UK",
  hours: [
    { day: "Mon–Fri", open: "08:00", close: "18:00" },
    { day: "Sat", open: "09:00", close: "17:00" },
    { day: "Sun", open: "Closed", close: "" },
  ],
  socials: { instagram: "#", tiktok: "#" }
} as const;

File Structure (Next.js App Router)
/app
  /(site)
    /page.tsx                # Home
    /menu/page.tsx
    /about/page.tsx
    /careers/page.tsx
    /contact/page.tsx
  /api
    /apply/route.ts          # Careers form handler (mock)
    /contact/route.ts        # Contact form handler (mock)
/components
  Header.tsx Footer.tsx Button.tsx Section.tsx HoursTable.tsx QR.tsx
/lib
  validators.ts              # zod schemas
  seo.ts                     # metadata helpers
/public
  /images/...                # greenery & product placeholders
  /menu/juci-menu.pdf        # provided PDF
site.config.ts
tailwind.config.ts

Design Tokens & Tailwind
/* globals.css */
:root {
  --color-accent: #BDE3C7;           /* from brand CMYK 26/11/22/0 */
  --color-bg: #FFFFFF;
  --color-fg: #111111;
  --radius: 1rem;
}

// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      accent: 'var(--color-accent)',
      bg: 'var(--color-bg)',
      fg: 'var(--color-fg)',
    },
    borderRadius: { xl: 'var(--radius)' },
    fontFamily: { sans: ['Aftetir', 'system-ui', 'sans-serif'] }, // self-host
  },
}

Components (must include)

Header/Footer with nav + socials.

Button variants (primary/secondary) using accent.

HoursTable (semantic <table>).

QR (wraps qrcode.react) with alt text + caption.

Section (title, kicker, children) for consistent spacing/composition.

SEO & Analytics

generateMetadata per page; OG tags (Home & Menu at minimum).

sitemap.xml, robots.txt, canonical URL.

Optional: Plausible; toggle with env var.

Testing & “Definition of Done”

Lighthouse (mobile, throttled): Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 90, SEO ≥ 90.

Keyboard-only pass: all interactive elements reachable; visible focus.

Forms: zod client + server validation; honeypot field present; success/error toasts/messages.

Links: tel: and mailto: function on desktop/mobile.

QR: scans to orderUrl/pdfMenuUrl.

Bundle: avoid heavy libs; images responsive; minimal layout shift.

Deploy: preview on Vercel/Netlify with working mock APIs.

Deliverables

Git repo with README (setup/run/build/deploy).

Brand tokens (accent/typography) and component usage documented.

Self-hosted Aftetir (Regular) with CSS @font-face and fallbacks. 

One-click deploy instructions.

Kick-off Commands (suggested)
# Next.js + Tailwind starter
npx create-next-app@latest juci --ts --eslint --src-dir --app --import-alias "@/*"
cd juci
npm i tailwindcss postcss autoprefixer zod framer-motion lucide-react qrcode.react
npx tailwindcss init -p
# (Install shadcn/ui per docs; generate Button, Sheet, Card components)


Builder note: If any content is missing (e.g., phone), use obvious placeholders in site.config.ts so non-technical editors can update later without touching code.