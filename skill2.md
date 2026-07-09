---
name: app-generator
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

# Skill: Application Generator from Requirement Files (Web & Mobile)

## 1. Overview

This skill enables an AI system to ingest requirement documents (Excel, Word, PDF, or plain text), parse all structured and unstructured requirements, and generate a complete, production-ready application prototype — either Web or Mobile — with full UI, navigation, theme, and component coverage.

**Key guarantees:**
- Every requirement in the input file is mapped to a UI feature or component.
- No requirement is silently skipped, assumed, or left incomplete.
- The generated output is consistent, themed, and navigable end-to-end.
- All ambiguities are flagged explicitly — never resolved silently.

---

## 2. Invocation

### Trigger Conditions
This skill activates when a user provides:
- A file attachment: `.xlsx`, `.xls`, `.csv`, `.docx`, `.doc`, `.pdf`, `.txt`, `.md`
- An optional short prompt (e.g., `"use Emerald theme"`, `"build mobile app"`, `"dark fintech style"`)

### Invocation Examples

```
User: [uploads wbs.xlsx] "Build a web app with Emerald theme"
User: [uploads spec.pdf] "Mobile app, dark blue fintech style"
User: [uploads requirements.docx] "Generate the full system"
```

### What the Skill Does on Invocation
1. Parse the uploaded file entirely.
2. Normalize all requirements into a unified internal schema.
3. Detect target platform (Web / Mobile).
4. Resolve theme from user prompt.
5. Map every requirement to a UI component or page.
6. Generate the complete application output.
7. Validate coverage — zero missing items.
8. Report any flags (assumed items, clarification needs).

---

## 2.4 Named Design System Presets

Named presets are built-in design systems that can be referenced by name in a command. When a preset is active, its tokens serve as **defaults**. Any token explicitly provided in the command (e.g., `primary=#custom`) **overrides** the preset value. If no override and no preset is specified, the generator falls back to the generic defaults in Section 2.5.2.

### 2.4.1 Token Override Resolution Order

```
1. Explicit command arg     →  primary=#006a66  (highest priority — use exactly as given)
2. Active named preset      →  HEROONE defaults (used when no explicit override for that token)
3. Generic DSS defaults     →  Section 2.5.2 fallback (used when no preset and no arg)
```

**Override syntax in user commands:**
```
User: "Build login screen  primary=#1A5276  secondary=#D5DBDB"   ← overrides 2 tokens, rest from preset
User: "Use HEROONE preset"                                        ← all tokens from HEROONE
User: "HEROONE  primary=#FF6B35"                                  ← HEROONE except primary
```

After resolving tokens, log the source of each token in the Generation Report (Section 2.5.9):
```
║   primary    #1A5276  (from user override)           ║
║   secondary  #f0f4f4  (from preset: HEROONE)         ║
║   tertiary   #90d6a0  (from preset: HEROONE)         ║
```

---

### 2.4.2 Preset: HEROONE — "The Resilient Sanctuary"

**Activation keywords:** `HEROONE`, `heroone`, `Resilient Sanctuary`, `resilient sanctuary`, or when the user attaches/references a `DESIGN.md` containing HEROONE spec.

**Creative north star:** A digital space that feels as safe as a home and as intelligent as a modern laboratory. Designed for elderly users — prioritizes cognitive ease, visual dignity, editorial typography, and generous breathing space.

#### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#006a66` | Gradient start, primary actions, active states |
| `primary_container` | `#20a39e` | Gradient end, secondary fills |
| `on_primary` | `#ffffff` | Text/icons on primary surfaces |
| `secondary` | `#4a6361` | Trust elements (medical records, doctor profiles) |
| `secondary_container` | `#cce8e6` | Secondary button backgrounds |
| `on_secondary_container` | `#051f1e` | Text on secondary-container |
| `tertiary` | `#4a6045` | Accent elements |
| `tertiary_fixed` | `#90d6a0` | Health category chips ("organic/healthy" feel) |
| `on_tertiary_fixed_variant` | `#0d1f0f` | Text on tertiary-fixed chips |
| `surface` | `#f6fafa` | Base layer background |
| `surface_bright` | `#f6fafa` | Alternative base layer |
| `surface_container_low` | `#f0f4f4` | Primary section backgrounds |
| `surface_container` | `#eaeef0` | Mid-level containers |
| `surface_container_high` | `#e4e9e9` | Elevated containers |
| `surface_container_highest` | `#dfe3e4` | Highest nesting level |
| `surface_container_lowest` | `#ffffff` | Interactive cards (creates "pop" over section bg) |
| `on_surface` | `#181c1d` | All body text — never use pure black |
| `on_surface_variant` | `#3f4948` | Muted / secondary text |
| `outline` | `#6f7979` | Outlines (use sparingly) |
| `outline_variant` | `#bcc9c7` | Ghost borders at 15% opacity |
| `error` | `#ba1a1a` | Error states |

#### Typography Tokens

```
font_family:   'Lexend', sans-serif   (hyper-legible, expanded character width)

display_lg:    size=3.5625rem  weight=400  line-height=1.12
display_md:    size=2.8125rem  weight=400  line-height=1.15   ← welcome / critical stats
display_sm:    size=2.25rem    weight=400  line-height=1.22

headline_lg:   size=2rem       weight=400  line-height=1.25   ← page headers (on_surface color)
headline_md:   size=1.75rem    weight=400  line-height=1.29
headline_sm:   size=1.5rem     weight=400  line-height=1.33

title_lg:      size=1.375rem   weight=400  line-height=1.27   ← card headers
title_md:      size=1rem       weight=500  line-height=1.5
title_sm:      size=0.875rem   weight=500  line-height=1.43

body_lg:       size=1rem       weight=400  line-height=1.5    ← MINIMUM for instructional text
body_md:       size=0.875rem   weight=400  line-height=1.43   ← MINIMUM for any copy on screen
label_lg:      size=0.875rem   weight=500  line-height=1.43
label_md:      size=0.75rem    weight=500  line-height=1.33
label_sm:      size=0.6875rem  weight=500  line-height=1.45
```

#### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `spacing_4` | `1rem (16px)` | Inner card separation |
| `spacing_6` | `1.5rem (24px)` | Card content vertical spacing |
| `spacing_12` | `4rem (64px)` | Breathing zones between major sections |
| `spacing_16` | `5.5rem (88px)` | Extra-large breathing zones |
| `screen_padding` | `24px` | Horizontal screen edge padding |

#### Border Radius Tokens

| Token | Value | Rule |
|-------|-------|------|
| `rounded_full` | `9999px` | Floating nav, glassmorphism modals |
| `rounded_lg` | `2rem (32px)` | Buttons, major cards |
| `rounded_md` | `1.5rem (24px)` | Input fields |
| `rounded_sm` | `0.5rem (8px)` | Minimum — every corner must have at least this |
| `rounded_none` | FORBIDDEN | Never use — violates "Caring" brand tone |

#### Effect Tokens

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRADIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gradient_primary:         linear-gradient(135deg, #006a66 0%, #20a39e 100%)
                          ← Hero header, primary buttons, FAB

gradient_header_luxury:   linear-gradient(160deg, #004d4a 0%, #006a66 45%, #20a39e 100%)
                          ← Full-bleed page header bg — deeper & richer than base

gradient_surface_card:    linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,244,244,0.60) 100%)
                          ← Default card background — gives cards a "lit from top" look

