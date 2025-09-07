export const site = {
  name: "Juci",
  tagline: "",
  location: "Birmingham (UK)",
  phone: "+44 121 XXX XXXX",
  email: "hello@juci.example",
  orderUrl: "https://order.juci.example",
  pdfMenuUrl: "/menu/juci-menu.pdf",
  address: "123 Juice Street, Birmingham, UK B1 1AA",
  hours: [
    { day: "Mon–Fri", open: "08:00", close: "18:00" },
    { day: "Sat", open: "09:00", close: "17:00" },
    { day: "Sun", open: "Closed", close: "" },
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
