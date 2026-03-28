export const site = {
  name: "JUCI",
  tagline: "",
  location: "Birmingham (UK)",
  phone: "0121 266 4691",
  email: "Info@juci.co",
  orderUrl: "https://order.juci.example",
  pdfMenuUrl: "/menu/juci-menu.pdf",
  address: "1184 Stratford Rd, Birmingham B28 8AB",
  /** Map marker (Stratford Rd, B28) — OpenStreetMap reference point */
  store: {
    title: "JUCI — Stratford Road",
    /** WGS84 for Leaflet */
    lat: 52.42076,
    lng: -1.82891,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1184+Stratford+Rd,+Birmingham+B28+8AB,+UK",
  },
  /** Single line for footer, contact page, etc. */
  hoursDisplay: "10am to 10pm Monday to Sunday",
  hours: [{ day: "Mo–Su", open: "10:00", close: "22:00" }],
  socials: {
    instagram: "https://instagram.com/juci",
    tiktok: "https://tiktok.com/@juci"
  },
  seo: {
    title: "JUCI - Fresh Juice & Smoothie Bar | Birmingham",
    description: "",
    keywords: "juice bar, smoothies, healthy drinks, Birmingham, fresh juice, organic",
    url: "https://juci.example"
  },
  brand: {
    colors: {
      background: "#FAF9F6",    // Off-white
      altBackground: "#BDCCC4", // Muted Sage
      text: "#2E2E2E",          // Rich Charcoal
      accent: "#EAC9C1",        // Blush Pink
      highlight: "#E3CBA7",     // Beige Gold
      cta: "#F4A59A"            // Coral
    }
  }
} as const;
