---
name: skill-design
description: >
  Generates complete Web or Mobile applications from requirement files (Excel, Word, PDF)
  OR from a rich UI design prompt. Supports two modes: (1) WBS/Spec Mode — parse structured
  requirements and map every item to a UI feature; (2) Design Prompt Mode — extract a full
  design system from a natural-language prompt and generate every screen with pixel-perfect
  consistency, like Stitch by Google. Invoke with a file, a design prompt, or both.
trigger: >
  Activate when the user uploads a requirement file (.xlsx, .xls, .csv, .docx, .doc, .pdf,
  .txt, .md) OR provides a structured UI/design system prompt describing layout, colors,
  typography, components, or screen types for a mobile or web application.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - WebFetch
  - WebSearch
  - TodoWrite
---

# App Generator

> Transform any requirement document or design prompt into a complete, production-ready application — with 100% requirement coverage, pixel-perfect theming, and zero silent assumptions.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Mental Model](#mental-model)
- [Cheat Sheet](#cheat-sheet)
- **Part I — Invocation & Modes**
  - [Trigger Conditions](#trigger-conditions)
  - [Generation Modes](#generation-modes)
  - [Design Prompt Mode](#design-prompt-mode)
- **Part II — Design System Presets**
  - [Token Override Resolution](#token-override-resolution)
  - [Preset: HEROONE](#preset-heroone)
- **Part III — Input Handling**
  - [Accepted File Types](#accepted-file-types)
  - [Field Extraction](#field-extraction)
  - [Normalization — URS](#normalization--urs)
  - [Parsing Rules](#parsing-rules)
- **Part IV — Platform & Theme**
  - [Platform Detection](#platform-detection)
  - [Web Mode](#web-mode)
  - [Mobile Mode](#mobile-mode)
  - [Theme System](#theme-system)
- **Part V — Generation Engine**
  - [UI Generation](#ui-generation)
  - [Component System](#component-system)
  - [Navigation](#navigation)
  - [Data Layer](#data-layer)
- **Part VI — Execution & Validation**
  - [Execution Steps](#execution-steps)
  - [Validation Checks](#validation-checks)
  - [Failure Handling](#failure-handling)
- **Part VII — Rules & Standards**
  - [Non-Negotiable Rules](#non-negotiable-rules)
  - [No-Assumption Policy](#no-assumption-policy)
  - [Quality Standards](#quality-standards)
  - [Smart Defaults](#smart-defaults)
- **Part VIII — Configuration & Output**
  - [Configuration Schema](#configuration-schema)
  - [Output Structure](#output-structure)

---

## Quick Start

> Three ways to invoke — pick one and go.

**Option A — File only**
```
[upload wbs.xlsx]
```
Detects platform and theme automatically. Generates the full system.

**Option B — Design prompt only**
```
"Healthcare mobile app, HEROONE preset"
```
Activates Design Prompt Mode. Generates all screens from design intent.

**Option C — File + prompt**
```
[upload requirements.docx] "Mobile app, dark blue fintech style"
```
Parses all requirements AND applies the design system from the prompt.

**Override individual tokens at any time:**
```
"HEROONE  primary=#1A5276  secondary=#D5DBDB"
```

---

## Mental Model

> How this system works — five stages, every time.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. INGEST      Parse file or prompt → extract raw items       │
│        ↓                                                        │
│   2. NORMALIZE   Map everything → Unified Requirements Schema   │
│        ↓                                                        │
│   3. RESOLVE     Detect platform + theme + design tokens        │
│        ↓                                                        │
│   4. GENERATE    Build pages, components, navigation, data      │
│        ↓                                                        │
│   5. VALIDATE    100% coverage check → report & deliver         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Every step logs its progress. Every assumption is surfaced. Nothing is silent.

---

## Cheat Sheet

> Scan this in 30 seconds when you need a fast reference.

| Goal | How |
|------|-----|
| Generate from file | Upload `.xlsx`, `.docx`, `.pdf`, `.csv`, `.md` |
| Use HEROONE preset | Include `HEROONE` in your prompt |
| Override one token | `HEROONE primary=#FF0000` |
| Force web output | Add `"web app"` to prompt |
| Force mobile output | Add `"mobile app"` to prompt |
| Change framework | `"use Next.js"` / `"use Flutter"` |
| Add dark mode toggle | `"add dark mode toggle"` |
| Disable auth | `"no authentication"` |
| Compact layout | `"compact density"` |

**Token override priority:** explicit arg → named preset → generic default

**Generation is PAUSED for:** platform ambiguity, requirement conflicts.

**Generation is NEVER silent about:** assumptions, missing fields, conflicts.

---

# Part I — Invocation & Modes

## Trigger Conditions

This skill activates when the user provides **any** of the following:

- A file attachment: `.xlsx` `.xls` `.csv` `.docx` `.doc` `.pdf` `.txt` `.md`
- A design system prompt with layout, color, typography, or component descriptions
- A named preset keyword (e.g., `HEROONE`)

---

## Generation Modes

| Input | Mode | Behavior |
|-------|------|----------|
| File only | **WBS/Spec Mode** | Parse requirements → map to UI |
| Design prompt only | **Design Prompt Mode** | Extract DSS → generate all screens |
| File + prompt | **Hybrid Mode** | Parse requirements + apply design system |
| Prompt + hex tokens | **Design Prompt + Tokens** | DSS with explicit color overrides |
| Named preset | **Preset Mode** | All tokens from preset (§ Part II) |
| Preset + overrides | **Preset + Override Mode** | Preset as base, overrides applied |

**Design prompt is detected when the prompt contains any of:**
- Layout keywords: `layout`, `screen`, `card pattern`, `navigation`, `header`, `footer`
- Style keywords: `luxury`, `premium`, `minimal`, `glassmorphism`, `elegant`, `dark fintech`
- Design rules: `"use the same component"`, `"consistent across all screens"`, `"design system"`
- Explicit hex values: e.g., `primary = #00695C`
- Named preset keyword: `HEROONE`, `heroone`, `"Resilient Sanctuary"`

---

## Design Prompt Mode

> _Stitch-style generation — from design intent to pixel-perfect screens._

### What the Skill Does on Invocation

1. Parse the prompt (or file) entirely
2. Normalize all requirements into a unified internal schema
3. Detect target platform (Web / Mobile)
4. Resolve theme — from preset, explicit tokens, or inferred palette
5. Map every requirement to a UI component or page
6. Generate the complete application output
7. Validate coverage — zero missing items
8. Report all flags (assumptions, clarifications, conflicts)

---

### Design System Specification (DSS)

When Design Prompt Mode is active, parse the prompt into a DSS object.

**Token resolution before parsing — apply in order:**
1. Detect named preset (e.g., `HEROONE`) → load all its tokens as the base
2. For each token explicitly provided (e.g., `primary=#FF0000`) → override the preset value
3. If no preset, use the generic defaults below

```json
{
  "dss": {
    "meta": {
      "project_name": "Inferred from prompt",
      "platform": "mobile | web",
      "mood": ["luxury", "premium", "calm", "trustworthy"],
      "style_reference": "Private healthcare concierge"
    },
    "tokens": {
      "color": {
        "primary": "#00695C",
        "secondary": "#F7E7CE",
        "tertiary": "#FFB300",
        "neutral": "#F5F5F0",
        "background": "#F5F5F0",
        "surface": "#FFFFFF",
        "surface_glass": "rgba(255,255,255,0.65)",
        "border_subtle": "rgba(0,105,92,0.12)",
        "text_primary": "#1A1A1A",
        "text_secondary": "#6B7B74",
        "text_muted": "#9EADA9",
        "text_on_primary": "#FFFFFF",
        "success": "#2E7D6E",
        "warning": "#FFB300",
        "error": "#C0392B",
        "gold_accent": "#FFB300"
      },
      "typography": {
        "font_family": "'Inter', 'SF Pro Display', sans-serif",
        "scale": {
          "display": { "size": "28px", "weight": 700, "line_height": 1.2 },
          "heading": { "size": "22px", "weight": 600, "line_height": 1.3 },
          "title":   { "size": "18px", "weight": 600, "line_height": 1.4 },
          "body":    { "size": "15px", "weight": 400, "line_height": 1.6 },
          "label":   { "size": "13px", "weight": 500, "line_height": 1.4 },
          "caption": { "size": "11px", "weight": 400, "line_height": 1.4 }
        }
      },
      "spacing": {
        "unit": 4,
        "screen_padding": 20,
        "card_padding": 20,
        "section_gap": 24,
        "element_gap": 12
      },
      "border_radius": {
        "card": "20px", "button": "14px",
        "input": "12px", "badge": "8px", "avatar": "9999px"
      },
      "shadow": {
        "card": "0 4px 24px rgba(0,105,92,0.08)",
        "card_hover": "0 8px 32px rgba(0,105,92,0.14)",
        "nav": "0 -2px 20px rgba(0,0,0,0.06)",
        "fab": "0 6px 20px rgba(0,105,92,0.35)"
      },
      "effects": {
        "glass_blur": "blur(12px)",
        "glass_bg": "rgba(255,255,255,0.65)",
        "glass_border": "1px solid rgba(255,255,255,0.35)",
        "gradient_header": "linear-gradient(160deg, #E8F5F3 0%, #F5F5F0 100%)",
        "gradient_primary": "linear-gradient(135deg, #00695C 0%, #00897B 100%)",
        "gradient_card_subtle": "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(247,231,206,0.3) 100%)"
      }
    },
    "layout": {
      "structure": "header + scrollable_content + fixed_bottom_nav",
      "header_style": "soft_gradient_with_greeting",
      "content_style": "card_based",
      "nav_style": "floating_bottom_with_fab"
    },
    "rules": {
      "card_system": "luxury_standard",
      "icon_style": "minimal_line_rounded",
      "no_harsh_shadows": true,
      "no_flat_backgrounds": true,
      "no_heavy_icons": true,
      "consistent_across_screens": true,
      "accessibility": {
        "min_touch_target": "44dp",
        "min_contrast_ratio": 4.5,
        "large_readable_text": true
      }
    }
  }
}
```

**Extraction rules:**
- Explicit hex provided → use exactly, do NOT adjust
- Color name given (e.g., `"deep teal"`) → resolve to hex and document the resolution
- Mood keywords but no colors → generate full palette from mood (see [Theme System](#theme-system))
- Every stated rule → log it in `dss.rules`

---

### Screen Inventory

After parsing the DSS, generate a complete Screen Inventory.

**Inference strategy:**
1. Screens explicitly listed → use them exactly
2. Feature list given → convert each feature to a screen
3. App category only (e.g., `"healthcare app"`) → infer standard screen set

**Standard screen set — Healthcare Mobile:**

```
SCREEN INVENTORY — Luxury Healthcare Mobile
──────────────────────────────────────────────────
SCR-001  Home / Dashboard
SCR-002  Appointments — List
SCR-003  Appointments — Book New
SCR-004  Appointments — Detail
SCR-005  Health Records — Overview
SCR-006  Health Records — Detail (Lab / Report)
SCR-007  Medications — List & Schedule
SCR-008  Medications — Detail
SCR-009  Doctors — Directory
SCR-010  Doctors — Profile
SCR-011  Telemedicine — Call / Chat Entry
SCR-012  Wellness — Dashboard (metrics, vitals)
SCR-013  Wellness — Log Entry
SCR-014  Notifications — List
SCR-015  Profile — My Account
SCR-016  Profile — Edit
SCR-017  Settings
SCR-018  Login / Welcome
SCR-019  Onboarding (3 steps)
SCR-020  Emergency / Quick Contact
──────────────────────────────────────────────────
Total: 20 screens
```

---

### Universal Screen Template

Every screen uses this exact structure — only content changes.

```
┌─────────────────────────────────────────────┐
│  STATUS BAR (system)                        │
├─────────────────────────────────────────────┤
│  HEADER ZONE                                │
│  ┌───────────────────────────────────────┐  │
│  │  [back/menu icon]  Page Title  [icon] │  │
│  │  Optional subtitle (muted, smaller)   │  │
│  └───────────────────────────────────────┘  │
│  Background: gradient_header token          │
│  Padding: 20px sides, 16px top, 20px bottom │
├─────────────────────────────────────────────┤
│  CONTENT AREA (ScrollView)                  │
│  Padding: 20px horizontal                   │
│                                             │
│  [SECTION LABEL — if needed]                │
│  ┌────────────── CARD ─────────────────┐   │
│  │ [icon]              [badge/action]  │   │
│  │ Card Title                          │   │
│  │ Main Value / Content                │   │
│  │ Secondary text (muted)              │   │
│  └─────────────────────────────────────┘   │
│  Gap: 16px between cards                    │
│  Gap: 24px between sections                 │
│                                             │
├─────────────────────────────────────────────┤
│  BOTTOM NAVIGATION (fixed)                  │
│  ┌───────────────────────────────────────┐  │
│  │  [icon]  [icon]  [FAB]  [icon]  [icon]│  │
│  │  Home  Appoint  [+]  Records  Profile │  │
│  └───────────────────────────────────────┘  │
│  Background: glass_bg + nav shadow          │
└─────────────────────────────────────────────┘
```

---

### Luxury Card System

The card is the foundational unit. Every variant shares the same base.

**Base card:**
```
background:    gradient_card_subtle
border-radius: 20px
border:        1px solid border_subtle
shadow:        card shadow token
padding:       20px
backdrop:      glass_blur (for glass cards)
```

**Card variants:**

| Variant | Usage | Special Treatment |
|---------|-------|-------------------|
| `InfoCard` | Health metrics, vital stats | Large number, unit label, trend indicator |
| `ActionCard` | Feature navigation tiles | Icon top-left, chevron right |
| `AppointmentCard` | Scheduled events | Color-coded status badge, doctor avatar, time chip |
| `MedicationCard` | Drug schedule items | Pill icon, time chips row, taken/pending toggle |
| `DoctorCard` | Physician listings | Avatar + gold accent rating, specialty badge |
| `AlertCard` | Important notices | Left accent border in tertiary color |
| `StatCard` | KPI tiles | Large metric, sparkline or trend arrow |
| `ListCard` | History rows | Compact, left icon, right value/status |

**Card content structure:**
```
┌─────────────────────────────────────────┐
│  [icon 24px line]          [badge/chip] │  ← top row
│  Card Title          font: title/600    │  ← primary label
│  Main Value          font: display/700  │  ← emphasized data
│  Secondary text      font: caption/muted│  ← supporting info
│  [bottom row: action chips or metadata] │  ← optional
└─────────────────────────────────────────┘
```

> **STRICT CARD RULES**
> - `border-radius: 20px` — never deviate
> - Same shadow token on every card — never custom shadows
> - Icons: 24px, line style, `primary` or `text_secondary` color
> - No filled icons. No colored icon backgrounds (except `StatCard`)
> - Background always from `gradient_card_subtle` or `surface_glass`

---

### Bottom Navigation Specification

```
Structure:     5 items with center FAB
Height:        72px + safe area inset
Background:    rgba(255,255,255,0.85) + glass_blur
Border-top:    1px solid border_subtle
Shadow:        nav shadow token

Items:   [Home]  [Appointments]  [FAB: +]  [Records]  [Profile]

Active:
  Icon color:   primary (#00695C)
  Label color:  primary
  Background:   soft circle rgba(0,105,92,0.08) behind icon

Inactive:
  Icon color:   text_muted
  Label color:  text_muted

FAB:
  Size:         56×56px
  Background:   gradient_primary
  Shadow:       fab shadow token
  Icon:         white, 24px
  Radius:       9999px
  Elevation:    floats 12px above nav bar
```

---

### Screen-by-Screen Rules

**SCR-001 — Home / Dashboard**
- Header: greeting + subtitle + avatar + notification bell
- Row 1: 2-column `StatCard` grid (BP, Steps, Next Appointment, Medications)
- Section: "Upcoming Appointments" → 1–2 `AppointmentCard`
- Section: "Quick Actions" → 2×2 `ActionCard` grid
- Section: "Recent Records" → 2–3 `ListCard`

**SCR-002 — Appointments List**
- Header: "My Appointments" + filter chips (Upcoming / Past / All)
- List: `AppointmentCard` grouped by date
- Empty state: illustration + message + "Book Now" button

**SCR-003 — Book Appointment**
- Header: "Book Appointment" + back button
- Step indicator (1-2-3, minimal line style)
- Step 1: Doctor selection (`DoctorCard` list)
- Step 2: Date/time picker (calendar grid + time slot chips)
- Step 3: Confirmation `InfoCard` + notes textarea
- Sticky footer: "Confirm Booking" (full-width, `gradient_primary`)

**SCR-005 — Health Records**
- Tabs: Lab Results / Imaging / Prescriptions / Reports
- Per tab: `ListCard` list with date + title + status badge
- Upload FAB: "Upload Document"

**SCR-010 — Doctor Profile**
- Header: avatar (80px) + name + specialty + gold star rating
- `InfoCard`: Clinic, Experience, Languages
- `ActionCard`: Book / Message / Call
- Section: "Reviews" → `ListCard`

**SCR-018 — Login / Welcome**
- Full-screen `gradient_header` background
- Logo centered top third
- Welcome headline + muted tagline
- Email + password inputs (inside card container)
- "Sign In" button (full-width, `gradient_primary`)
- "Forgot Password" text link
- "Register" text link at bottom

> All other screens follow: Section label → Card(s) → Consistent spacing.

---

### Component Code Generation Rules

**React Native — tokens/theme.ts (single source of truth):**
```typescript
export const theme = {
  colors: {
    primary: '#00695C',
    secondary: '#F7E7CE',
    tertiary: '#FFB300',
    neutral: '#F5F5F0',
    // ... full token set
  },
  // typography, spacing, radius, shadow...
}
```

**LuxuryCard.tsx — base card component:**
```typescript
interface LuxuryCardProps {
  variant?: 'info' | 'action' | 'appointment' | 'medication'
           | 'doctor' | 'alert' | 'stat' | 'list';
  icon?: string;
  title: string;
  value?: string;
  subtitle?: string;
  badge?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}
```

**Generation output per screen:**
```
screens/
  HomeScreen.tsx
  AppointmentListScreen.tsx
  BookAppointmentScreen.tsx  ...

components/base/
  LuxuryCard.tsx      ← single card, all variants via props
  BottomNav.tsx
  ScreenHeader.tsx
  StatusBadge.tsx
  Avatar.tsx
  ActionButton.tsx
  InputField.tsx
  SectionLabel.tsx
  EmptyState.tsx
  SkeletonCard.tsx

tokens/
  theme.ts            ← ALL design tokens, single file
```

> **NON-NEGOTIABLE CODE RULES**
> - `theme.ts` imported by every component — zero hardcoded values
> - `LuxuryCard` is the only card component — variants via props
> - `ScreenHeader` is the only header — used identically on every screen
> - `BottomNav` is a single shared component — mounted once at navigator level

---

### Design Prompt Mode — Output Report

```
╔══════════════════════════════════════════════════════╗
║         DESIGN PROMPT MODE — GENERATION REPORT       ║
╠══════════════════════════════════════════════════════╣
║ Project       : Luxury Healthcare Mobile             ║
║ Platform      : Mobile (React Native)                ║
║ Style         : Luxury Premium Healthcare            ║
║ Theme Source  : User prompt + explicit tokens        ║
╠══════════════════════════════════════════════════════╣
║ Design Tokens : 48 tokens generated                  ║
║ Screens       : 20 screens                           ║
║ Components    : 14 shared components                 ║
║ Card Variants : 8 variants (1 component, props-driven)║
╠══════════════════════════════════════════════════════╣
║ Consistency   : 100% — same template, all screens    ║
║ Hardcoded val : 0                                    ║
║ Token coverage: 20/20 screens use theme.ts           ║
╠══════════════════════════════════════════════════════╣
║ Resolved colors:                                     ║
║   primary    #00695C  (from user input)              ║
║   secondary  #F7E7CE  (from user input)              ║
║   tertiary   #FFB300  (from user input)              ║
║   neutral    #F5F5F0  (from user input)              ║
║   All other tokens derived from above 4 anchors      ║
╚══════════════════════════════════════════════════════╝
```

---

# Part II — Design System Presets

> Named presets are built-in design systems referenced by name. Preset tokens are **defaults** — explicit command args always win.

## Token Override Resolution

```
Priority 1 (highest)   Explicit command arg      primary=#006a66
Priority 2             Active named preset        HEROONE defaults
Priority 3 (fallback)  Generic DSS defaults       § Design Prompt Mode
```

**Override syntax:**
```
"Build login screen  primary=#1A5276  secondary=#D5DBDB"
  → overrides 2 tokens, rest from active preset

"Use HEROONE preset"
  → all tokens from HEROONE

"HEROONE  primary=#FF6B35"
  → HEROONE for everything except primary
```

**Token source is always logged in the Generation Report:**
```
║   primary    #1A5276  (from user override)       ║
║   secondary  #f0f4f4  (from preset: HEROONE)     ║
║   tertiary   #90d6a0  (from preset: HEROONE)     ║
```

---

## Preset: HEROONE

> **"The Resilient Sanctuary"** — A digital space as safe as home and as precise as a laboratory.

**Activation keywords:** `HEROONE` · `heroone` · `Resilient Sanctuary` · referencing a `DESIGN.md` with HEROONE spec

**Designed for:** Elderly users. Priorities: cognitive ease, visual dignity, editorial typography, generous breathing space.

---

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#006a66` | Gradient start, primary actions, active states |
| `primary_container` | `#20a39e` | Gradient end, secondary fills |
| `on_primary` | `#ffffff` | Text/icons on primary surfaces |
| `secondary` | `#4a6361` | Trust elements (records, doctor profiles) |
| `secondary_container` | `#cce8e6` | Secondary button backgrounds |
| `on_secondary_container` | `#051f1e` | Text on secondary-container |
| `tertiary` | `#4a6045` | Accent elements |
| `tertiary_fixed` | `#90d6a0` | Health category chips |
| `on_tertiary_fixed_variant` | `#0d1f0f` | Text on tertiary-fixed chips |
| `surface` | `#f6fafa` | Base layer background |
| `surface_bright` | `#f6fafa` | Alternative base layer |
| `surface_container_low` | `#f0f4f4` | Primary section backgrounds |
| `surface_container` | `#eaeef0` | Mid-level containers |
| `surface_container_high` | `#e4e9e9` | Elevated containers |
| `surface_container_highest` | `#dfe3e4` | Highest nesting level |
| `surface_container_lowest` | `#ffffff` | Interactive cards — creates "pop" |
| `on_surface` | `#181c1d` | All body text — **never use pure black** |
| `on_surface_variant` | `#3f4948` | Muted / secondary text |
| `outline` | `#6f7979` | Outlines (use sparingly) |
| `outline_variant` | `#bcc9c7` | Ghost borders at 15% opacity |
| `error` | `#ba1a1a` | Error states |

---

### Typography Tokens

```
font_family:   'Lexend', sans-serif
               Hyper-legible, expanded character width — premier choice for elderly users

display_lg:    3.5625rem  weight=400  lh=1.12
display_md:    2.8125rem  weight=400  lh=1.15   ← welcome messages, critical stats
display_sm:    2.25rem    weight=400  lh=1.22

headline_lg:   2rem       weight=400  lh=1.25   ← page headers (on_surface color)
headline_md:   1.75rem    weight=400  lh=1.29
headline_sm:   1.5rem     weight=400  lh=1.33

title_lg:      1.375rem   weight=400  lh=1.27   ← card headers
title_md:      1rem       weight=500  lh=1.5
title_sm:      0.875rem   weight=500  lh=1.43

body_lg:       1rem       weight=400  lh=1.5    ← MINIMUM for instructional text
body_md:       0.875rem   weight=400  lh=1.43   ← MINIMUM for any copy on screen
label_lg:      0.875rem   weight=500  lh=1.43
label_md:      0.75rem    weight=500  lh=1.33
label_sm:      0.6875rem  weight=500  lh=1.45
```

> Use `display` sizes to create an asymmetrical focal point. Large white space around a single powerful headline is intentional — do not balance it away.

---

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `spacing_4` | `1rem / 16px` | Inner card separation |
| `spacing_6` | `1.5rem / 24px` | Card content vertical spacing |
| `spacing_12` | `4rem / 64px` | Breathing zones between major sections |
| `spacing_16` | `5.5rem / 88px` | Extra-large breathing zones |
| `screen_padding` | `24px` | Horizontal screen edge padding |

---

### Border Radius Tokens

| Token | Value | Rule |
|-------|-------|------|
| `rounded_full` | `9999px` | Floating nav, glassmorphism modals |
| `rounded_lg` | `2rem / 32px` | Buttons, major cards |
| `rounded_md` | `1.5rem / 24px` | Input fields |
| `rounded_sm` | `0.5rem / 8px` | Minimum — **every corner must have at least this** |
| `rounded_none` | **FORBIDDEN** | Violates "Caring" brand tone |

---

### Effect Tokens

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRADIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gradient_primary:
  linear-gradient(135deg, #006a66 0%, #20a39e 100%)
  → Hero header, primary buttons, FAB

gradient_header_luxury:
  linear-gradient(160deg, #004d4a 0%, #006a66 45%, #20a39e 100%)
  → Full-bleed page header — deeper, richer 3-stop version

gradient_surface_card:
  linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,244,244,0.60) 100%)
  → Default card background — "lit from top" effect

gradient_gold_accent:
  linear-gradient(135deg, #c8a96e 0%, #e8d5a3 50%, #c8a96e 100%)
  → Premium badges, rating stars, VIP indicators

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLASSMORPHISM — 3 tiers
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
glass_subtle:
  background: rgba(255,255,255,0.55)
  backdrop-filter: blur(12px) saturate(160%)
  border: 1px solid rgba(255,255,255,0.30)
  → Service/feature tiles sitting on gradient header

glass_mid:
  background: rgba(255,255,255,0.72)
  backdrop-filter: blur(20px) saturate(180%)
  border: 1px solid rgba(255,255,255,0.45)
  → Floating bottom navigation bar

glass_strong:
  background: rgba(255,255,255,0.88)
  backdrop-filter: blur(32px) saturate(200%)
  border: 1px solid rgba(255,255,255,0.60)
  → Modals, bottom sheets, critical overlays

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LUXURY SHADOWS — always layered, never single-layer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
shadow_card:
  0 2px  6px  rgba(0,106,102,0.06)    ← tight contact shadow
  0 8px  24px rgba(0,106,102,0.10)    ← mid lift
  0 20px 48px rgba(0,106,102,0.07)    ← long ambient bloom
  → All standard cards

shadow_card_elevated:
  0 4px  10px rgba(0,106,102,0.08)
  0 16px 40px rgba(0,106,102,0.14)
  0 32px 72px rgba(0,106,102,0.10)
  → Appointment card, Doctor card (highest importance)

shadow_fab:
  0 4px  12px rgba(0,106,102,0.30)
  0 12px 32px rgba(0,106,102,0.25)
  0 0    0    6px rgba(32,163,158,0.15)   ← soft color glow ring
  → FAB button only

shadow_header:
  0 8px  32px rgba(0,77,74,0.18)
  0 2px   8px rgba(0,0,0,0.08)
  → Bottom edge of the gradient header

shadow_nav:
  0 -4px 24px rgba(0,106,102,0.08)
  0 -1px  6px rgba(0,0,0,0.04)
  → Bottom navigation bar top edge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BORDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ghost_border:
  1px solid rgba(188,201,199,0.15)
  → Fallback boundary when contrast testing requires it

luxury_border:
  1px solid rgba(255,255,255,0.50)
  → Glass cards sitting on gradient backgrounds

gold_border:
  1px solid rgba(200,169,110,0.35)
  → Premium/VIP card accent ring
```

---

### HEROONE Design Rules

> These rules are non-negotiable. They define the "Resilient Sanctuary" brand.

| Rule | Definition |
|------|-----------|
| **NO_LINE_RULE** | Never use 1px solid borders for section separation. Use background color shifts instead (`surface-container-low` → `surface-container-lowest`) |
| **NO_BLACK_RULE** | Never use `#000000`. Use `on_surface` (`#181c1d`) for all text |
| **NO_ROUNDED_NONE** | Every corner must have at minimum `rounded_sm` |
| **NO_DIVIDERS** | Never use horizontal lines inside cards. Use `spacing_4` / `spacing_6` |
| **NO_FLOATING_LABELS** | Input labels must always be persistent — never disappear on focus |
| **NO_MICRO_COPY** | Any visible text must be at least `body_md` size |
| **BREATHING_ZONES** | Use `spacing_12` (4rem) or `spacing_16` (5.5rem) between major sections |
| **EDITORIAL_ASYMMETRY** | Large display text with generous surrounding whitespace is intentional |
| **TAP_TARGETS** | Minimum 48px high, preferably 56px for elderly accessibility |

---

### HEROONE Component Defaults

**Page Header (gradient zone)**
```
background:   gradient_header_luxury
padding:      24px sides, 20px top, 28px bottom
shadow:       shadow_header
corners:      rounded_lg on bottom-left + bottom-right only (top flush to screen edge)

Contents sit on glass_subtle tiles → "floating card on gradient" effect
```

**Service / Feature Tiles (on header)**
```
background:      glass_subtle
border:          luxury_border
border-radius:   rounded_md
shadow:          0 2px 8px rgba(0,0,0,0.08)
icon:            32px, white or rgba(255,255,255,0.90)
label:           label_lg, white, center-aligned
```

**Standard Cards (content area)**
```
background:      gradient_surface_card
border-radius:   rounded_lg
border:          ghost_border
shadow:          shadow_card
padding:         20px
inner gap:       spacing_4 (16px) between rows
```

**Elevated Cards (appointments, doctors)**
```
background:      gradient_surface_card
border-radius:   rounded_lg
border:          1px solid rgba(0,106,102,0.12)
shadow:          shadow_card_elevated
padding:         20px
accent bar:      4px left border in gradient_primary (for confirmed/active status)
```

**Status Badges**
```
Pending:   rgba(255,171,0,0.12)  text #b36a00  border rgba(255,171,0,0.25)
Confirmed: rgba(0,106,102,0.10)  text #006a66  border rgba(0,106,102,0.20)
Completed: rgba(46,125,50,0.10)  text #2e7d32  border rgba(46,125,50,0.20)

border-radius: rounded_full
padding:       4px 10px
font:          label_sm, weight 600
```

**FAB Button**
```
background:   gradient_primary
radius:       rounded_full
size:         56×56px
shadow:       shadow_fab
offset:       floats 14px above nav bar
icon:         white, 24px, line weight 2
```

**Bottom Navigation Bar**
```
background:   glass_mid
border-top:   luxury_border
shadow:       shadow_nav
height:       72px + safe-area-inset-bottom
active icon:  primary (#006a66)
active pill:  rgba(0,106,102,0.10), rounded_full, 40×32px
inactive:     on_surface_variant (#3f4948)
```

**Inputs**
```
Default:  surface_container_low,  rounded_md
Active:   surface_container_lowest + 1px solid rgba(0,106,102,0.20)
Focus ring: 0 0 0 3px rgba(0,106,102,0.08)
Labels:   persistent, label_md, on_surface_variant
```

**Chips**
```
Health categories: tertiary_fixed (#90d6a0) bg, on_tertiary_fixed_variant text
Filter chips:      glass_subtle + ghost_border, label_md
```

---

# Part III — Input Handling

## Accepted File Types

| Format | Handling Method |
|--------|----------------|
| `.xlsx` / `.xls` | Parse all sheets; each row = one requirement |
| `.csv` | Header row = field names; each row = one requirement |
| `.docx` / `.doc` | Parse headings, tables, bullets, numbered lists |
| `.pdf` | Extract text blocks, tables, section headers |
| `.txt` / `.md` | Parse line-by-line; detect hierarchy by indentation |

**Multi-sheet / multi-section handling:**
- Excel → process **every sheet**, label each as a logical module
- Word/PDF → each `H1` / `Heading 1` = top-level module; sub-headings = sub-features
- Plain text → indentation depth (2 or 4 spaces / tabs) infers hierarchy

---

## Field Extraction

For each detected requirement:

```json
{
  "id": "REQ-001",
  "module": "Order Management",
  "feature": "Create Order",
  "description": "User can create a new order with product selection",
  "actor": "Customer",
  "priority": "High",
  "status": "Must Have",
  "notes": "",
  "source_row": 5,
  "source_sheet": "WBS"
}
```

| Situation | Action |
|-----------|--------|
| Field missing in source | Set value to `null` — do NOT omit the key |
| Priority missing | Default to `"Medium"` + flag `[ASSUMED: priority=Medium]` |
| Actor missing | Infer from module name or flag `[NEEDS CLARIFICATION: actor unknown]` |

---

## Normalization — URS

All requirements normalize into a **Unified Requirements Schema (URS)**:

```json
{
  "project": {
    "name": "Detected or inferred project name",
    "platform": "web | mobile | unknown",
    "theme_hint": "From user prompt or null"
  },
  "modules": [
    {
      "id": "MOD-001",
      "name": "Module Name",
      "features": [
        {
          "id": "REQ-001",
          "name": "Feature Name",
          "description": "...",
          "actor": "...",
          "priority": "High | Medium | Low",
          "ui_type": "page | modal | drawer | widget | form | list | chart",
          "flags": []
        }
      ]
    }
  ],
  "flags": [
    { "id": "REQ-005", "type": "ASSUMED", "field": "priority", "value": "Medium" },
    { "id": "REQ-009", "type": "NEEDS_CLARIFICATION", "field": "actor", "message": "Actor not specified" }
  ]
}
```

---

## Parsing Rules

### WBS Structure Detection

- Column named `WBS`, `ID`, `Task ID`, `Item No` → hierarchy identifier
- Numeric codes: `1.0` = Module, `1.1` = Feature, `1.1.1` = Sub-feature

### Column Mapping Heuristics

| Source Column Pattern | Maps To |
|----------------------|---------|
| `Task`, `Feature`, `Function`, `Requirement` | `feature.name` |
| `Description`, `Detail`, `Spec`, `Note` | `feature.description` |
| `Priority`, `Importance`, `Level` | `feature.priority` |
| `Actor`, `User`, `Role`, `Who` | `feature.actor` |
| `Status`, `Phase`, `Release` | `feature.status` |
| `Screen`, `Page`, `View`, `UI` | `feature.ui_type` hint |

### Unstructured Text (PDF / Word body)

- `"User can..."`, `"System must..."`, `"Admin should..."` → extract as a feature
- Bullet points under a heading → features within that module
- Tables → treat as structured requirements

### Deduplication

- Identical `name` + `module` + `actor` → merge and note `[MERGED: duplicate at rows X and Y]`

### Completeness Check

- [ ] Every module has at least one feature
- [ ] Every feature has a `name` and `description` (or flagged)
- [ ] No orphan sub-features (without a parent module)

---

# Part IV — Platform & Theme

## Platform Detection

Detect from user prompt first, then fall back to file signals.

| Signal | Platform |
|--------|----------|
| `web`, `website`, `webapp`, `browser`, `portal`, `dashboard` | `web` |
| `mobile`, `app`, `iOS`, `Android`, `Flutter`, `React Native` | `mobile` |
| File keywords: `screen`, `swipe`, `tap`, `gesture` | `mobile` |
| File keywords: `page`, `route`, `URL`, `SEO`, `responsive` | `web` |
| No signal | **PAUSE** → ask user: _"Web or Mobile?"_ |

---

## Web Mode

**Default stack:**

| Layer | Default | Alternatives |
|-------|---------|--------------|
| Framework | React | Next.js, Vue |
| Styling | Tailwind CSS | CSS Modules, Styled Components |
| Routing | React Router | Next.js file-based |
| State | Zustand | Context API |

**Web UI rules:**
- Module → sidebar navigation group or top-level nav item
- Feature → dedicated page or modal, accessible via route
- Layout: sidebar + topbar + content area (default)
- Responsive breakpoints: `640px` `768px` `1024px` `1280px`
- Forms include validation indicators
- Tables include pagination, search, sort

**Output structure per feature:**
```
/pages/[module-name]/[feature-name].tsx
/components/[feature-name]/
  [FeatureName]Form.tsx
  [FeatureName]List.tsx
  [FeatureName]Card.tsx
```

---

## Mobile Mode

**Default stack:**

| Layer | Default | Alternatives |
|-------|---------|--------------|
| Framework | React Native | Flutter |
| Navigation | React Navigation | — |
| State | Zustand | Redux Toolkit |
| Styling | StyleSheet API | NativeWind |

**Mobile UI rules:**
- Module → Bottom Tab or Drawer navigation item
- Feature → Screen in navigation stack
- Touch targets minimum: `44×44dp`
- Native patterns: swipe-to-dismiss, pull-to-refresh, bottom sheets
- No hover states → use `onPressIn` / `onPressOut`
- Lists use `FlatList` or `SectionList`
- Forms use `KeyboardAvoidingView`

**Output structure per feature:**
```
/screens/[ModuleName]/[FeatureName]Screen.tsx
/components/[FeatureName]/
  [FeatureName]Card.tsx
  [FeatureName]Form.tsx
```

---

## Theme System

### Keyword → Theme Mapping

| Prompt Keyword | Theme Profile |
|---------------|--------------|
| `emerald`, `green`, `nature` | Emerald |
| `dark`, `night`, `black` | Dark |
| `fintech`, `banking`, `finance` | Fintech Dark/Blue |
| `light`, `clean`, `minimal`, `white` | Light Minimal |
| `blue`, `corporate`, `enterprise` | Corporate Blue |
| `red`, `bold`, `energetic` | Bold Red |
| `purple`, `lavender`, `soft` | Soft Purple |
| No keyword | **Default: Light Minimal** |

### Design Token Schema

Every theme resolves into a full token set:

```json
{
  "theme": {
    "name": "Emerald",
    "mode": "light",
    "colors": {
      "primary": "#10B981",
      "primary_hover": "#059669",
      "primary_muted": "#D1FAE5",
      "secondary": "#6B7280",
      "background": "#F9FAFB",
      "surface": "#FFFFFF",
      "surface_alt": "#F3F4F6",
      "border": "#E5E7EB",
      "text_primary": "#111827",
      "text_secondary": "#6B7280",
      "text_disabled": "#9CA3AF",
      "text_on_primary": "#FFFFFF",
      "success": "#10B981",
      "warning": "#F59E0B",
      "error": "#EF4444",
      "info": "#3B82F6"
    },
    "typography": {
      "font_family_base": "'Inter', sans-serif",
      "font_family_heading": "'Inter', sans-serif",
      "font_size_xs": "12px",
      "font_size_sm": "14px",
      "font_size_base": "16px",
      "font_size_lg": "18px",
      "font_size_xl": "20px",
      "font_size_2xl": "24px",
      "font_size_3xl": "30px",
      "font_weight_normal": 400,
      "font_weight_medium": 500,
      "font_weight_semibold": 600,
      "font_weight_bold": 700,
      "line_height_tight": 1.25,
      "line_height_base": 1.5,
      "line_height_relaxed": 1.75
    },
    "spacing": {
      "unit": "4px",
      "scale": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
    },
    "border_radius": {
      "sm": "4px", "md": "8px", "lg": "12px",
      "xl": "16px", "full": "9999px"
    },
    "shadow": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.07)",
      "lg": "0 10px 15px rgba(0,0,0,0.10)"
    }
  }
}
```

### Theme Application Rules

- Tokens defined in a **single global file**: `theme.ts` / `theme.json` / `tokens.css`
- ALL components import exclusively from this file — zero hardcoded hex values
- Dark mode: if `mode = "dark"`, invert `background`, `surface`, `text_*` tokens
- Theme applied globally at root (`App.tsx` / `_app.tsx`)

---

# Part V — Generation Engine

## UI Generation

### Page/Screen Generation Process

For every feature in the URS:

1. Determine `ui_type` → `page | modal | drawer | form | list | chart | widget`
2. Select the layout template for that `ui_type`
3. Populate template with fields and actions from the feature description
4. Apply theme tokens throughout
5. Connect to navigation

### UI Type Templates

**`list` — Data List**
- Topbar: page title + "Add New [Entity]" primary button
- Search bar + filter controls
- Table (web) or FlatList (mobile), sortable
- Pagination (web) / infinite scroll (mobile)
- Row actions: View, Edit, Delete

**`form` — Create / Edit**
- Breadcrumb (web) or back button (mobile)
- Grouped form fields matching entity attributes
- Inline validation per field
- Submit + Cancel (sticky footer on mobile)

**`detail` — View Page**
- Entity header: avatar/icon + name + status badge
- Attribute grid (label: value pairs)
- Related sub-lists
- Action buttons: Edit, Delete, custom actions

**`dashboard` — Overview**
- KPI stat cards (top row)
- Charts: type inferred from data (time-series → line, category → bar, proportion → pie)
- Recent activity list
- Quick action shortcuts

**`modal` — Confirmation / Short Form**
- Overlay with backdrop
- Title + body or compact form
- Confirm + Cancel

**`chart` — Analytics / Report**
- Date range selector
- Chart component (type inferred from data)
- Data summary table
- Export button

### Field Type Inference

| Field Pattern | Component |
|--------------|-----------|
| `email`, `e-mail` | `<EmailInput>` with format validation |
| `phone`, `mobile`, `tel` | `<PhoneInput>` with mask |
| `date`, `dob`, `created_at` | `<DatePicker>` |
| `time`, `hour`, `schedule` | `<TimePicker>` |
| `password`, `pin` | `<PasswordInput>` masked |
| `amount`, `price`, `cost`, `total` | `<NumberInput>` with currency format |
| `description`, `note`, `comment`, `remark` | `<Textarea>` |
| `status`, `type`, `category`, `gender` | `<Select>` dropdown |
| `active`, `enabled`, `is_*`, `has_*` | `<Toggle>` / `<Checkbox>` |
| `image`, `photo`, `avatar`, `file`, `attachment` | `<FileUpload>` |
| `address`, `location` | `<AddressInput>` multi-line |
| default | `<TextInput>` |

---

## Component System

### Base Component Library

The following components **must** be generated or declared for every project:

| Component | Description |
|-----------|-------------|
| `Button` | primary / secondary / ghost / danger · sm / md / lg · default / hover / disabled / loading |
| `Input` | Label, placeholder, error state, helper text |
| `Select` | Dropdown, search, single/multi-select |
| `Checkbox` / `Toggle` | Boolean input with label |
| `DatePicker` | Calendar-based date selection |
| `Table` | Sortable, paginated (web) |
| `FlatList` | Performance list (mobile) |
| `Card` | Surface container with optional header/footer |
| `Modal` | Overlay dialog |
| `Drawer` | Side panel (web) / bottom sheet (mobile) |
| `Badge` | Status indicator with color variants |
| `Avatar` | User image with fallback initials |
| `Breadcrumb` | Navigation trail (web only) |
| `Tabs` | Tabbed content switcher |
| `Toast` / `Snackbar` | Notification system |
| `Skeleton` | Loading placeholder for every list/detail |
| `EmptyState` | Zero-data illustration + message + action |
| `ErrorBoundary` | Catches render errors, shows fallback UI |

### Feature-Level Components

For every feature, generate:
```
[FeatureName]Page       (or Screen)
[FeatureName]List
[FeatureName]Card
[FeatureName]Form
[FeatureName]Detail
[FeatureName]DeleteConfirm   (modal)
```

### Props Contract

Every component must define a typed props interface:

```typescript
interface OrderCardProps {
  order: Order;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}
```

### Reuse Rules

- Same structure across features → abstract into `<EntityList>` / `<EntityForm>`
- Never duplicate layout code → use shared `<PageLayout>` wrapper
- Never duplicate form logic → use shared `useForm` hook or library config

---

## Navigation

### Web Navigation

**Default layout: Sidebar + Topbar**

```
AppShell
├── Sidebar
│   ├── Logo
│   ├── NavGroup: [Module 1]
│   │   ├── NavItem: [Feature 1.1] → /module-1/feature-1-1
│   │   └── NavItem: [Feature 1.2] → /module-1/feature-1-2
│   └── NavGroup: [Module 2]
│       └── NavItem: [Feature 2.1] → /module-2/feature-2-1
├── Topbar
│   ├── Page title (dynamic)
│   ├── Breadcrumb
│   └── User menu (avatar + logout)
└── ContentArea → <Outlet />
```

**Route structure:**
```
/                                   → Dashboard or first module
/[module-slug]                      → Module landing or first feature
/[module-slug]/[feature]            → Feature list page
/[module-slug]/[feature]/new        → Create form
/[module-slug]/[feature]/:id        → Detail page
/[module-slug]/[feature]/:id/edit   → Edit form
/login                              → Auth page (if auth module detected)
/404                                → Not found
```

### Mobile Navigation

| Module Count | Pattern |
|-------------|---------|
| 1–4 modules | Bottom Tab Navigator |
| 5+ modules | Drawer Navigator |
| Mixed depth | Drawer + Bottom Tabs |

**Screen stack per module:**
```
Tab: [Module Name]
└── Stack Navigator
    ├── [Feature]ListScreen
    ├── [Feature]DetailScreen
    ├── [Feature]CreateScreen
    └── [Feature]EditScreen
```

### Navigation Coverage Rule

Every feature must have:
- [ ] A reachable route (web) or screen registration (mobile)
- [ ] A navigation entry point (sidebar, tab, or linked from another screen)
- [ ] Zero unreachable screens from the main navigation tree

---

## Data Layer

### Entity Models

For every feature, infer the data entity:

```typescript
interface Order {
  id: string;
  customerId: string;
  status: 'draft' | 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### API Layer (Service Functions)

```typescript
// services/orderService.ts
export const orderService = {
  getAll:   (params: PaginationParams)           => api.get('/orders', { params }),
  getById:  (id: string)                         => api.get(`/orders/${id}`),
  create:   (data: CreateOrderDto)               => api.post('/orders', data),
  update:   (id: string, data: UpdateOrderDto)   => api.put(`/orders/${id}`, data),
  delete:   (id: string)                         => api.delete(`/orders/${id}`),
};
```

### State Management

- Each module → dedicated store slice
- Store contains: `items[]`, `selectedItem`, `loading`, `error`, `pagination`
- All async operations use loading/error states — never fire-and-forget

### Mock Data

- Every entity → mock file with **at least 5 sample records**
- Mock data respects the entity schema exactly
- Used for prototype rendering when no backend is connected

---

# Part VI — Execution & Validation

## Execution Steps

The system follows this exact sequence on every invocation:

```
STEP 1 — File Ingestion
  1.1  Detect file format
  1.2  Extract raw content (text, tables, rows)
  1.3  Log: "Parsed [N] raw items from [filename]"

STEP 2 — Normalization
  2.1  Apply column mapping heuristics
  2.2  Build URS
  2.3  Flag assumed fields
  2.4  Flag clarification-needed fields
  2.5  Log: "Normalized [N] features across [M] modules"

STEP 3 — Platform Detection
  3.1  Scan user prompt for platform keywords
  3.2  Scan file for platform signals
  3.3  Set platform = web | mobile | ask_user
  3.4  Log: "Platform detected: [platform]"

STEP 4 — Theme Resolution
  4.1  Check for named preset
  4.2  Apply token overrides from command
  4.3  Generate full design token set
  4.4  Log: "Theme resolved: [theme name]"

STEP 5 — Architecture Planning
  5.1  List all modules
  5.2  List all features per module
  5.3  Assign ui_type to each feature
  5.4  Build navigation tree
  5.5  Log: "Architecture planned: [N] pages/screens across [M] modules"

STEP 6 — Component Generation
  6.1  Generate base component library
  6.2  Generate feature components
  6.3  Apply theme tokens throughout
  6.4  Log: "Generated [N] components"

STEP 7 — Page / Screen Generation
  7.1  Generate each page/screen using its ui_type template
  7.2  Wire navigation links
  7.3  Connect to service layer
  7.4  Log: "Generated [N] pages/screens"

STEP 8 — Data Layer Generation
  8.1  Generate entity interfaces
  8.2  Generate service files
  8.3  Generate store slices
  8.4  Generate mock data files
  8.5  Log: "Data layer generated"

STEP 9 — Validation Pass
  9.1  Cross-check URS vs generated pages (every feature must have a page)
  9.2  Cross-check navigation (every page must be reachable)
  9.3  Cross-check theme (no hardcoded colors outside theme file)
  9.4  Report coverage: "[N/N] features covered (100%)" or list gaps

STEP 10 — Output & Report
  10.1  Output complete file tree and all code
  10.2  Print Assumptions & Flags report
  10.3  Print Coverage Summary
```

---

## Validation Checks

**Coverage**
```
Total requirements in input:   [N]
Requirements mapped to UI:     [N]
Coverage:                      100%  ✓

If < 100%:
  MISSING: REQ-XXX — [feature name] — not mapped to any page/component
```

**Navigation**
```
Total pages/screens generated:    [N]
Pages reachable from nav tree:    [N]
Orphan pages (unreachable):       0  ✓

If orphans found:
  ORPHAN: /[route] — [PageName] — not linked from any nav item or page
```

**Theme**
```
Hardcoded color values found:    0  ✓
Components using theme tokens:   [N/N] (100%)  ✓
```

**Component Completeness**
```
Empty/stub components:    0  ✓
Components with TODO:     [N]  (list each with reason)
```

---

## Failure Handling

**File parse failure**
```
ERROR: Could not parse [filename].
Reason: [e.g., "file is password-protected", "no readable content found"]
Action: Please provide a readable version of the file.
```
> Do NOT proceed with generation. Do NOT generate a skeleton based on guesses.

**Unrecognizable content**
```
WARNING: Could not detect any requirement items in [filename].
Detected content type: [e.g., "plain prose", "images only"]
Suggestions:
  - Ensure the file contains structured rows, bullet lists, or numbered requirements.
  - If this is a valid WBS, confirm the column headers.
→ Treat as free-form and attempt extraction? (yes/no)
```

**Missing critical fields** (>30% of requirements)
```
WARNING: [N] out of [M] requirements are missing name or description.
Generation will proceed with best-effort extraction.
All affected items will be flagged as [NEEDS_CLARIFICATION].
```

**Platform ambiguity**
```
QUESTION: Should I generate a Web or Mobile application?
→ Generation PAUSED. Reply with "web" or "mobile" to continue.
```

**Conflict detected**
```
CONFLICT DETECTED:
  REQ-020: "Dashboard is the default landing page"
  REQ-021: "Login page is the default landing page"

→ I will not resolve this silently. Please clarify the entry point.
```

---

# Part VII — Rules & Standards

## Non-Negotiable Rules

> These rules cannot be overridden by any user prompt.

| # | Rule | Definition |
|---|------|-----------|
| 1 | **No silent skipping** | Every requirement must appear in output. If not implementable, flag it — never ignore |
| 2 | **No silent assumptions** | Every inference (missing priority, inferred ui_type) must appear in the Assumptions report |
| 3 | **No hardcoded values** | Colors, fonts, spacing reference design tokens only — zero exceptions |
| 4 | **No unreachable pages** | Every generated page/screen must be accessible from the navigation tree |
| 5 | **No incomplete components** | Every component renders valid, non-empty UI. Placeholders labeled `// TODO:` with reason |
| 6 | **No duplicate routes** | Each feature maps to exactly one canonical route/screen |
| 7 | **Full theme propagation** | Selected theme applied to every generated component without exception |
| 8 | **Consistent naming** | `PascalCase` components · `camelCase` variables · `kebab-case` routes/files |

---

## No-Assumption Policy

### What Must Never Be Assumed Silently

| Situation | Required Action |
|-----------|----------------|
| Missing feature priority | Default to `"Medium"` AND add to Assumptions report |
| Missing actor/user role | Infer from module name if possible; else `[NEEDS_CLARIFICATION]` |
| Ambiguous ui_type | Infer from keywords; if uncertain, flag `[ASSUMED: ui_type=list]` |
| Missing page title | Derive from feature name; add to Assumptions report |
| Vague description | Use as-is; flag `[NEEDS_CLARIFICATION: description is vague]` |
| Conflicting requirements | Flag both as `[CONFLICT]` — do NOT pick one silently |

### Assumptions Report Format

```
== ASSUMPTIONS REPORT ==
[ASSUMED]  REQ-004 | priority = "Medium" (not specified in source)
[ASSUMED]  REQ-007 | ui_type = "list" (inferred from feature name "Order History")
[ASSUMED]  REQ-012 | actor = "Admin" (inferred from module "Admin Panel")

== NEEDS CLARIFICATION ==
[CLARIFY]  REQ-009 | actor not specified — who uses "Generate Report"?
[CLARIFY]  REQ-015 | feature "Settings" has no description — what settings are included?

== CONFLICTS ==
[CONFLICT] REQ-020 vs REQ-021 | Both claim to be the default landing page
```

---

## Quality Standards

Every generated output must meet all of the following before delivery:

| Standard | Requirement |
|----------|-------------|
| Coverage | 100% of URS features mapped to UI |
| Navigation | 0 orphan pages/screens |
| Theme | 0 hardcoded color/spacing values outside `tokens.ts` |
| Typing | All props, entities, service params are fully typed |
| Accessibility | `aria-label` / `aria-labelledby` (web); `accessibilityLabel` (mobile) on all interactive elements |
| Loading states | Every async operation has a loading skeleton or spinner |
| Empty states | Every list component has an `EmptyState` fallback |
| Error states | Every async operation has an error message display |
| Naming | PascalCase components · camelCase variables · kebab-case routes/files |
| No dead code | Zero unused imports, variables, or components in generated output |

---

## Smart Defaults

When no explicit instruction is given:

| Scenario | Default Behavior |
|----------|-----------------|
| No theme specified | Light Minimal theme |
| No platform specified | Detect from file; ask if unclear |
| No framework specified | React (web) / React Native (mobile) |
| Feature named `"Dashboard"` or `"Overview"` | `ui_type = "dashboard"`, root route |
| Feature named `"Settings"` or `"Profile"` | Settings drawer / user menu |
| Feature contains `"Report"` or `"Analytics"` | `ui_type = "chart"` |
| Feature contains `"List"`, `"History"`, `"Log"` | `ui_type = "list"` |
| Feature contains `"Create"`, `"Add"`, `"New"` | `ui_type = "form"` |
| Feature contains `"Detail"`, `"View"`, `"Info"` | `ui_type = "detail"` |
| Auth module detected | Auto-generate login, register, forgot-password |
| No explicit CRUD actions | Generate full CRUD for all entities |

---

# Part VIII — Configuration & Output

## Configuration Schema

All aspects are configurable via the initial prompt or a `config` block:

```json
{
  "config": {
    "platform":          "web | mobile",
    "theme":             "emerald | dark | fintech | light | corporate | bold | purple | custom",
    "framework":         "react | nextjs | vue | react-native | flutter",
    "styling":           "tailwind | css-modules | styled-components | nativewind",
    "state_management":  "zustand | redux | context | mobx",
    "navigation_type":   "sidebar | topnav | tabs | drawer | bottom-tabs",
    "density":           "compact | default | comfortable",
    "layout":            "fixed-sidebar | collapsible-sidebar | full-width | centered",
    "auth":              true,
    "dark_mode_toggle":  true,
    "i18n":              false,
    "mock_data":         true
  }
}
```

### Configuration Defaults

| Option | Default |
|--------|---------|
| `platform` | Detected from prompt; fallback: ask user |
| `theme` | Detected from prompt; fallback: `light` |
| `framework` | `react` (web), `react-native` (mobile) |
| `styling` | `tailwind` |
| `state_management` | `zustand` |
| `navigation_type` | `sidebar` (web), `bottom-tabs` (mobile, ≤4 modules) |
| `density` | `default` |
| `layout` | `fixed-sidebar` |
| `auth` | `true` if auth module detected |
| `dark_mode_toggle` | `false` |
| `mock_data` | `true` |

### Prompt-Based Config Override

| User Prompt | Config Override |
|-------------|----------------|
| `"use collapsible sidebar"` | `layout: "collapsible-sidebar"` |
| `"compact density"` | `density: "compact"` |
| `"add dark mode toggle"` | `dark_mode_toggle: true` |
| `"no authentication"` | `auth: false` |
| `"use Next.js"` | `framework: "nextjs"` |
| `"use Flutter"` | `framework: "flutter"` |

---

## Output Structure

### Web

```
[project-name]/
├── public/
│   └── favicon.ico
└── src/
    ├── theme/
    │   └── tokens.ts                    ← ALL design tokens
    ├── components/
    │   ├── base/                        ← Button, Input, Table, Modal...
    │   └── [feature]/                   ← Feature-specific components
    ├── pages/                           (or app/ for Next.js)
    │   ├── index.tsx                    ← Dashboard or redirect
    │   └── [module]/[feature]/
    │       ├── index.tsx                ← List page
    │       ├── [id].tsx                 ← Detail page
    │       ├── new.tsx                  ← Create form
    │       └── [id]/edit.tsx            ← Edit form
    ├── services/[module]Service.ts
    ├── store/[module]Store.ts
    ├── types/[module].types.ts
    ├── mocks/[module].mock.ts
    ├── hooks/use[Feature].ts
    ├── navigation/routes.ts
    └── App.tsx
```

### Mobile

```
[project-name]/
└── src/
    ├── theme/
    │   └── tokens.ts
    ├── components/
    │   ├── base/
    │   └── [feature]/
    ├── screens/[Module]/
    │   ├── [Feature]ListScreen.tsx
    │   ├── [Feature]DetailScreen.tsx
    │   ├── [Feature]CreateScreen.tsx
    │   └── [Feature]EditScreen.tsx
    ├── navigation/
    │   ├── AppNavigator.tsx
    │   ├── [Module]Navigator.tsx
    │   └── routes.ts
    ├── services/[module]Service.ts
    ├── store/[module]Store.ts
    ├── types/[module].types.ts
    └── mocks/[module].mock.ts
```

### Generation Report

```
╔══════════════════════════════════════════╗
║         GENERATION REPORT                ║
╠══════════════════════════════════════════╣
║ Project       : [Project Name]           ║
║ Platform      : Web / Mobile             ║
║ Theme         : [Theme Name]             ║
║ Framework     : [Framework]              ║
╠══════════════════════════════════════════╣
║ Modules       : [N]                      ║
║ Features      : [N]                      ║
║ Pages/Screens : [N]                      ║
║ Components    : [N]                      ║
║ Services      : [N]                      ║
╠══════════════════════════════════════════╣
║ Coverage      : [N/N] (100%)             ║
║ Nav Coverage  : [N/N] (100%)             ║
║ Assumptions   : [N]                      ║
║ Clarifications: [N]                      ║
╚══════════════════════════════════════════╝
```

---

## Summary

> **What the user provides:** a file (Excel / Word / PDF / text) + an optional short prompt.
> **What the system guarantees:**

| Guarantee | Definition |
|-----------|-----------|
| 100% requirement coverage | Every item in the input maps to a UI feature |
| Zero silent assumptions | All inferences are logged and reported |
| Globally consistent theme | Design tokens defined once, applied everywhere |
| Full navigation coverage | Every page/screen is reachable |
| Platform-aware generation | Web and mobile follow their respective UX paradigms |
| Validated on every run | Coverage, navigation, and theme checks are mandatory |
| Deterministic output | Same input + same prompt = same structural output |
| Production-ready quality | Typed, accessible, with loading/empty/error states |
