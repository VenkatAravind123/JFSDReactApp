# Jana SevaAP - Component Structure Documentation

## Overview
The Jana SevaAP application has been restructured with modern React components following best practices. All components are organized in a clean, maintainable structure with a centralized design system.

## Directory Structure

```
src/
├── components/
│   ├── HeroSection.js        # Hero banner with CTA buttons
│   ├── CTASection.js         # Citizens & Politicians call-to-action cards
│   ├── StatsSection.js       # Platform statistics with animations
│   ├── NewsSection.js        # Latest news/updates grid
│   └── Footer.js             # Footer with links and copyright
├── styles/
│   ├── globals.css           # Global variables & base styles
│   ├── Header.css            # Navigation header styles
│   ├── HeroSection.css       # Hero section styles
│   ├── CTASection.css        # CTA cards styles
│   ├── StatsSection.css      # Stats section styles
│   ├── NewsSection.css       # News grid styles
│   └── Footer.css            # Footer styles
├── main/
│   ├── MainNavBar.js         # Main navigation wrapper
│   └── Home.js               # Home page (combines all sections)
└── [other existing folders...]
```

## Component Documentation

### 1. **HeroSection.js**
- **Purpose**: Main hero/banner section with eye-catching headline and CTA buttons
- **Props**: None
- **Features**:
  - Responsive background image with overlay
  - "Get Started" button (navigates to registration)
  - "Learn More" button (scrolls to CTA section)
  - Mobile responsive design

### 2. **CTASection.js**
- **Purpose**: Two-card grid showcasing paths for Citizens and Politicians
- **Props**: None
- **Features**:
  - Citizens card with icon and description
  - Politicians card with distinct styling
  - Hover animations
  - Navigation to login pages
  - Background decorative elements

### 3. **StatsSection.js**
- **Purpose**: Displays platform statistics with animated counters
- **Props**: None
- **Features**:
  - Animated counter for Active Citizens (150,000+)
  - Animated counter for Issues Resolved (42,000+)
  - Animated counter for Ongoing Initiatives (1,200+)
  - Responsive grid layout

### 4. **NewsSection.js**
- **Purpose**: Displays latest news/updates in a grid layout
- **Props**: None
- **Features**:
  - 3-column grid on desktop, responsive on mobile
  - News items with images, badges, titles, and excerpts
  - Image hover zoom effect
  - Category badges (Governance, Community, Stats)
  - "View All Updates" link

### 5. **Footer.js**
- **Purpose**: Page footer with company info and links
- **Props**: None
- **Features**:
  - Logo and copyright text
  - Footer links (Privacy, Terms, FAQ, Accessibility)
  - Responsive layout
  - Dynamic year in copyright

### 6. **MainNavBar.js**
- **Purpose**: Main navigation wrapper component
- **Props**: `onAdminLogin`, `onCitizenLogin`, `onPoliticianLogin`
- **Features**:
  - Sticky navigation header
  - Active link highlighting
  - Mobile menu button (placeholder)
  - Login button
  - Routes management for the entire app

### 7. **Home.js**
- **Purpose**: Home page that combines all sections
- **Props**: None
- **Usage**: Renders Hero, CTA, Stats, News sections and Footer

## Design System

### Color Palette
- **Primary**: `#00236f` - Deep blue (government/trust)
- **Secondary**: `#855300` - Brown (authority)
- **Secondary Container**: `#fea619` - Bright orange (accent)
- **Tertiary**: `#4b1c00` - Dark brown

### Spacing
- Mobile margin: `16px`
- Standard gap/gutter: `24px`
- Section padding: `80px` (desktop), `48px` (mobile)

### Typography
- **Headline Font**: Public Sans (600, 700, 800 weights)
- **Body Font**: Inter (400, 500, 600, 700 weights)

### Border Radius
- Small: `0.25rem`
- Medium: `0.5rem`
- Large: `0.75rem`
- Full: `9999px` (pills/circles)

## Responsive Design

All components are mobile-first responsive:
- **Mobile**: Default styling
- **Tablet/Desktop** (768px+): Enhanced layouts, multi-column grids

### Breakpoints
- Mobile: < 768px
- Tablet/Desktop: ≥ 768px

## How to Use

### Import Components
```javascript
import HeroSection from '../components/HeroSection'
import CTASection from '../components/CTASection'
import StatsSection from '../components/StatsSection'
import NewsSection from '../components/NewsSection'
import Footer from '../components/Footer'
```

### Use in Page
```javascript
export default function Home() {
  return (
    <div>
      <HeroSection />
      <CTASection />
      <StatsSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
```

## Customization Guide

### Changing Colors
Edit the CSS variables in `App.css` or component-specific CSS files:
```css
:root {
  --primary: #00236f;
  --secondary: #855300;
  /* ... other colors */
}
```

### Modifying Content
Each component stores its data locally:
- **NewsSection.js**: `newsItems` array (lines ~11-40)
- **StatsSection.js**: Initial stats state in `useState`
- Update images, text, and data directly in component files

### Styling
- Global styles: `src/App.css` and `src/styles/globals.css`
- Component-specific: `src/styles/[ComponentName].css`
- Inline styles: Used sparingly for dynamic styles

## Icons
Material Design Icons are used throughout:
- Icon library: Material Symbols Outlined
- Usage: `<span className="material-symbols-outlined">icon_name</span>`
- Imported via Google Fonts in `public/index.html`

## Navigation
The app uses React Router v6:
- Routes defined in `MainNavBar.js`
- Navigation handled via `Link` component and `useNavigate` hook
- Active link detection using `useLocation` hook

## Performance Notes
- Images use external URLs from Google's CDN
- Counter animations use `requestAnimationFrame` and interval timing
- Smooth scroll behavior enabled via CSS

## Future Enhancements
- Add mobile hamburger menu functionality
- Implement actual news data from API
- Add more interactive elements
- Implement analytics tracking
- Add accessibility features (ARIA labels, keyboard navigation)

## Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
