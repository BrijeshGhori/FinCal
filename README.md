# GoalFi — Goal-Based Financial Planner

> **FinCal Innovation Hackathon 2026 Submission**

GoalFi is an interactive, goal-based SIP (Systematic Investment Plan) calculator that helps users plan any major financial goal — a house, education, retirement, and more — with mathematically accurate projections adjusted for inflation. No product recommendations. No brand bias. Pure educational financial planning.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Financial Logic](#financial-logic)
- [Brand Compliance](#brand-compliance)
- [Accessibility](#accessibility)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Judging Criteria Checklist](#judging-criteria-checklist)

---

## Overview

GoalFi guides a user through three simple steps:

1. **Select a Goal** — Choose from 8 common financial goals (house, education, retirement, car, business, wedding, travel, emergency fund).
2. **Configure Parameters** — Adjust today's goal cost, investment horizon, expected annual return, and inflation rate using interactive sliders.
3. **View Projection** — Instantly see the required monthly SIP, inflation-adjusted target, total capital invested, compounded returns, and an interactive year-by-year chart breakdown.

---

## Features

| Feature | Description |
|---|---|
| **8 Pre-set Goals** | House, Education, Retirement, Car, Business, Wedding, Travel, Emergency Fund |
| **Inflation Adjustment** | Future Value of the goal is computed using compound inflation |
| **Live Recalculation** | All results update instantly as sliders change |
| **Yearly Projection Chart** | Donut chart (capital vs. returns progress ring) + bar chart (4-column breakdown) |
| **Cost of Delay Warning** | Alerts users how much the monthly SIP increases if they wait 5 years to start |
| **Year Selector** | Explore any individual year's portfolio snapshot via a dropdown |
| **Responsive Layout** | Fully functional on desktop, tablet, and mobile |

---

## Financial Logic

All calculations are implemented in `utils/financeCalculations.js`.

### Key Formulae

**1. Inflation-Adjusted Future Value (FV)**

```
FV = PV × (1 + i)^n
```

Where:
- `PV` = Present cost of the goal today
- `i` = Annual inflation rate
- `n` = Number of years

**2. Required Monthly SIP**

Using the standard SIP Future Value formula (beginning-of-period investment):

```
SIP = (FV × r) / ((1 + r)^N - 1) × (1 + r)
```

Where:
- `r` = Monthly return rate = Annual Return / 12
- `N` = Total months = Years × 12
- Edge case: If `r = 0`, then `SIP = FV / N`

**3. Compounded Returns**

```
Compounded Returns = Final Portfolio Value − Total Capital Invested
```

**4. Portfolio Value at Year Y**

```
Portfolio(Y) = SIP × ((1 + r)^(Y×12) − 1) / r × (1 + r)
```

**5. Cost of Delay**

Re-applies the SIP formula with `N = (Years − 5) × 12` months to show the penalty for a 5-year delay.

---

## Brand Compliance

This project strictly adheres to the FinCal Innovation Hackathon brand guidelines:

| Guideline | Implementation |
|---|---|
| **Primary colour `#224c87`** | Navbar, buttons, donut rings, bar charts, accent text |
| **Alert colour `#da3832`** | Cost of Delay warning card and border only |
| **Neutral `#919090`** | All label text, axis ticks, secondary descriptions |
| **Font: Montserrat** | Loaded via `<link>` in `_document.jsx`, set as `--font-sans` CSS variable |
| **Fallback fonts** | `Arial`, `Verdana` (as specified in guidelines) |
| **No growth arrows** | `TrendingUp`, `ArrowUpRight` icons removed entirely |
| **No currency imagery** | No coin, note, or currency icon used anywhere |
| **No exaggerated metaphors** | Removed "Magic Money", "Time Machine", "Calculate Magic ✨" — replaced with factual labels |

---

## Accessibility

GoalFi targets **WCAG 2.1 AA** compliance throughout:

- **Semantic HTML** — `<nav>`, `<main>`, `<header>`, `<button>`, `<label>`, etc.
- **Form labelling** — Every `<input>` has a paired `<label>` via `htmlFor`/`id` and an `aria-label`
- **Chart accessibility** — Charts wrapped in `role="img"` with `aria-label` and `aria-labelledby`
- **Alert role** — "Cost of Delay" uses `role="alert"` for screen reader announcement
- **Live region** — Year animation spinner uses `aria-live="polite"`
- **Focus rings** — All interactive elements have a visible `:focus-visible` outline in brand blue (`#224c87`) via CSS
- **Keyboard navigation** — All buttons and selects are fully keyboard accessible
- **Colour contrast** — Brand blue on white exceeds 4.5:1 contrast ratio (WCAG AA)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (Pages Router) |
| **Styling** | Tailwind CSS v4 (utility classes + CSS custom properties) |
| **Animations** | Framer Motion |
| **Charts** | Recharts (BarChart, ResponsiveContainer, custom SVG donut) |
| **Icons** | Lucide React, Heroicons v2 |
| **Font** | Montserrat (Google Fonts), Arial, Verdana |
| **Language** | JavaScript (JSX) |

---

## Project Structure

```
/
├── pages/
│   ├── _document.jsx       # Font loading, global HTML structure
│   ├── index.jsx           # Landing page
│   └── dashboard.jsx       # 3-step goal planner flow
│
├── components/
│   ├── GrowthChart.jsx     # Donut ring + Bar chart + Year selector
│   ├── Results.jsx         # Summary cards (SIP, Capital, Returns)
│   └── CalculatorForm.jsx  # Sliders and number inputs
│
├── utils/
│   └── financeCalculations.js  # All SIP and FV formulae
│
└── styles/
    └── globals.css         # Tailwind + brand CSS tokens + slider styles
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Judging Criteria Checklist

| Criterion | Weight | Status | Notes |
|---|---|---|---|
| **Financial Logic Accuracy** | 25% | ✅ | Standard SIP FV formula with beginning-of-period compounding, inflation-adjusted target, cost-of-delay calculation |
| **Compliance Adherence** | 20% | ✅ | Exact brand colours `#224c87`, `#da3832`, `#919090`; Montserrat font; no forbidden visual metaphors |
| **Accessibility Compliance** | 15% | ✅ | ARIA labels, roles, live regions, focus rings, semantic HTML, keyboard navigation |
| **UX Clarity** | 15% | ✅ | 3-step flow, clear professional terminology, responsive layout, Cost of Delay insight |
| **Technical Quality** | 15% | ✅ | Clean component separation, live recalculation via `useEffect`, edge case handling (r=0) |
| **Responsiveness** | 10% | ✅ | Mobile-first, 50/50 chart split on desktop, full-width stacking on mobile/tablet |

---

*GoalFi — Clarity in every rupee.*
