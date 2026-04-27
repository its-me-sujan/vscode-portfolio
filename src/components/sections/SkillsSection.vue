<script setup>
import { SKILL_CATEGORIES } from '@/data/skills.js'
</script>

<template>
  <article class="mx-auto max-w-4xl space-y-6 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold text-fg">
        <span class="text-accent">skills</span>
        <span class="text-muted">:</span>
      </h1>
        <p class="mt-1 text-sm text-muted">skills.js — the tools, not the title</p>
    </header>

    <section v-for="cat in SKILL_CATEGORIES" :key="cat.id" class="space-y-2">
      <h2 class="flex items-center gap-2 text-sm">
        <span class="text-accent">-</span>
        <span class="text-accent2">{{ cat.label }}</span>
        <span class="text-muted">:</span>
      </h2>
      <ul class="flex flex-wrap gap-2 pl-4">
        <li
          v-for="item in cat.items"
          :key="item"
          class="rounded-md border border-border bg-panel px-3 py-1 text-xs text-fg/90 transition hover:border-accent hover:text-accent"
        >
          {{ item }}
        </li>
      </ul>
    </section>
  </article>
</template>
