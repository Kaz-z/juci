export const site = {
  name: "Juci",
  tagline: "",
  location: "Birmingham (UK)",
  phone: "0121 266 4691",
  email: "hello@juci.example",
  orderUrl: "https://order.juci.example",
  pdfMenuUrl: "/menu/juci-menu.pdf",
  address: "1184 Stratford Rd, Birmingham B28 8AB",
  hours: [
    { day: "Mon–Fri", open: "07:00", close: "10:00" },
    { day: "Sat", open: "10:00", close: "10:00" },
    { day: "Sun", open: "10:00", close: "10:00" },
  ],
  socials: {
    instagram: "https://instagram.com/juci",
    tiktok: "https://tiktok.com/@juci"
  },
  seo: {
    title: "Juci - Fresh Juice & Smoothie Bar | Birmingham",
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
