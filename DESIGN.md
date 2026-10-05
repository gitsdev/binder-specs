---
name: Institutional Compliance Engine
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#515f7a'
  primary: '#000412'
  on-primary: '#ffffff'
  primary-container: '#0f1e36'
  on-primary-container: '#7886a3'
  inverse-primary: '#b8c7e6'
  secondary: '#006c48'
  on-secondary: '#ffffff'
  secondary-container: '#98f6c5'
  on-secondary-container: '#00734d'
  tertiary: '#0c0300'
  on-tertiary: '#ffffff'
  tertiary-container: '#351500'
  on-tertiary-container: '#d16912'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#b8c7e6'
  on-primary-fixed: '#0c1b33'
  on-primary-fixed-variant: '#394761'
  secondary-fixed: '#98f6c5'
  secondary-fixed-dim: '#7cd9aa'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbc7'
  tertiary-fixed-dim: '#ffb689'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#733500'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-compact: 0.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is engineered for state Medicaid caseworkers, health law attorneys, and compliance adjudicators operating in high-liability, high-volume environments. The interface communicates unyielding precision, rigorous federal and state regulatory posture, and calm authority under load. 

The aesthetic is Modern Institutional: a union of dense Swiss informational architecture, deliberate architectural structure, and razor-sharp data legibility. It resists decorative abstraction and low-contrast consumer trends in favor of structural clarity, high-speed keyboard scanability, and unequivocal state signaling. Case managers must process 80-page document packets, verifications, and appeals daily; the visual ergonomics reduce cognitive fatigue while preventing procedural oversights through absolute hierarchy, crisp containment lines, and standardized status semantics.

## Colors

The palette employs a deep slate navy core, clinical neutral surfaces, and uncompromising semantic status hues.

- **Primary (`#0F1E36`)**: Deep Institutional Slate Navy. Used for authoritative structural surfaces, critical action buttons, global navigation anchors, active state outlines, and primary text headings. It grounds the workspace with legal gravity.
- **Secondary (`#0D7A53`)**: Emerald Compliance. Dedicated strictly to affirmative compliance states: statutory verification confirmed, document cleared, eligibility granted, and audit pass.
- **Tertiary (`#C25E00`)**: Amber Conditional. Reserved for pending evidence, conditional redeterminations, 30-day tolling warnings, and discretionary alerts requiring specialist intervention.
- **Mandatory Block / Critical Error (`#B91C1C`)**: Crimson Red. Applied to statutory blocks, sanctions, missing mandatory verifications, procedural deadlines expired, and fraud locks.
- **Neutrals (`#F8FAFC` to `#0F172A`)**: Cool surgical grays.
  - Page Canvas: `#F1F5F9`
  - Container / Card Base: `#FFFFFF`
  - Inset / Sub-table Surfaces: `#F8FAFC`
  - Hairline Rule & Data Borders: `#CBD5E1`
  - Secondary Text: `#475569`
  - Primary Content Text: `#0F172A`

Color is never applied decoratively. Hue denotes audit status, functional affordance, or jurisdictional boundary.

## Typography

The typography pairing reflects rigorous legal engineering:

- **Hanken Grotesk** serves as the primary structural and narrative typeface. It provides modern geometric balance with crisp terminals, superior legibility at small sizes, and distinct numeral forms essential for financial, age, and date determinations.
- **JetBrains Mono** is enforced across all systemic identifiers: Case IDs, SSNs, Medicaid Management Information System (MMIS) codes, statutory citations (e.g., 42 CFR § 435.916), currency tallies, and filter tokens. This prevents misreading characters like `0/O` and `1/I/l` during rapid verification passes.

All table row data adopts tabular lining numerals (`font-variant-numeric: tabular-nums`). All micro-labels, metadata markers, and status chips leverage uppercase styling with explicit letter tracking.

## Layout & Spacing

The system runs on a high-density, multi-pane fluid workspace optimized for 1440px and 1920px clinical workstations, with responsive condensation down to mobile inspections.

- **Primary Structure**: 3-column operational layout consisting of:
  1. Left Utility Navigation / Case List (fixed 280px or collapsible to 56px).
  2. Main Processing Canvas (fluid grid, 12 columns, 16px gutters, 24px margins).
  3. Contextual Drawer / Document Inspector (docked 480px or 640px split pane).
- **Density Standard**: Baseline vertical rhythm utilizes a strict 4px grid. Table row heights are locked to 36px in compact view and 44px in standard view. Form gaps stay tight at `space-md` (12px) to maximize above-the-fold intake fields.
- **Responsive Condensation**:
  - **Desktop (≥ 1280px)**: Persistent split-view canvas allowing side-by-side verification of uploaded proof documents against form inputs.
  - **Tablet (768px - 1279px)**: Drawer becomes an overlay panel (sheet) anchored to the right margin, taking 60% viewport width.
  - **Mobile (< 768px)**: Single column stream with stacked cards; tables convert to key-value definition lists; drawers slide as full-screen modal overlays.

## Elevation & Depth

Visual hierarchy in this system relies on **low-contrast outlines, surface stratification, and precise hairline boundaries** rather than ambient shadows. Excessive elevation blurs institutional clarity; caseworkers need to clearly see where one jurisdictional domain ends and another begins.

