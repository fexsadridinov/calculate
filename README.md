# % Calculated

% Calculated is a single-page web application that provides a suite of financial calculators—including a Percentage Calculator, Mortgage Calculator, APR Calculator, Interest Rate Calculator, and Property Tax Calculator. It’s designed with modern, responsive UI principles and supports dynamic theme toggling (light/dark mode), making it user-friendly and SEO-optimized.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Financial Calculators:**
    - **Percentage Calculator:** (Default home page) — quickly compute percentages.
    - **Mortgage Calculator:** Includes down payment and extra payment simulation.
    - **APR Calculator:** Compare loans with a true annual percentage rate.
    - **Interest Rate Calculator:** Calculate monthly payments and total interest.
    - **Property Tax Calculator:** State-specific property tax estimates.
- **Dynamic Theme Toggling:**
    - Switch between light and dark modes.
    - All UI elements (results card, backgrounds, buttons, etc.) update dynamically.
- **Responsive Single-Page Application:**
    - Built with React and Vite.
    - Fully responsive design for all screen sizes.
- **3D Model Integration (Optional):**
    - Display interactive 3D models using react‑three‑fiber and @react‑three/drei.
- **SEO-Friendly & Monetization-Ready:**
    - Optimized for organic traffic.
    - Structured for future integration with ad networks.

## Technologies

- **React** with **TypeScript**
- **Vite** (build tool)
- **Material UI** for UI components and theming
- **React Router** for navigation
- **react‑three‑fiber** and **@react‑three/drei** (optional for 3D models)
- **ESLint** & **Prettier** for code quality and formatting

## Project Structure

A suggested file structure for this project is:

```plaintext
% Calculated
├── public
│   ├── index.html
│   └── models
│       └── calculator.glb      // 3D model asset (if used)
├── src
│   ├── components
│   │   ├── ResponsiveAppBar.tsx  // Navigation bar with theme toggle
│   │   ├── Footer.tsx            // Fixed footer component
│   │   └── ... (other shared components)
│   ├── context
│   │   └── ColorModeContext.tsx  // Theme and color mode management
│   ├── pages
│   │   ├── PercentagePage.tsx    // Home page (Percentage Calculator)
│   │   ├── APRPage.tsx
│   │   ├── InterestRatePage.tsx
│   │   ├── MortgagePage.tsx
│   │   └── PropertyTaxPage.tsx
│   ├── App.tsx                   // Main layout (with header, footer, and Outlet)
│   ├── index.tsx                 // Entry point
│   └── ... (other utility files)
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── README.md