gradient_gold_accent:     linear-gradient(135deg, #c8a96e 0%, #e8d5a3 50%, #c8a96e 100%)
                          ← Premium badge, rating stars, VIP indicators

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLASSMORPHISM (3 tiers)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
glass_subtle:    background: rgba(255,255,255,0.55)
                 backdrop-filter: blur(12px) saturate(160%)
                 border: 1px solid rgba(255,255,255,0.30)
                 ← Service/feature tiles sitting on gradient header

glass_mid:       background: rgba(255,255,255,0.72)
                 backdrop-filter: blur(20px) saturate(180%)
                 border: 1px solid rgba(255,255,255,0.45)
                 ← Floating bottom navigation bar

glass_strong:    background: rgba(255,255,255,0.88)
                 backdrop-filter: blur(32px) saturate(200%)
                 border: 1px solid rgba(255,255,255,0.60)
                 ← Modals, bottom sheets, critical overlays

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LUXURY SHADOWS (layered — never single-layer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
shadow_card:     box-shadow:
                   0 2px  6px  rgba(0,106,102,0.06),   ← tight contact shadow
                   0 8px  24px rgba(0,106,102,0.10),   ← mid lift
                   0 20px 48px rgba(0,106,102,0.07)    ← long ambient bloom
                 ← All standard cards

shadow_card_elevated:  box-shadow:
                         0 4px  10px rgba(0,106,102,0.08),
                         0 16px 40px rgba(0,106,102,0.14),
                         0 32px 72px rgba(0,106,102,0.10)
                       ← Appointment card, Doctor card (highest importance)

shadow_fab:      box-shadow:
                   0 4px  12px rgba(0,106,102,0.30),
                   0 12px 32px rgba(0,106,102,0.25),
                   0 0    0    6px rgba(32,163,158,0.15)  ← soft color ring
                 ← FAB button only

shadow_header:   box-shadow:
                   0 8px  32px rgba(0,77,74,0.18),
                   0 2px   8px rgba(0,0,0,0.08)
                 ← Bottom edge of the gradient header

shadow_nav:      box-shadow:
                   0 -4px 24px rgba(0,106,102,0.08),
                   0 -1px  6px rgba(0,0,0,0.04)
                 ← Bottom navigation bar top edge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BORDERS & OUTLINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ghost_border:    border: 1px solid rgba(188,201,199,0.15)
                 ← Fallback boundary when contrast testing requires it

luxury_border:   border: 1px solid rgba(255,255,255,0.50)
                 ← Used on glass cards sitting on gradient backgrounds

gold_border:     border: 1px solid rgba(200,169,110,0.35)
                 ← Premium/VIP card accent ring
```

#### HEROONE Design Rules (Non-Negotiable)

```
NO_LINE_RULE:        Never use 1px solid borders for section separation.
                     Use background color shifts instead (surface-container-low → surface-container-lowest).

NO_BLACK_RULE:       Never use #000000. Use on_surface (#181c1d) for all text.

NO_ROUNDED_NONE:     Every corner must have at minimum rounded_sm.

NO_DIVIDERS:         Never use horizontal lines inside cards. Use spacing_4 / spacing_6.

NO_FLOATING_LABELS:  Input labels must always be persistent (never disappear on focus).

NO_MICRO_COPY:       Any visible text must be at least body_md size.

BREATHING_ZONES:     Use spacing_12 (4rem) or spacing_16 (5.5rem) between major sections.

EDITORIAL_ASYMMETRY: Large display text may sit with generous surrounding whitespace.
                     This is intentional — do not balance it away.

TAP_TARGETS:         Minimum 48px high, preferably 56px for elderly accessibility.
```

#### HEROONE Component Defaults — Luxury Premium

**Page Header (gradient zone)**
```
background:      gradient_header_luxury
padding:         24px sides, 20px top, 28px bottom
shadow:          shadow_header
Corner clip:     rounded_lg on bottom-left + bottom-right only (top flush to screen edge)

Contents sit on glass tiles (glass_subtle) — creates the "floating card on gradient" effect.
```

**Service / Feature Tiles (on header)**
```
background:      glass_subtle
border:          luxury_border
border-radius:   rounded_md
shadow:          0 2px 8px rgba(0,0,0,0.08)   ← light, so gradient shows through
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

**Status Badges / Chips**
```
Pending:    background rgba(255,171,0,0.12)  + text #b36a00   + border rgba(255,171,0,0.25)
Confirmed:  background rgba(0,106,102,0.10)  + text #006a66   + border rgba(0,106,102,0.20)
Completed:  background rgba(46,125,50,0.10)  + text #2e7d32   + border rgba(46,125,50,0.20)
border-radius: rounded_full
padding: 4px 10px
font: label_sm, weight 600
```

**FAB Button**
```
background:      gradient_primary
border-radius:   rounded_full
size:            56×56px
shadow:          shadow_fab
elevation offset: floats 14px above nav bar
icon:            white, 24px, weight 2 (line icon)
```

**Bottom Navigation Bar**
```
background:      glass_mid
border-top:      luxury_border
shadow:          shadow_nav
height:          72px + safe-area-inset-bottom
active icon:     primary (#006a66)
active bg pill:  rgba(0,106,102,0.10), rounded_full, 40×32px behind icon
inactive icon:   on_surface_variant (#3f4948)
```

**Inputs**
```
Fill (default): surface_container_low,  rounded_md
Fill (active):  surface_container_lowest + border 1px solid rgba(0,106,102,0.20)
shadow (active): 0 0 0 3px rgba(0,106,102,0.08)   ← soft focus ring
Labels: persistent, always visible, label_md, on_surface_variant
```

**Chips**
```
Health categories: tertiary_fixed (#90d6a0) background, on_tertiary_fixed_variant text
Filter chips:      glass_subtle + ghost_border, label_md
```

---

## 2.5 Design Prompt Mode (UI-First Generation — Stitch-Style)

This mode activates when the user provides a **rich design prompt** describing the visual system, mood, layout rules, and component behavior — with or without a requirement file.

It produces a complete, consistent screen set from design intent alone, the same way Google Stitch generates full UI from a single prompt.

---

### 2.5.1 Mode Detection

| Input Type | Mode Selected |
|-----------|--------------|
| File only | WBS/Spec Mode (Section 3–14) |
| Design prompt only (no file) | Design Prompt Mode |
| File + design prompt | Hybrid Mode — parse requirements, apply design system from prompt |
| Design prompt + color tokens (`primary = #00695C`) | Design Prompt Mode with explicit tokens |
| Named preset keyword (e.g., `HEROONE`) | Design Prompt Mode with preset tokens (Section 2.4) |
| Named preset + override tokens (e.g., `HEROONE primary=#FF0000`) | Design Prompt Mode — preset as base, overrides applied |

**Design prompt signals** (any of the following triggers Design Prompt Mode):
- Contains layout keywords: `"layout"`, `"screen"`, `"card pattern"`, `"navigation"`, `"header"`, `"footer"`
- Contains mood/style keywords: `"luxury"`, `"premium"`, `"minimal"`, `"glassmorphism"`, `"elegant"`, `"dark fintech"`
- Contains design rules: `"use the same component"`, `"consistent across all screens"`, `"design system"`
- Contains explicit color hex values (e.g., `primary = #00695C`)
- Contains a named preset keyword: `HEROONE`, `heroone`, `"Resilient Sanctuary"` (see Section 2.4)

---

### 2.5.2 Design Prompt Parsing

When Design Prompt Mode is active, parse the user's prompt into a **Design System Specification (DSS)**.

**Token resolution before parsing:** Apply the override chain from Section 2.4.1:
1. Detect if a named preset is referenced (e.g., `HEROONE`) → load all its tokens as the base.
2. For each token explicitly provided in the command (e.g., `primary=#FF0000`), override the preset value.
3. If no preset is referenced, use the generic defaults shown in the DSS JSON below.



```json
{
  "dss": {
    "meta": {
      "project_name": "Inferred from prompt (e.g., 'Luxury Healthcare App')",
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
          "title": { "size": "18px", "weight": 600, "line_height": 1.4 },
          "body": { "size": "15px", "weight": 400, "line_height": 1.6 },
          "label": { "size": "13px", "weight": 500, "line_height": 1.4 },
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
        "card": "20px",
        "button": "14px",
        "input": "12px",
        "badge": "8px",
        "avatar": "9999px"
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
- If a color hex is provided explicitly (e.g., `primary = #00695C`), use it exactly — do NOT adjust.
- If a color name is given (e.g., `"deep teal"`), resolve it to a specific hex and document the resolution.
- If mood keywords are present but no explicit colors, generate a full palette from mood (see Section 6.1).
- Every rule stated in the prompt becomes a constraint — log it in `dss.rules`.

---

### 2.5.3 Screen Inventory Generation

After parsing the DSS, generate a **Screen Inventory** — the complete list of screens the application must have.

**Inference strategy:**
1. If screens are explicitly listed in the prompt → use them exactly.
2. If a feature list is given → convert each feature to a screen.
3. If only an app category is given (e.g., `"healthcare app"`) → infer a standard screen set for that category.

**Standard screen set for Healthcare Mobile App:**

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

### 2.5.4 Universal Screen Template (Apply to Every Screen)

Every screen follows this exact structure — only content changes, the template never changes:

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

### 2.5.5 Luxury Card System (The Core Component)

The card is the foundational unit. Every card variant follows the same base:

**Base Card Token:**
```
background:    gradient_card_subtle
border-radius: 20px
border:        1px solid border_subtle
shadow:        card shadow token
padding:       20px
backdrop:      glass_blur (for glass cards)
```

**Card Variants:**

| Variant | Usage | Special Treatment |
|---------|-------|-------------------|
| `InfoCard` | Health metrics, vital stats | Large number display, unit label, trend indicator |
| `ActionCard` | Feature navigation tiles | Icon top-left, chevron right, subtle hover state |
| `AppointmentCard` | Scheduled events | Color-coded status badge, doctor avatar, time chip |
| `MedicationCard` | Drug schedule items | Pill icon, time chips row, taken/pending toggle |
| `DoctorCard` | Physician listings | Avatar + gold accent rating, specialty badge |
| `AlertCard` | Important notices | Left accent border in tertiary color, icon top |
| `StatCard` | KPI tiles on dashboard | Large metric, sparkline or trend arrow |
| `ListCard` | History rows | Compact, left icon, right value/status |

**Card Content Structure (all variants):**
```
┌─────────────────────────────────────────┐
│  [icon 24px line]          [badge/chip] │  ← top row
│                                         │
│  Card Title          font: title/600    │  ← primary label
│  Main Value          font: display/700  │  ← emphasized data
│  Secondary text      font: caption/muted│  ← supporting info
│                                         │
│  [bottom row: action chips or metadata] │  ← optional
└─────────────────────────────────────────┘
```

**Strict card rules:**
- All cards use the same `border-radius: 20px` — never deviate.
- All cards use the same shadow token — never use custom shadows.
- Icons inside cards: 24px, line style, color `primary` or `text_secondary`.
- No filled icons. No colored icon backgrounds unless it's a `StatCard`.
- Card background is always from the `gradient_card_subtle` or `surface_glass` token.

---

### 2.5.6 Bottom Navigation Specification

```
Structure: 5 items with center FAB
Height: 72px + safe area inset
Background: rgba(255,255,255,0.85) + glass_blur
Border-top: 1px solid border_subtle
Shadow: nav shadow token

Items:
  [Home]  [Appointments]  [FAB: +]  [Records]  [Profile]

Active item:
  Icon color: primary (#00695C)
  Label color: primary
  Background: soft circle rgba(0,105,92,0.08) behind icon

Inactive item:
  Icon color: text_muted
  Label color: text_muted

FAB (center):
  Size: 56×56px
  Background: gradient_primary
  Shadow: fab shadow token
  Icon: white, 24px
  Border-radius: 9999px (circle)
  Elevation: floats 12px above nav bar
```

---

### 2.5.7 Screen-by-Screen Generation Rules

For each screen in the Screen Inventory:

**SCR-001 Home / Dashboard**
- Header: greeting (`"Good morning, [Name]"`) + subtitle + avatar + notification bell
- Row 1: 2-column grid of `StatCard` (Today's BP, Steps, Next Appointment, Medications)
- Section: "Upcoming Appointments" → 1–2 `AppointmentCard`
- Section: "Quick Actions" → 2×2 grid of `ActionCard`
- Section: "Recent Records" → 2–3 `ListCard`

**SCR-002 Appointments — List**
- Header: "My Appointments" + filter chips (Upcoming / Past / All)
- List: `AppointmentCard` repeated, grouped by date
- Empty state: illustration + "No appointments scheduled" + "Book Now" button

**SCR-003 Appointments — Book New**
- Header: "Book Appointment" + back button
- Step indicator (1-2-3 stepper, minimal line style)
- Step 1: Doctor selection (`DoctorCard` list)
- Step 2: Date/time picker (calendar grid, time slot chips)
- Step 3: Confirmation `InfoCard` + notes textarea
- Sticky footer: "Confirm Booking" button (full-width, gradient_primary)

**SCR-005 Health Records — Overview**
- Header: "My Health Records"
- Tabs: Lab Results / Imaging / Prescriptions / Reports
- Per tab: `ListCard` list with date + title + status badge
- FAB-like button: "Upload Document"

**SCR-010 Doctors — Profile**
- Header: large avatar (80px) + name + specialty + gold star rating
- `InfoCard`: Clinic, Years Experience, Languages
- `ActionCard`: Book Appointment / Send Message / Call Clinic
- Section: "Reviews" → `ListCard` list

**SCR-018 Login / Welcome**
- Full-screen gradient background (gradient_header)
- Logo centered top third
- Welcome headline + tagline (muted)
- Email input + password input (inside card container)
- "Sign In" button (full-width, gradient_primary)
- "Forgot Password" text link (muted, centered)
- "Register" text link at bottom

**[All other screens follow the same pattern — Section label → Card(s) → Consistent spacing]**

---

### 2.5.8 Component Code Generation Rules

When generating actual code for Design Prompt Mode:

**React Native (default for mobile):**
```typescript
// tokens/theme.ts — single source of truth
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

// components/LuxuryCard.tsx — base card component
interface LuxuryCardProps {
  variant?: 'info' | 'action' | 'appointment' | 'medication' | 'doctor' | 'alert' | 'stat' | 'list';
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
  BookAppointmentScreen.tsx
  ...

components/
  base/
    LuxuryCard.tsx         ← single card component, all variants
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
  theme.ts                  ← ALL design tokens, single file
```

**Non-negotiable code rules in Design Prompt Mode:**
- `theme.ts` is imported by every component — zero hardcoded values elsewhere.
- `LuxuryCard` is the only card component — all variants come from props, not separate components.
- `ScreenHeader` is the only header component — used on every screen identically.
- `BottomNav` is a single shared component — mounted once at the navigator level.

---

### 2.5.9 Design Prompt Mode Output Report

After generating all screens, print:

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

## 3. Input Handling

### 3.1 Accepted File Types

| Format | Handling Method |
|--------|----------------|
| `.xlsx` / `.xls` | Parse all sheets; treat rows as requirement items |
| `.csv` | Parse header row as field names; each row = one requirement |
| `.docx` / `.doc` | Parse headings, tables, bullet lists, and numbered lists |
| `.pdf` | Extract text blocks, tables, and section headers |
| `.txt` / `.md` | Parse line-by-line; detect hierarchy by indentation or heading markers |

### 3.2 Multi-Sheet / Multi-Section Handling
- For Excel: process **every sheet**. Label each sheet as a logical module.
- For Word/PDF: treat each `Heading 1` or `H1` as a top-level module, sub-headings as sub-features.
- For plain text: use indentation depth (2 or 4 spaces / tabs) to infer hierarchy.

### 3.3 Field Extraction Per Requirement Item
For each detected requirement, extract:

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

- If a field is missing in the source: set its value to `null` — do NOT omit the key.
- If priority is missing: default to `"Medium"` and flag as `[ASSUMED: priority=Medium]`.
- If actor is missing: infer from context (e.g., module name) or flag as `[NEEDS CLARIFICATION: actor unknown]`.

### 3.4 Normalization
After extraction, all requirements are normalized into a **Unified Requirements Schema (URS)**:

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

## 4. Parsing Rules

### 4.1 WBS Structure Detection
- If the file contains a column named `WBS`, `ID`, `Task ID`, `Item No`, or similar — treat it as the hierarchy identifier.
- Parent-child relationships: inferred from numeric WBS codes (e.g., `1.0` → `1.1` → `1.1.1`) or indentation.
- Top-level items (`1.0`, `2.0`) = Modules.
- Second-level items (`1.1`, `1.2`) = Features / Pages.
- Third-level items (`1.1.1`) = Sub-features / Components.

### 4.2 Column Mapping Heuristics
Map source columns to URS fields using these rules:

| Source Column Pattern | Maps To |
|----------------------|---------|
| `Task`, `Feature`, `Function`, `Requirement` | `feature.name` |
| `Description`, `Detail`, `Spec`, `Note` | `feature.description` |
| `Priority`, `Importance`, `Level` | `feature.priority` |
| `Actor`, `User`, `Role`, `Who` | `feature.actor` |
| `Status`, `Phase`, `Release` | `feature.status` |
| `Screen`, `Page`, `View`, `UI` | `feature.ui_type` hint |

### 4.3 Unstructured Text Parsing
For free-form text (PDF / Word body text):
- Sentence containing verbs: `"User can..."`, `"System must..."`, `"Admin should..."` → extract as a feature.
- Bullet points under a heading → features within that module.
- Tables → treat as structured requirements (apply column mapping heuristics above).

### 4.4 Deduplication
- If two items have identical `name` + `module` + `actor`, merge them and note: `[MERGED: duplicate detected at rows X and Y]`.

### 4.5 Completeness Check After Parsing
After parsing, verify:
- [ ] Every module has at least one feature.
- [ ] Every feature has a `name` and `description` (or flag it).
- [ ] No orphan sub-features (sub-features without a parent module).

---

## 5. Platform Handling

### 5.1 Platform Detection Rules

Detect platform from user prompt first, then fall back to file content signals:

| Signal | Detected Platform |
|--------|------------------|
| Prompt contains: `web`, `website`, `webapp`, `browser`, `portal`, `dashboard` | `web` |
| Prompt contains: `mobile`, `app`, `iOS`, `Android`, `Flutter`, `React Native` | `mobile` |
| File contains columns/keywords: `screen`, `swipe`, `tap`, `gesture` | `mobile` |
| File contains columns/keywords: `page`, `route`, `URL`, `SEO`, `responsive` | `web` |
| No signal detected | Ask user: `"Should I generate a Web or Mobile application?"` |

### 5.2 Web Application Mode

**Stack defaults (configurable):**
- Framework: React (default) or plain HTML/CSS/JS
- Styling: Tailwind CSS
- Routing: React Router or Next.js file-based routing
- State: Context API or Zustand

**Web UI rules:**
- Every module → sidebar navigation group or top-level nav item.
- Every feature → a dedicated page or modal, accessible via route.
- Layout: sidebar + topbar + content area (default). Configurable to: top-nav only, full-width, dashboard grid.
- All pages MUST be responsive: mobile-first breakpoints at `640px`, `768px`, `1024px`, `1280px`.
- Forms include validation indicators.
- Tables include pagination, search, and sort controls.

**Web output per feature:**
```
/pages
  /[module-name]
    /[feature-name].tsx    ← page component
/components
  /[feature-name]
    /[FeatureName]Form.tsx
    /[FeatureName]List.tsx
    /[FeatureName]Card.tsx
```

### 5.3 Mobile Application Mode

**Stack defaults (configurable):**
- Framework: React Native (default) or Flutter
- Navigation: React Navigation (Stack + Bottom Tabs + Drawer)
- State: Zustand or Redux Toolkit
- Styling: StyleSheet API or NativeWind

**Mobile UI rules:**
- Every module → a Bottom Tab or Drawer navigation item.
- Every feature → a Screen in the navigation stack.
- Touch targets minimum: `44×44dp`.
- Use native patterns: swipe-to-dismiss, pull-to-refresh, bottom sheets for modals.
- No hover states — replace with `onPressIn`/`onPressOut` feedback.
- All lists use `FlatList` or `SectionList` for performance.
- Forms use `KeyboardAvoidingView`.

**Mobile output per feature:**
```
/screens
  /[ModuleName]
    /[FeatureName]Screen.tsx
/components
  /[FeatureName]
    /[FeatureName]Card.tsx
    /[FeatureName]Form.tsx
```

---

## 6. Theme System

### 6.1 Theme Input Parsing

The user's prompt is scanned for theme hints using keyword matching:

| Prompt Keyword | Theme Profile |
|---------------|--------------|
| `emerald`, `green`, `nature` | Emerald theme |
| `dark`, `night`, `black` | Dark theme |
| `fintech`, `banking`, `finance` | Fintech Dark/Blue theme |
| `light`, `clean`, `minimal`, `white` | Light Minimal theme |
| `blue`, `corporate`, `enterprise` | Corporate Blue theme |
| `red`, `bold`, `energetic` | Bold Red theme |
| `purple`, `lavender`, `soft` | Soft Purple theme |
| No keyword | Default: Light Minimal theme |

### 6.2 Design Token Schema

Every theme resolves into a full design token set:

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
      "sm": "4px",
      "md": "8px",
      "lg": "12px",
      "xl": "16px",
      "full": "9999px"
    },
    "shadow": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.07)",
      "lg": "0 10px 15px rgba(0,0,0,0.10)"
    }
  }
}
```

### 6.3 Theme Application Rules
- Design tokens are defined in a single global file: `theme.ts` / `theme.json` / `tokens.css`.
- ALL components import colors, spacing, and typography exclusively from this file.
- No hardcoded hex values anywhere outside `theme.ts`.
- Dark mode: if `mode = "dark"`, invert `background`, `surface`, and `text_*` tokens accordingly.
- Theme is applied globally at the root component (`App.tsx` / `_app.tsx`).

---

## 7. UI Generation

### 7.1 Page/Screen Generation Rules
For every feature in the URS:
1. Determine `ui_type` (page, modal, drawer, form, list, chart, widget).
2. Select the appropriate layout template for that `ui_type`.
3. Populate the template with fields and actions derived from the feature description.
4. Apply theme tokens throughout.
5. Connect to navigation (see Section 9).

### 7.2 UI Type Templates

**`list` — Data List Page**
- Topbar with page title + primary action button ("Add New [Entity]")
- Search bar + filter controls
- Table (web) or FlatList (mobile) with sortable columns
- Pagination (web) or infinite scroll (mobile)
- Row actions: View, Edit, Delete

**`form` — Create / Edit Form**
- Section header with breadcrumb (web) or back button (mobile)
- Grouped form fields matching the entity's attributes
- Inline validation messages per field
- Submit + Cancel buttons (sticky footer on mobile)

**`detail` — Detail / View Page**
- Entity header (avatar/icon + name + status badge)
- Attribute grid (label: value pairs)
- Related sub-lists (e.g., order items within an order)
- Action buttons (Edit, Delete, custom actions)

**`dashboard` — Dashboard / Overview**
- KPI stat cards (top row)
- Charts section (line, bar, pie based on data type)
- Recent activity list
- Quick action shortcuts

**`modal` — Confirmation / Short Form**
- Overlay with backdrop
- Title + body message or compact form
- Confirm + Cancel buttons

**`chart` — Analytics / Report Page**
- Date range selector
- Chart component (type inferred from data: time-series → line, category → bar, proportion → pie)
- Data summary table below chart
- Export button

### 7.3 Field Type Inference
Infer input component from field name/description:

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

## 8. Component System

### 8.1 Base Component Library

The following base components MUST be generated or declared for every project:

| Component | Description |
|-----------|-------------|
| `Button` | Variants: primary, secondary, ghost, danger. Sizes: sm, md, lg. States: default, hover, disabled, loading |
| `Input` | Text input with label, placeholder, error state, helper text |
| `Select` | Dropdown with search, single/multi-select |
| `Checkbox` / `Toggle` | Boolean input with label |
| `DatePicker` | Calendar-based date selection |
| `Table` | Sortable, paginated data table (web) |
| `FlatList` | Performance list for mobile |
| `Card` | Surface container with optional header/footer |
| `Modal` | Overlay dialog |
| `Drawer` | Side panel (web) / bottom sheet (mobile) |
| `Badge` | Status indicator with color variants |
| `Avatar` | User image with fallback initials |
| `Breadcrumb` | Navigation trail (web only) |
| `Tabs` | Tabbed content switcher |
| `Toast` / `Snackbar` | Notification system |
| `Skeleton` | Loading placeholder for every list/detail component |
| `EmptyState` | Zero-data illustration + message + action |
| `ErrorBoundary` | Catches render errors and shows fallback UI |

### 8.2 Feature-Level Components
For every feature, generate these derived components:

```
[FeatureName]Page (or Screen)
[FeatureName]List
[FeatureName]Card
[FeatureName]Form
[FeatureName]Detail
[FeatureName]DeleteConfirm (modal)
```

### 8.3 Component Props Contract
Every component must have a defined props interface. Example:

```typescript
interface OrderCardProps {
  order: Order;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}