- **Level 0 (App Shell / Canvas)**: `#F1F5F9`. The recessed bedrock on which operational containers sit.
- **Level 1 (Data Cards, Grid Containers, Primary Tables)**: `#FFFFFF` flat surface encapsulated by a solid `1px solid #CBD5E1` boundary. No box-shadow.
- **Level 2 (Active Table Rows, Inset Data Wells, Nested Documents)**: `#F8FAFC` background with `1px solid #E2E8F0` internal division.
- **Level 3 (Interactive Menus, Dropdown Selectors, Autocomplete)**: `#FFFFFF` surface with a crisp structural shadow: `0 4px 12px -2px rgba(15, 30, 54, 0.08), 0 1px 3px 0 rgba(15, 30, 54, 0.04)` combined with a `1px solid #94A3B8` border.
- **Level 4 (Docked Inspect Panels & Slide-over Drawers)**: High-order operational focus. `#FFFFFF` framed by a left-edge division: `1px solid #94A3B8` accompanied by an elevated containment shadow: `-8px 0 24px -4px rgba(15, 30, 54, 0.12)`.

## Shapes

The design system implements a controlled, soft corner architecture (`roundedness: 1`, baseline 4px / `0.25rem`). 

- Standard inputs, buttons, chips, alert banners, and table wrappers utilize 4px corners (`rounded`).
- Modal dialogs, floating drawer handles, and main application containers utilize 8px corners (`rounded-lg` / `0.5rem`).
- Circles and pill shapes are strictly prohibited except for numeric badge counters (e.g., notification tallies) to ensure maximum screen efficiency, structured horizontal alignment, and enterprise sobriety. Sharp or minimally rounded boundaries maintain visual alignment across dense tabular columns.

## Components

### Buttons
- **Primary**: Solid Slate Navy (`#0F1E36`) background, white text, 4px border radius. Hover state transitions to `#1E293B`. Active state deepens to `#0B1320`.
- **Secondary / Outline**: 1px solid border `#CBD5E1`, background `#FFFFFF`, text `#0F1E36`. Hover state brings `#F8FAFC` background and `#94A3B8` border.
- **Destructive / Mandatory Block**: Crimson (`#B91C1C`) background, white text. Reserved strictly for adverse actions, sanction enforcements, and case denials.
- **Sizes**: Micro (24px height, 11px font for table actions), Compact (32px height, 13px font for standard workflow), Default (40px height, 14px font for page primary triggers).

### Chips & Filter Badges
- **Interactive Filters**: `#F1F5F9` background, `1px solid #CBD5E1`, `#334155` text. When active, shifts to Slate Navy tint (`#E2E8F0`) with a dark primary dot indicator.
- **Status Indicator Badges**:
  - *Compliant / Verified*: Background `#ECFDF5`, text `#065F46`, border `1px solid #A7F3D0`. Prepended with an emerald check glyph.
  - *Conditional / Pending*: Background `#FFFBEB`, text `#92400E`, border `1px solid #FDE68A`. Prepended with an amber pause/alert glyph.
  - *Mandatory Block / Non-Compliant*: Background `#FEF2F2`, text `#991B1B`, border `1px solid #FECACA`. Prepended with a crimson block glyph.
- Typography: JetBrains Mono, uppercase, `10px`, bold tracking.

### Data Tables
- Header: `#F8FAFC` surface, uppercase `11px` JetBrains Mono text (`#475569`), bottom border `2px solid #CBD5E1`.
- Rows: Strict 36px or 44px height. Zebra-striping disabled; separation achieved via `1px solid #E2E8F0` row dividers.
- Hover: Instant fill `#F1F5F9`. Selected row: `#EFF6FF` with a 3px vertical accent line on the leftmost edge in `#0F1E36`.
- Data Cells: Monospace alignment for dates, dollar amounts, and reference identifiers. Left-aligned for text, right-aligned for numeric calculations.

### Drawer Inspect Panels (Document & Case Audit)
- Fixed right-docked pane (width 480px, 640px, or 50% split).
- Top utility header with document metadata (PDF page number, indexing status, timestamp, OCR confidence rating).
- Integrated dual-pane comparison toolbar allowing side-by-side view of scanned evidence against active system data entries.
- Quick-action footer with sticky "Verify Document", "Flag Discrepancy", and "Reject & Request Proof" button groups.

### Form Inputs & Selectors
- Standard state: `1px solid #CBD5E1`, white background, 4px border radius, text `#0F172A`.
- Focused state: `1px solid #0F1E36` with a crisp `2px` focus ring in `rgba(15, 30, 54, 0.15)`. No fuzzy glow.
- Error / Missing Statutory Verification: `1px solid #B91C1C`, light pink helper text (`#991B1B`).
- Input heights: Compact 32px height matching table operational scale.

### Checkboxes & Radios
- Size: 16x16px square (checkbox) or circle (radio), 1.5px solid `#94A3B8`.
- Checked state: Slate navy fill (`#0F1E36`) with white check or center pip.
- Indeterminate state: Slate navy fill with crisp horizontal bar for batch table selection.