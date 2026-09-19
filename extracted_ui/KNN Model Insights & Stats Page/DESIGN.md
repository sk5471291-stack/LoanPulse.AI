---
name: Luminous Ledger
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-margin-desktop: 2rem
  grid-margin-tablet: 1.5rem
  grid-margin-mobile: 1rem
  gutter-desktop: 1.5rem
  gutter-tablet: 1rem
  gutter-mobile: 0.75rem
  card-pad-compact: 1rem
  card-pad-default: 1.5rem
  card-pad-spacious: 2rem
---

## Brand & Style

This design system expresses computational authority, precision wealth management, and intelligence. Designed for modern institutional and high-net-worth algorithmic banking, it bridges high-stakes financial telemetry with ambient artificial intelligence.

The visual style merges **Dark Mode Minimalism** with **Refined Glassmorphism**:
- Ultra-deep slate backgrounds establish an infinite, immersive operational canvas.
- Translucent surface layers (`backdrop-blur-md`, subdued specular rims) organize dense financial flows without adding visual heft.
- Targeted luminescence (emerald, indigo, cyan) directs cognitive load toward action items, AI-driven signals, and liquidity states.
- High-fidelity typography emphasizes numerical clarity and tabular alignment over ornamental display styles.

## Colors

The palette is tuned specifically for low-light environments and long analytical sessions:

- **Foundation (`#0F172A`)**: The deep slate canvas. Secondary elevations derive from translucent overlays (`rgba(255, 255, 255, 0.03)` to `rgba(255, 255, 255, 0.08)`) rather than lighter solid greys.
- **Primary AI & Execution (`#6366F1`)**: Indigo represents machine learning insights, automated routing, primary user actions, and interactive focus states.
- **Success & Settlement (`#10B981`)**: Emerald signals positive returns, cleared balances, liquidity gains, and verified compliance markers.
- **Telemetry & Flow (`#06B6D4`)**: Cyan visualizes live market streams, algorithmic projections, volumetric curves, and data telemetry.
- **Surface Borders**: Strict, hairline structural delineation using `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`. Avoid opaque borders on cards.
- **Text & Foreground**: Primary text sits at `rgba(248, 250, 252, 0.96)` (`#F8FAFC`), secondary metadata at `rgba(148, 163, 184, 0.75)` (`#94A3B8`), and disabled or tertiary states at `rgba(100, 116, 139, 0.6)`.

## Typography

Inter serves as the foundational interface typeface, providing clear legibility under low contrast conditions and dense data arrangements. 

Rules for financial typographic execution:
- Enable OpenType feature settings `cv02`, `cv03`, and `cv04` for enhanced glyph differentiation.
- Apply `tnum` (tabular numbers) to all balances, transaction values, tick changes, and financial data grids to preserve vertical column alignment.
- JetBrains Mono handles raw system outputs, timestamps, API statuses, wallet addresses, and badge micro-labels, providing an explicit engineering aesthetic.
- Negative letter tracking is mandatory on headline and display levels to ensure tight visual density on high-DPI displays.

## Layout & Spacing

The system is constructed around an 8-point spatial base with a 4-point sub-grid for micro-components (chips, metric indicators, and inputs).

### Grid Configuration
- **Desktop (≥ 1280px)**: 12-column responsive fluid grid. Outer margin `32px` (`2rem`), gutters `24px` (`1.5rem`). Maximum layout constraint `1680px`.
- **Tablet (768px – 1279px)**: 8-column responsive fluid grid. Outer margin `24px` (`1.5rem`), gutters `16px` (`1rem`).
- **Mobile (< 768px)**: 4-column fluid grid. Outer margin `16px` (`1rem`), gutters `12px` (`0.75rem`).

### Structural Rules
- Analytical card modules must snap directly to column multiples (3, 4, 6, 8, or 12 columns). Asymmetrical single-column splits are prohibited in core financial dashboards.
- Multi-metric telemetry cards utilize internal micro-gutters of `8px` or `12px` to reinforce structural grouping without visual clutter.

## Elevation & Depth

Visual hierarchy in this system relies on optical transparency, backdrop filters, and subtle ambient luminescence rather than dense drop shadows.

