# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, showcasing a full stack developer's work and skills. The site emphasizes WCAG 2.2 AA accessibility compliance and supports user preferences for reduced motion.

## Technology Stack

- **Framework**: React 18 with Create React App (react-scripts)
- **Routing**: React Router v6
- **Styling**: SCSS with Tailwind CSS for utilities
- **Animations**: Framer Motion and Anime.js
- **Testing**: React Testing Library with Jest
- **Icons**: React Icons
- **Tooltips**: react-tooltip

## Common Commands

```bash
# Development
npm start                 # Start development server (localhost:3000)

# Build
npm run build            # Create production build in /build

# Testing
npm test                 # Run tests in watch mode
npm test -- --coverage   # Run tests with coverage report
```

## Code Architecture

### Entry Point & Routing

- **src/index.js**: Application entry point that sets up routing, wraps the app with Router, and renders Navbar + page routes
- Routes are defined here: `/` (Home), `/about` (About), `/work` (Work - currently commented out)
- All page components are wrapped with persistent Navbar and GoogleAnalytics components

### Page Structure

- **src/pages/**: Page-level components (Home, About, Work, Contact)
- Each page exports from its own directory with index.js barrel exports in src/pages/index.js
- Pages use SCSS modules (Style.scss) co-located with component files

### Component Organization

- **src/components/**: Reusable components with barrel exports via src/components/index.js
- Each component follows the pattern: Component.jsx + Style.scss in its own directory
- Key components:
  - **Navbar**: Accessible navigation with hamburger menu, focus management, keyboard shortcuts
  - **StephenSVG**: Animated SVG logo respecting prefers-reduced-motion preference
  - **TooltipElement**: Individual tooltip components for each technology skill icon
  - **Socials**: Social media links component
  - **Heading**: Reusable page heading component

### Styling System

- **src/styles/**: Centralized styling utilities
  - **animations/animations.js**: Framer Motion animation variants (fade, bar, h1) used across pages
  - **icons/**: Icon definitions and exports
  - **index.scss**: Global styles entry point
  - Custom Tailwind breakpoints: phablet (640px), tabPortrait (768px), tabLandscape (1024px), laptop (1280px), desktop (1440px), wide (1800px)

### Accessibility Focus

Recent commits show strong emphasis on WCAG 2.2 AA compliance:
- Components include proper ARIA labels, roles, and semantic HTML
- Skip-to-content links for keyboard navigation
- Focus management in interactive components (Navbar menu)
- Reduced motion support (StephenSVG respects prefers-reduced-motion)
- All interactive elements have accessible labels and keyboard support

### Key Patterns

1. **Animation Variants**: Import from `src/styles/animations/animations.js` and spread into Framer Motion components
2. **Barrel Exports**: Components and pages use index.js files for clean imports
3. **Co-located Styles**: Each component has its own Style.scss file in the same directory
4. **Motion-Safe Classes**: Components wrap Framer Motion elements with className="motion-safe" for reduced motion handling

## Development Notes

- The project prioritizes accessibility - maintain WCAG 2.2 AA compliance when modifying components
- Always test animations with prefers-reduced-motion enabled
- Use custom Tailwind breakpoints rather than default ones
- Follow existing component structure: Component directory with .jsx and Style.scss files
