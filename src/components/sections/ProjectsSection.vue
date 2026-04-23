<script setup>
import { ExternalLink, Github } from 'lucide-vue-next'
import { PROJECTS } from '@/data/projects.js'
</script>

<template>
  <article class="mx-auto max-w-5xl space-y-6 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold">
        <span class="text-accent">"</span>projects<span class="text-accent">"</span>:
        [
      </h1>
      <p class="mt-1 text-sm text-muted">projects.json — things I've shipped or tinkered on</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="p in PROJECTS"
        :key="p.id"
        class="group flex flex-col gap-3 rounded-lg border border-border bg-panel/60 p-4 transition hover:border-accent/60"
      >
        <header>
          <h2 class="font-display text-lg font-bold text-fg">{{ p.title }}</h2>
          <p class="text-xs text-accent2">{{ p.tagline }}</p>
        </header>
        <p class="text-sm leading-relaxed text-fg/80">{{ p.description }}</p>
        <ul class="flex flex-wrap gap-1.5">
          <li
            v-for="s in p.stack"
            :key="s"
            class="rounded border border-border bg-tab px-2 py-0.5 text-[11px] text-muted"
          >
            {{ s }}
          </li>
        </ul>
        <footer class="mt-auto flex gap-3 text-xs">
          <a
            :href="p.github"
            class="flex items-center gap-1 text-fg/80 hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github :size="14" />
            source
          </a>
          <a
            :href="p.demo"
            class="flex items-center gap-1 text-fg/80 hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink :size="14" />
            demo
          </a>
        </footer>
      </article>
    </div>

    <p class="font-mono text-sm text-muted">]</p>
  </article>
</template>