### Surface Tiers
- **Base Canvas (Level 0)**: Solid `#0F172A`. All higher elevations float over this layer.
- **Surface Cards (Level 1)**: `background: rgba(255, 255, 255, 0.04)`, `backdrop-filter: blur(16px)`, bordered by a continuous hairline `1px solid rgba(255, 255, 255, 0.08)`.
- **Floating Modals & Overlays (Level 2)**: `background: rgba(15, 23, 42, 0.85)`, `backdrop-filter: blur(24px)`, with top highlight border `1px solid rgba(255, 255, 255, 0.15)` and outer ambient shadow `0 20px 40px -15px rgba(0, 0, 0, 0.5)`.
- **Interactive Tooltips (Level 3)**: `background: #1E293B`, `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4)`.

### Luminous Accentuation
Depth is reinforced via soft edge glows for critical telemetry:
- **AI/Insights Glow**: `box-shadow: 0 0 24px -4px rgba(99, 102, 241, 0.25)`.
- **Positive Yield Glow**: `box-shadow: 0 0 24px -4px rgba(16, 185, 129, 0.2)`.
- Shadows must never use solid black; use alpha-weighted tones tinted with the dark background hue (`#020617`).

## Shapes

The interface balances modern roundedness with structural utility:

- Standard card modules, telemetry containers, and modal sheets implement `1rem` (`16px`) corner radiuses (`rounded-lg`).
- Form controls, input fields, interactive menu items, and buttons use `0.5rem` (`8px`) radiuses.
- System badges, status pills, and small token identifiers use a fully pill-shaped profile (`9999px`).
- Sharp geometries (`0px`) are reserved exclusively for tabular border lines and continuous chart telemetry axes.

## Components

### Buttons
- **Primary Action (AI & Core)**: Background `#6366F1`, hover `hsl(239, 84%, 60%)`, active `hsl(239, 84%, 54%)`. Text white, weight 500. Features a subtle inner top highlight: `inset 0 1px 0 rgba(255, 255, 255, 0.2)`.
- **Secondary (Glass)**: Background `rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.1)`. Hover state increases opacity to `rgba(255, 255, 255, 0.08)`.
- **Destructive**: Background `rgba(239, 68, 68, 0.1)`, border `1px solid rgba(239, 68, 68, 0.2)`, text `#F87171`.

### Cards & Analytical Panels
- Composed of standard Level 1 glass: `bg-white/[0.04]`, `backdrop-blur-md`, `border border-white/10`.
- Card headers must include uppercase `label-sm` category identifiers, separated from data by an internal divider line of `rgba(255, 255, 255, 0.04)`.

### Form Fields & Inputs
- **Base**: `background: rgba(15, 23, 42, 0.6)`, `border: 1px solid rgba(255, 255, 255, 0.12)`, height `40px`. Text `Inter` body-md. Placeholder color: `rgba(148, 163, 184, 0.5)`.
- **Focus**: Border switches to `#6366F1`, with an exterior focus ring: `0 0 0 3px rgba(99, 102, 241, 0.2)`. Transition duration: `150ms ease-out`.

### Status Badges & Chips
- Formed with `JetBrains Mono` at `label-sm`.
- **Approved/Positive**: Background `rgba(16, 185, 129, 0.12)`, border `rgba(16, 185, 129, 0.3)`, text `#34D399`. Accompanied by a 6px circular glowing ping indicator.
- **AI Processing**: Background `rgba(99, 102, 241, 0.12)`, border `rgba(99, 102, 241, 0.3)`, text `#818CF8`.
- **Telemetry/Active**: Background `rgba(6, 182, 212, 0.12)`, border `rgba(6, 182, 212, 0.3)`, text `#22D3EE`.

### Financial Data Tables
- Header cells: `label-sm` in JetBrains Mono, uppercase, color `#64748B`.
- Row height: `48px` minimum. Alternating row fills are prohibited; rows are separated solely by `1px solid rgba(255, 255, 255, 0.04)` borders.
- Hover state: Row background transitions to `rgba(255, 255, 255, 0.02)`. Numerical figures must strictly align right with `font-variant-numeric: tabular-nums`.

### Checkboxes & Radios
- Size: `18px` by `18px`.
- Base state: Unchecked uses `background: rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.2)`.
- Checked state: Fill `#6366F1`, border `#6366F1`. Checkmark renders with a crisp white hairline icon.