```

### 8.4 Component Reuse Rules
- Components with identical structure across features MUST be abstracted into a shared `<EntityList>` or `<EntityForm>` generic component.
- Do NOT duplicate layout code per page — use a shared `<PageLayout>` wrapper.
- Do NOT duplicate form logic — use a shared `useForm` hook or form library configuration.

---

## 9. Navigation

### 9.1 Web Navigation Structure

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
└── ContentArea
    └── <Outlet /> (current page renders here)
```

**Route structure:**
```
/                        → Dashboard (if present) or first module
/[module-slug]           → Module landing or first feature
/[module-slug]/[feature] → Feature list page
/[module-slug]/[feature]/new      → Create form
/[module-slug]/[feature]/:id      → Detail page
/[module-slug]/[feature]/:id/edit → Edit form
/login                   → Auth page (if auth module detected)
/404                     → Not found page
```

### 9.2 Mobile Navigation Structure

**Structure depends on module count:**

| Module Count | Navigation Pattern |
|-------------|-------------------|
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

### 9.3 Navigation Coverage Rule
Every feature in the URS MUST have:
- A reachable route (web) or screen registration (mobile).
- A navigation entry point (sidebar item, tab, or reachable via another screen).
- No screen may be unreachable from the main navigation tree.

---

## 10. Data Layer

