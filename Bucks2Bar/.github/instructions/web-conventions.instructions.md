---
description: "Use when writing HTML, CSS, or JavaScript for this project. Covers vanilla JS patterns, Bootstrap 5 usage, and CSS Grid layout conventions."
applyTo: "**"
---

# Bucks2Bar — Web Conventions

## JavaScript

- Use **vanilla JS only** — no frameworks (no React, Vue, Angular, jQuery).
- Use ES6+ syntax: `const`/`let`, arrow functions, template literals, spread operator.
- Use `const` by default; only use `let` when reassignment is needed. Never use `var`.
- Build DOM elements with `document.createElement` and set `className`/`textContent`/`innerHTML` directly.
- Format all monetary values with `Intl.NumberFormat` in USD:
  ```js
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  ```
- Store per-month state in fixed-length arrays (`new Array(12).fill(0)`), indexed 0–11.
- **Do not persist data** — no `localStorage`, `sessionStorage`, or server calls. State lives in memory only.
- Attach event listeners with `addEventListener`; do not use inline `on*` HTML attributes.
- Add comments only for non-obvious logic. Do not add JSDoc or explanatory comments on straightforward code.

### UI Elements
- All buttons should be pink in color, using the `btn btn-pink` classes.


## HTML

- Use **Bootstrap 5.3** utility classes for layout, spacing, typography, and color.
- Prefer Bootstrap components (cards, nav-tabs, input-groups, badges) over custom markup.
- Always include `aria-label` on inputs and interactive elements for accessibility.
- Do not add a build step — keep HTML as a single static file with CDN `<script>` and `<link>` tags.

## CSS (`styles.css`)

- Use **CSS Grid** for tabular/data layouts; use Bootstrap's flexbox/grid utilities for page-level layout.
- Scope custom classes tightly (e.g., `.data-grid`, `.data-grid-cell`).
- Avoid overriding Bootstrap internals; extend with utility-compatible custom classes instead.
- Use CSS custom properties (`--var-name`) only when a value is reused in 3+ places.
- Keep `styles.css` for structural and component styles only — use Bootstrap utilities for spacing and color.
- Use section banner comments to group related rules (e.g., `/* ── Data Grid ─── */`).

## ID & Class Naming

### IDs
- Use **camelCase** for IDs targeted by `getElementById` in JavaScript (e.g., `totalIncome`, `dataGrid`, `downloadChartBtn`).
- Use **kebab-case** for IDs used exclusively for Bootstrap tab/pane wiring (`data-bs-target`, `aria-labelledby`, `aria-controls`) — e.g., `data-tab`, `chart-pane`.
- For dynamically generated repeated elements, use **kebab-case with index** set via `element.id = \`prefix-\${i}\`` (e.g., `net-0`, `net-11`). Do not assign unique IDs inside loops — use `data-index` + class selectors instead.

### Classes
- Custom component classes use **kebab-case**, prefixed by component name: `data-grid`, `data-grid-cell`, `data-grid-header`, `data-grid-footer`.
- State modifier classes use **kebab-case** adjectives appended directly: `net-zero`, `net-positive`, `net-negative`.
- **Do not invent new class prefixes** — extend existing component prefixes (e.g., add `data-grid-*` for new data-grid variants).

### Input Class Layering
Apply exactly three classes to every currency input, in this order:
1. `form-control` — Bootstrap styling hook
2. `money-input` — shared selector for all currency inputs (used for shared behaviour)
3. `[type]-input` — specific selector for this input type (e.g., `income-input`, `expense-input`, `savings-input`)

Use `querySelectorAll('.[type]-input')` to target a specific column; use `querySelectorAll('.money-input')` when iterating all currency inputs. Never query inputs by ID.

## Chart.js

- Use Chart.js via CDN. Do not bundle it.
- Keep chart configuration in `app.js` alongside the data it visualises.
- Use `chart.data.datasets[n].data = [...array]` followed by `chart.update()` to refresh charts.
