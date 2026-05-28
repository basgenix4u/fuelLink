# FuelLink

FuelLink is a fuel availability and station-support platform concept designed to help users, marketers, depot operators and drivers coordinate fuel information, pricing insights and logistics workflows through a modern web interface.

👤 **Author:** [Abdulbasit Abdulalim](https://github.com/basgenix4u)

---

## Overview

FuelLink demonstrates a client-ready product idea for the fuel and logistics sector. It includes role-based dashboards, live-style fuel price and refinery/depot UI concepts, fleet request workflows, marketer tools and data visualization components.

---

## Key Features

- Public landing page for the FuelLink platform
- Role-based app areas for admin, depot, driver and marketer users
- Depot/refinery ticker components
- Fuel price and fleet request UI concepts
- Marketer calculator tools
- Price alert interaction components
- Chat window component
- QR code support
- Recharts-powered visual dashboard elements
- Zustand state management
- Reusable shared design system components
- Fully responsive Next.js interface

---

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js, React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Radix UI, Lucide Icons, Framer Motion |
| Charts | Recharts |
| State | Zustand |
| Utilities | date-fns, qrcode.react |
| Deployment Target | Vercel |

---

## Project Structure

```txt
src/app/                 App routes, landing page and role-based dashboard areas
src/components/          Landing, depot, marketer and shared UI components
src/lib/                 Utilities, mock data and store setup
src/types/               TypeScript types
public/                  Static assets
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/basgenix4u/fuelLink.git
cd fuelLink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

---

## Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Build production app
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Product Modules

### Admin
Central control area for platform monitoring and operational visibility.

### Depot
Depot/refinery information interface for supply and availability updates.

### Driver
Driver-focused route and workflow experience concept.

### Marketer
Fuel marketer tools including calculator, fleet request, alerts and pricing UI.

---

## Roadmap

- Add real authentication and role-based access control
- Connect to a backend API and production database
- Add station/depot onboarding workflow
- Add live availability reporting
- Add order/request management
- Add map-based station discovery
- Add payment integration
- Add notification system for price and availability alerts
- Add automated testing and CI pipeline

---

## Deployment

FuelLink can be deployed to Vercel.

Recommended checklist:

1. Run `npm run build` locally.
2. Fix lint/type errors before deployment.
3. Add backend/API environment variables when a backend is connected.
4. Configure production domain.
5. Add screenshots and demo credentials to this README when available.

---

## Author

Built and maintained by **Abdulbasit Abdulalim**.

- GitHub: https://github.com/basgenix4u
- Website: https://alimswrite.com
- LinkedIn: https://www.linkedin.com/in/abdulbasit-abdulalim-94a701354