### 10.1 Entity Model Generation
For every feature, infer the data entity from the feature description and field list:

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

### 10.2 API Layer (Service Functions)
Generate a service file per module with standard CRUD operations:

```typescript
// services/orderService.ts
export const orderService = {
  getAll: (params: PaginationParams) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: CreateOrderDto) => api.post('/orders', data),
  update: (id: string, data: UpdateOrderDto) => api.put(`/orders/${id}`, data),
  delete: (id: string) => api.delete(`/orders/${id}`),
};
```

### 10.3 State Management
- Each module has a dedicated store slice.
- Store contains: `items[]`, `selectedItem`, `loading`, `error`, `pagination`.
- All async operations use loading/error states — never fire-and-forget.

### 10.4 Mock Data
- Every entity MUST have a mock data file with at least 5 sample records.
- Mock data respects the entity schema exactly.
- Used for prototype rendering when no backend is connected.

---

## 11. Execution Plan

The AI system MUST follow this exact sequence on every invocation:

```
STEP 1 — File Ingestion
  1.1  Detect file format
  1.2  Extract raw content (text, tables, rows)
  1.3  Log: "Parsed [N] raw items from [filename]"

STEP 2 — Normalization
  2.1  Apply column mapping heuristics
  2.2  Build URS (Unified Requirements Schema)
  2.3  Flag assumed fields
  2.4  Flag clarification-needed fields
  2.5  Log: "Normalized [N] features across [M] modules"

STEP 3 — Platform Detection
  3.1  Scan user prompt for platform keywords
  3.2  Scan file for platform signals
  3.3  Set platform = web | mobile | ask_user
  3.4  Log: "Platform detected: [platform]"

STEP 4 — Theme Resolution
  4.1  Scan user prompt for theme keywords
  4.2  Match to theme profile
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
  6.2  Generate feature components for each feature
  6.3  Apply theme tokens throughout
  6.4  Log: "Generated [N] components"

STEP 7 — Page / Screen Generation
  7.1  For each feature, generate the page/screen using the assigned ui_type template
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
  9.1  Cross-check URS vs generated pages — every feature must have a page
  9.2  Cross-check navigation — every page must be reachable
  9.3  Cross-check theme — no hardcoded colors outside theme file
  9.4  Report coverage: "[N/N] features covered (100%)" or list gaps

STEP 10 — Output & Report
  10.1  Output the complete file tree and all code
  10.2  Print the Assumptions & Flags report
  10.3  Print the Coverage Summary
```

