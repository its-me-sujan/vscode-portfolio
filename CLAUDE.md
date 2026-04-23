# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built bundle

No test runner, linter, or typechecker is configured. `package.json` is the source of truth for scripts.

## Stack

Vue 3 (`<script setup>` SFCs) + Pinia + Vite + Tailwind. `@vueuse/core` supplies `useLocalStorage`. `lucide-vue-next` supplies icons. The `@` import alias resolves to `./src` (see [vite.config.js](vite.config.js)).

## Architecture

The app is a single-page portfolio styled as a VS Code workbench. The top-level shell is assembled in [src/App.vue](src/App.vue) from components under [src/components/shell/](src/components/shell/) (TitleBar, ActivityBar, Sidebar, TabBar, EditorArea, Terminal, StatusBar) plus two overlays under [src/components/overlays/](src/components/overlays/) (CommandPalette, CopilotChat). Global keyboard shortcuts are installed once by [useKeybindings](src/composables/useKeybindings.js) which `App.vue` calls at setup.

### Section registry is the content spine

[src/data/sections.js](src/data/sections.js) exports `SECTIONS` (id → `{ title, language, icon }`) and `SECTION_ORDER`. This registry is the single source of truth that couples:

- Tab state in [src/stores/tabs.js](src/stores/tabs.js) (`openTab`/`closeTab` validate against `SECTIONS`)
- Editor routing in [src/components/shell/EditorArea.vue](src/components/shell/EditorArea.vue) via a `COMPONENT_MAP` keyed by section id → `src/components/sections/*.vue`
- Command palette file entries in [src/components/overlays/CommandPalette.vue](src/components/overlays/CommandPalette.vue)
- Terminal `ls`/`cat`/`open` commands in [src/composables/useTerminalCommands.js](src/composables/useTerminalCommands.js)

**Adding a new section requires changes in all four places**: add the entry + order in `sections.js`, create `src/components/sections/FooSection.vue`, and register it in `EditorArea.vue`'s `COMPONENT_MAP`. The command palette and terminal pick it up automatically from the registry.

Other static content (`projects`, `skills`, `experience`, `copilotReplies`) lives alongside in [src/data/](src/data/) and is imported directly by the relevant section component.

### State

Five Pinia stores in [src/stores/](src/stores/), each a composition-style `defineStore`:

- `layout` — sidebar/terminal open state, widths (persisted via `useLocalStorage` under `portfolio:*` keys), active activity-bar id
- `tabs` — `openTabs`, `activeTab`, `closedStack` (for Ctrl+Shift+T reopen), and a transient `toastMessage` (2.2s auto-clear)
- `theme` — `current` theme id, persisted; a `watchEffect` writes `document.documentElement.dataset.theme` so CSS variables switch
- `palette` — command-palette visibility + `mode` (`'all' | 'theme'`) + query
- `copilot` — chat open state, message list, `typing` flag

### Theming

Themes are pure CSS: [src/assets/themes.css](src/assets/themes.css) defines `[data-theme='<id>']` blocks with CSS custom properties (`--bg`, `--fg`, `--accent`, etc. as `R G B` triplets). [tailwind.config.js](tailwind.config.js) maps those to Tailwind color tokens via `rgb(var(--bg) / <alpha-value>)`, so utilities like `bg-bg`, `text-fg`, `border-border` automatically follow the theme. `THEMES` in [src/stores/theme.js](src/stores/theme.js) must stay in sync with the CSS blocks.

### Interaction surfaces

- **Command palette** (Ctrl+P) — merges file entries (from `SECTIONS`), named commands, and theme entries; `>` filters to commands, `>theme ` to themes.
- **Copilot chat** (Ctrl+Shift+C) — [useCopilotBot](src/composables/useCopilotBot.js) does keyword-scored intent matching against `INTENTS` in [src/data/copilotReplies.js](src/data/copilotReplies.js) with a simulated typing delay. No network calls.
- **Terminal** (Ctrl+`) — [useTerminalCommands](src/composables/useTerminalCommands.js) is a pure `switch`-based dispatcher; `git status`/`git log`/`python --version` return canned output.

All of the above is client-only; there is no backend.
