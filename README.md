# Juci - Fresh Juice & Smoothie Bar Website

A modern, fast, and accessible website for Juci, Birmingham's premier juice and smoothie bar. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, mobile-first design with Juci's brand colors and typography
- **Fast Performance**: Optimized for Core Web Vitals and Lighthouse scores
- **Accessibility**: WCAG 2.2 AA compliant with semantic HTML and keyboard navigation
- **SEO Optimized**: Complete metadata, structured data, and sitemap
- **Forms**: Contact and job application forms with validation and spam protection
- **QR Codes**: Easy mobile ordering and menu download
- **Responsive**: Works perfectly on all devices

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Validation**: Zod
- **QR Codes**: qrcode.react

## 📱 Pages

1. **Home (`/`)** - Hero section with tagline and navigation tiles
2. **Menu (`/menu`)** - Menu highlights with PDF download and QR codes
3. **About (`/about`)** - Brand story, location, and opening hours
4. **Careers (`/careers`)** - Job application form with file upload
5. **Contact (`/contact`)** - Business enquiry form with contact information

## 🎨 Brand Guidelines

### Colors
- **Accent**: `#BDE3C7` (from CMYK 26/11/22/0)
- **Background**: `#FFFFFF`
- **Foreground**: `#111111`

### Typography
- **Primary**: Aftetir (Regular) - self-hosted
- **Fallback**: system-ui, sans-serif

### Tone
Fresh, minimal, upbeat, health-focused

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd juci
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up fonts**
   - Add `Aftetir-Regular.woff2` and `Aftetir-Regular.woff` to `public/fonts/`
   - Ensure you have proper licensing for the font

4. **Add menu PDF**
   - Add your menu PDF as `public/menu/juci-menu.pdf`

5. **Add images**
   - Add `public/images/og-image.jpg` (1200x630px) for social sharing
   - Add other images as needed (see `public/images/README.md`)

6. **Update configuration**
   - Edit `site.config.ts` with your actual contact details
   - Update phone numbers, email, address, and social media links

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 📝 Configuration

### Site Configuration

Edit `site.config.ts` to update:

- Contact information (phone, email, address)
- Opening hours
- Social media links
- Order URL
- SEO metadata

### Environment Variables

Create `.env.local` for production settings:

\`\`\`env
# Optional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Optional: Email service (for form submissions)
EMAIL_SERVICE_API_KEY=your_api_key
\`\`\`

## 🔧 Customization

### Brand Colors

Update colors in `tailwind.config.ts` and `src/app/globals.css`:

\`\`\`css
:root {
  --color-accent: #BDE3C7;
  --color-bg: #FFFFFF;
  --color-fg: #111111;
}
\`\`\`

### Typography

Replace the Aftetir font by:

1. Adding new font files to `public/fonts/`
2. Updating the `@font-face` declaration in `globals.css`
3. Updating the `fontFamily` in `tailwind.config.ts`

### Form Submissions

The current implementation includes mock API routes. For production:

1. **Contact Form**: Update `/api/contact/route.ts` to send emails or save to database
2. **Job Applications**: Update `/api/apply/route.ts` to handle file uploads and notifications

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The site is a static export compatible with:

- Netlify
- GitHub Pages
- Any static hosting service

\`\`\`bash
npm run build
\`\`\`

This generates a static export in the `out/` directory.

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible indicators
- High contrast colors (AA compliant)
- Screen reader friendly
- Alternative text for images

## 🔍 SEO Features

- Open Graph meta tags
- Twitter Cards
- Structured data (Local Business)
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Semantic HTML

## 📊 Performance

Target Lighthouse scores:

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimization Tips

- Images are lazy-loaded and responsive
- Fonts use `font-display: swap`
- CSS is optimized with Tailwind's purge
- Minimal JavaScript bundle

## 🐛 Form Validation

Both contact and career forms include:

- Client-side validation with Zod
- Server-side validation
- Honeypot spam protection
- File type and size validation (careers)
- Sanitization of user inputs

## 📱 QR Codes

QR codes are generated for:

- Online ordering (links to external order platform)
- Menu PDF download
- Both include accessibility captions

## 🔐 Security

- Form submissions include honeypot fields
- Input sanitization
- File upload validation
- CORS headers configured
- No sensitive data in client code

## 📞 Support

For technical issues or questions about the website:

1. Check this README
2. Review the component documentation in `/src/components/`
3. Check the configuration in `site.config.ts`

## 📄 License

This project is built for Juci. Ensure you have proper licensing for:

- Aftetir font
- Any images used
- Third-party services integrated

---

**Built with ❤️ for Juci Birmingham**

*Sip happens, keep it juci* 🥤