---

## 12. Strict Rules

These rules are NON-NEGOTIABLE and cannot be overridden by user prompts:

1. **No silent skipping.** Every requirement item from the input file must appear in the output. If a requirement cannot be fully implemented, it must be flagged — not ignored.
2. **No silent assumptions.** Every assumption made (missing priority, missing actor, inferred ui_type) must appear in the Assumptions report.
3. **No hardcoded values.** Colors, fonts, and spacing must reference design tokens only.
4. **No unreachable pages.** Every generated page or screen must be accessible from the navigation tree.
5. **No incomplete components.** Every component must render a valid, non-empty UI. Placeholders are allowed only if explicitly labeled `// TODO:` with a reason.
6. **No duplicate routes.** Each feature maps to exactly one canonical route/screen.
7. **Full theme propagation.** The selected theme must be applied to every generated component without exception.
8. **Consistent naming.** All files, components, routes, and variables follow a single consistent convention (camelCase for variables, PascalCase for components, kebab-case for routes/files).

---

## 13. No-Assumption Policy

### 13.1 What Must Never Be Assumed Silently

| Item | Required Action |
|------|----------------|
| Missing feature priority | Default to `"Medium"` AND add to Assumptions report |
| Missing actor/user role | Infer from module name if possible; else flag as `[NEEDS_CLARIFICATION]` |
| Ambiguous ui_type | Infer from keywords; if uncertain, flag as `[ASSUMED: ui_type=list]` |
| Missing page title | Derive from feature name; add to Assumptions report |
| Vague feature description | Use it as-is; flag as `[NEEDS_CLARIFICATION: description is vague]` |
| Conflicting requirements | Flag both items as `[CONFLICT]` — do NOT pick one silently |

