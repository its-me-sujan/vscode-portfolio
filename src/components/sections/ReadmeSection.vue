<script setup>
import { useTabsStore } from '@/stores/tabs.js'
const tabs = useTabsStore()
</script>

<template>
  <article class="prose mx-auto max-w-3xl space-y-4 animate-fade-in">
    <h1 class="font-display text-3xl font-bold text-fg">
      <span class="text-accent"># </span>Your Name — Portfolio
    </h1>
    <p class="text-sm text-muted">
      A VS Code-themed portfolio written in <span class="text-accent">Vue 3</span>,
      <span class="text-accent">Vite</span>, and <span class="text-accent">Tailwind</span>.
    </p>

    <h2 class="mt-6 text-xl font-display font-bold">## Quickstart</h2>
    <pre class="overflow-x-auto rounded-md border border-border bg-terminal p-3 text-xs text-fg/90"><code>npm install
npm run dev
# open http://localhost:5173</code></pre>

    <h2 class="mt-6 text-xl font-display font-bold">## What's here</h2>
    <ul class="list-disc space-y-1 pl-6 text-sm text-fg/85 marker:text-accent">
      <li>VS Code-style shell: activity bar, explorer, tabs, status bar, terminal</li>
      <li>Command palette (<kbd class="rounded bg-tab px-1.5">Ctrl+P</kbd>)</li>
      <li>AI Copilot chat stub (<kbd class="rounded bg-tab px-1.5">Ctrl+Shift+C</kbd>)</li>
      <li>Five color themes with persistent preference</li>
      <li>Keyboard shortcuts, fake terminal, easter eggs</li>
    </ul>

    <h2 class="mt-6 text-xl font-display font-bold">## Customize</h2>
    <p class="text-sm text-fg/85">
      All content lives under <code class="rounded bg-tab px-1">src/data/</code> —
      swap <code class="rounded bg-tab px-1">projects.js</code>,
      <code class="rounded bg-tab px-1">skills.js</code>,
      <code class="rounded bg-tab px-1">experience.js</code> and the socials in
      <code class="rounded bg-tab px-1">sections.js</code> with your own. Themes live in
      <code class="rounded bg-tab px-1">src/assets/themes.css</code>.
    </p>

    <div class="mt-8 flex gap-3">
      <button
        class="rounded-md border border-accent bg-accent/20 px-3 py-1.5 text-xs hover:bg-accent/40"
        @click="tabs.openTab('home')"
      >
        open home
      </button>
      <button
        class="rounded-md border border-border bg-panel px-3 py-1.5 text-xs hover:border-accent"
        @click="tabs.openTab('projects')"
      >
        see projects
      </button>
    </div>
  </article>
</template>
