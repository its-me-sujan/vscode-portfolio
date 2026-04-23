<script setup>
import { EXPERIENCE, EDUCATION } from '@/data/experience.js'
</script>

<template>
  <article class="mx-auto max-w-3xl space-y-8 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold text-fg">
        <span class="text-accent">const</span> experience =
      </h1>
      <p class="mt-1 text-sm text-muted">experience.ts — timeline, most recent first</p>
    </header>

    <ul class="relative space-y-6 border-l border-border pl-6">
      <li
        v-for="role in EXPERIENCE"
        :key="role.id"
        class="relative before:absolute before:-left-[1.625rem] before:top-1.5 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-accent before:bg-bg"
      >
        <header class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="font-display text-lg font-bold text-fg">{{ role.title }}</h2>
          <span class="text-xs text-muted">{{ role.range }}</span>
        </header>
        <p class="text-sm text-accent2">{{ role.company }} — {{ role.location }}</p>
        <ul class="mt-2 space-y-1 text-sm text-fg/80">
          <li v-for="b in role.bullets" :key="b" class="list-disc list-inside marker:text-accent">
            {{ b }}
          </li>
        </ul>
      </li>
    </ul>

  </article>
</template>