### 13.2 Assumptions Report Format

Printed at the end of every generation:

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

## 14. Validation

### 14.1 Coverage Validation
After generation, run a full coverage check:

```
Coverage Check:
  Total requirements in input:  [N]
  Requirements mapped to UI:    [N]
  Coverage:                     100%  ✓

  If < 100%:
    MISSING: REQ-XXX — [feature name] — not mapped to any page/component
```

### 14.2 Navigation Validation
```
Navigation Check:
  Total pages/screens generated:     [N]
  Pages reachable from nav tree:     [N]
  Orphan pages (unreachable):        0  ✓

  If orphans found:
    ORPHAN: /[route] — [PageName] — not linked from any nav item or page
```

### 14.3 Theme Validation
```
Theme Check:
  Hardcoded color values found:   0  ✓
  Components using theme tokens:  [N/N] (100%)  ✓
```

### 14.4 Component Completeness Validation
```
Component Check:
  Empty/stub components:   0  ✓
  Components with TODO:    [N]  (list each with reason)
```

---

## 15. Configurability

All aspects of the generated application are configurable via the initial user prompt or a `config` block:

### 15.1 Configuration Schema

```json
{
  "config": {
    "platform": "web | mobile",
    "theme": "emerald | dark | fintech | light | corporate | bold | purple | custom",
    "framework": "react | nextjs | vue | react-native | flutter",
    "styling": "tailwind | css-modules | styled-components | nativewind",
    "state_management": "zustand | redux | context | mobx",
    "navigation_type": "sidebar | topnav | tabs | drawer | bottom-tabs",
    "density": "compact | default | comfortable",
    "layout": "fixed-sidebar | collapsible-sidebar | full-width | centered",
    "auth": true,
    "dark_mode_toggle": true,
    "i18n": false,
    "mock_data": true
  }
}
```

### 15.2 Configuration Defaults

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
| `auth` | `true` if auth module detected in requirements |
| `dark_mode_toggle` | `false` |
| `mock_data` | `true` |

### 15.3 Prompt-Based Configuration Override

User can override any config option via natural language in the prompt:

| User Prompt | Config Override |
|-------------|----------------|
| `"use collapsible sidebar"` | `layout: "collapsible-sidebar"` |
| `"compact density"` | `density: "compact"` |
| `"add dark mode toggle"` | `dark_mode_toggle: true` |
| `"no authentication"` | `auth: false` |
| `"use Next.js"` | `framework: "nextjs"` |
| `"use Flutter"` | `framework: "flutter"` |

---

## 16. Output Format

### 16.1 Web Output Structure

