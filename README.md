
## Getting Started

1. Clone or download the project.
2. Serve the folder with any static file server. Examples:
   - VS Code: Install "Live Server" extension → right-click `index.html` → "Open with Live Server"
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`
   - PHP: `php -S localhost:8000`
3. Open `http://localhost:8000` in your browser.

## Pages Overview

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero, problem cards, philosophy, assessment CTA, product spotlight, how it works, final CTA |
| Shop | `/shop/` | Search, category filters, product grid |
| Product | `/product/` | Product hero, details, FAQ accordion, preview modal |
| Assessment | `/assessment/` | 10-question self-reflection quiz |
| Results | `/results/` | Personalized results based on assessment answers |
| About | `/about/` | Brand story and values |
| FAQ | `/faq/` | Accordion FAQ list |
| Contact | `/contact/` | Contact form with visual success state |
| Privacy | `/privacy/` | Privacy policy |
| Terms | `/terms/` | Terms of service |
| Refund | `/refund/` | Refund policy |

## Key Features

- **Mobile-first responsive design** — optimized for 320px through 1440px+
- **ADHD-friendly UX** — clear hierarchy, short sections, large typography, generous spacing, obvious CTAs, simple navigation
- **CSS-only product mockups** — no stock photography dependency
- **Functional assessment** — 10 questions, localStorage results, redirects to personalized results
- **Product preview modal** — keyboard-navigable slide viewer
- **Shop search & filters** — real-time search and category filtering
- **Accessible** — focus states, ARIA labels, semantic HTML, reduced-motion support

## Design System

### Colors
- Green: `#3F7655`, `#244936`, `#DCE9DE`
- Vanilla/Beige: `#F7F1E3`, `#FBF8F0`, `#E9DDC8`
- Terracotta: `#D9785F`, `#E9A18D`
- Dark text: `#202B25`, `#687169`

### Typography
- Headings: Manrope (Google Fonts)
- Body: Inter (Google Fonts)
- System font stacks as fallbacks

## Notes for Future Development

- **Checkout:** The purchase buttons currently show an alert. To add real payments, replace the `onclick="alert(...)"` handlers with a Stripe Checkout redirect or embed a payment form.
- **Contact form:** The form shows a visual success state but does not submit anywhere. To make it functional, add a `formspree.io` action, a Netlify form attribute, or connect to your own backend endpoint.
- **Assessment storage:** Results are stored in `localStorage`. For persistent cross-device results, send the data to a backend database and retrieve it on the results page.
- **Product data:** Product information is hardcoded in HTML. For a larger catalog, move product data to JSON and render cards with JavaScript, or use a static site generator.
- **Images:** All visuals are currently CSS/SVG. Replace the placeholder icon backgrounds in `shop/index.html` with actual product thumbnails when available.

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari / Chrome

## License

© 2026 DopaFix. All rights reserved.