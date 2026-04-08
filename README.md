# Afshi Landing Page

A beautifully crafted landing page for Afshi, a Pakistani handcrafted abaya brand. Built with React, TypeScript, and Vite.

## Features

- **Bilingual Support** (English & Urdu)
- **Responsive Design** with elegant gold/dark theme
- **SVG Product Illustrations** - no external images needed
- **Smooth Animations** and transitions
- **WhatsApp Integration** for orders

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS-in-JS styling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── AfshiWebsite.tsx    # Main landing page component
│   ├── App.tsx             # Root App component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

The landing page uses CSS-in-JS with a custom color palette defined at the top of `AfshiWebsite.tsx`:

- `G.gold` - Primary accent color (#c8aa64)
- `G.dark` - Background (#0a0906)
- `G.cream` - Text (#f0ead8)

## License

MIT