```
[project-name]/
├── public/
│   └── favicon.ico
├── src/
│   ├── theme/
│   │   └── tokens.ts               ← All design tokens
│   ├── components/
│   │   ├── base/                   ← Button, Input, Table, Modal, etc.
│   │   └── [feature]/              ← Feature-specific components
│   ├── pages/ (or app/ for Next.js)
│   │   ├── index.tsx               ← Dashboard or redirect
│   │   └── [module]/
│   │       └── [feature]/
│   │           ├── index.tsx       ← List page
│   │           ├── [id].tsx        ← Detail page
│   │           ├── new.tsx         ← Create form
│   │           └── [id]/edit.tsx   ← Edit form
│   ├── services/
│   │   └── [module]Service.ts
│   ├── store/
│   │   └── [module]Store.ts
│   ├── types/
│   │   └── [module].types.ts
│   ├── mocks/
│   │   └── [module].mock.ts
│   ├── hooks/
│   │   └── use[Feature].ts
│   ├── navigation/
│   │   └── routes.ts
│   └── App.tsx
├── package.json
└── tailwind.config.ts
```

### 16.2 Mobile Output Structure

```
[project-name]/
├── src/
│   ├── theme/
│   │   └── tokens.ts
│   ├── components/
│   │   ├── base/
│   │   └── [feature]/
│   ├── screens/
│   │   └── [Module]/
│   │       ├── [Feature]ListScreen.tsx
│   │       ├── [Feature]DetailScreen.tsx
│   │       ├── [Feature]CreateScreen.tsx
│   │       └── [Feature]EditScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── [Module]Navigator.tsx
│   │   └── routes.ts
│   ├── services/
│   │   └── [module]Service.ts
│   ├── store/
│   │   └── [module]Store.ts
│   ├── types/
│   │   └── [module].types.ts
│   └── mocks/
│       └── [module].mock.ts
├── App.tsx
└── package.json
```

### 16.3 Generation Report (Always Printed Last)

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

## 17. Failure Handling

### 17.1 File Parse Failure
If the file cannot be parsed (corrupted, empty, unsupported encoding):
```
ERROR: Could not parse [filename].
Reason: [specific reason — e.g., "file is password-protected", "no readable content found"]
Action required: Please provide a readable version of the file.
```
Do NOT proceed with generation. Do NOT generate a skeleton based on guesses.

### 17.2 Unrecognizable Content
If the file is parsed but no recognizable requirements are found:
```
WARNING: Could not detect any requirement items in [filename].
Detected content type: [e.g., "plain prose", "images only", "empty spreadsheet"]
Suggestions:
  - Ensure the file contains structured rows, bullet lists, or numbered requirements.
  - If this is a valid WBS, please confirm the column headers.
Do you want me to treat the entire document as free-form requirements and attempt extraction?
```

### 17.3 Missing Critical Fields
If more than 30% of requirements have missing `name` or `description`:
```
WARNING: [N] out of [M] requirements are missing critical fields (name or description).
Generation will proceed with best-effort extraction.
All affected items will be flagged as [NEEDS_CLARIFICATION].
```

### 17.4 Platform Ambiguity
If platform cannot be detected:
```
QUESTION: Should I generate a Web application or a Mobile application?
Please reply with "web" or "mobile" to continue.
```
Generation is PAUSED until user responds.

### 17.5 Conflict Detection
If two requirements directly conflict:
```
CONFLICT DETECTED:
  REQ-020: "Dashboard is the default landing page"
  REQ-021: "Login page is the default landing page"

I will not resolve this silently. Please clarify which should be the entry point.
```

---

## 18. Quality Standards

Every generated output must meet these standards before being delivered:

| Standard | Requirement |
|----------|-------------|
| Coverage | 100% of URS features mapped to UI |
| Navigation | 0 orphan pages/screens |
| Theme | 0 hardcoded color/spacing values outside `tokens.ts` |
| Typing | All props, entities, and service params are fully typed |
| Accessibility | All interactive elements have `aria-label` or `aria-labelledby` (web); `accessibilityLabel` (mobile) |
| Loading states | Every async operation has a loading skeleton or spinner |
| Empty states | Every list component has an EmptyState fallback |
| Error states | Every async operation has an error message display |
| Naming | Consistent PascalCase (components), camelCase (variables), kebab-case (routes/files) |
| No dead code | No unused imports, variables, or components in generated output |

---

## 19. Smart Defaults

When no explicit instruction is given, apply these defaults automatically:

| Scenario | Default Behavior |
|----------|-----------------|
| No theme specified | Use Light Minimal theme |
| No platform specified | Detect from file; ask if unclear |
| No framework specified | React (web) / React Native (mobile) |
| Feature named "Dashboard" or "Overview" | Assign `ui_type = "dashboard"`, make it the root route |
| Feature named "Settings" or "Profile" | Assign to user menu / settings drawer |
| Feature containing "Report" or "Analytics" | Assign `ui_type = "chart"` |
| Feature containing "List", "History", "Log" | Assign `ui_type = "list"` |
| Feature containing "Create", "Add", "New" | Assign `ui_type = "form"` |
| Feature containing "Detail", "View", "Info" | Assign `ui_type = "detail"` |
| Auth module detected | Generate login, register, and forgot-password pages automatically |
| No explicit CRUD actions specified | Generate full CRUD (list + detail + create + edit + delete) for all entities |

---

## 20. Summary

This skill transforms any requirement document into a complete, production-grade application with the following guarantees:

1. **100% requirement coverage** — every item in the input maps to a UI feature.
2. **Zero silent assumptions** — all inferences are logged and reported.
3. **Globally consistent theme** — design tokens defined once, applied everywhere.
4. **Full navigation coverage** — every page/screen is reachable.
5. **Platform-aware generation** — web and mobile follow their respective UX paradigms.
6. **Validation on every run** — coverage, navigation, and theme checks are mandatory.
7. **Deterministic output** — same input + same prompt = same structural output.
8. **Production-ready quality** — typed, accessible, with loading/empty/error states.

**The user only needs to provide:**
- A file (Excel, Word, PDF, or text)
- An optional short prompt (e.g., `"Emerald theme, mobile app"`)

**The system handles everything else.**
