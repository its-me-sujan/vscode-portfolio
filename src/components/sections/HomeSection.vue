<script setup>
import { Github, Linkedin, Mail, MapPin, Instagram, Youtube } from 'lucide-vue-next'
import { SOCIALS } from '@/data/sections.js'
</script>

<template>
  <article class="mx-auto max-w-3xl font-mono animate-fade-in">
    <header class="mb-8">
      <p class="text-sm text-accent2"># home.vue</p>
      <p class="mt-2 text-muted">// rendered on page mount</p>
    </header>

    <div class="space-y-4">
      <p class="text-sm text-muted">const greeting = (</p>
      <div class="pl-6">
        <p class="font-display text-4xl font-bold leading-tight sm:text-5xl">
          Hi, I'm <span class="text-accent">Sujan Shrestha</span>.
        </p>
        <p class="mt-3 text-lg text-fg/80">
          <span class="text-accent2">Software Engineer</span>
          <span class="text-muted"> @ </span>
          <span class="text-accent2">Pathway Technologies</span>
        </p>
        <p class="mt-2 text-sm text-muted">
          Backend · AI / ML · Data · whatever sounds fun that week.
        </p>
      </div>
      <p class="text-sm text-muted">)</p>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-4 text-sm">
      <span class="flex items-center gap-2 text-fg/80">
        <MapPin :size="14" class="text-muted" />
        Kathmandu
      </span>
      <span class="flex items-center gap-2 text-fg/80">
        <Mail :size="14" class="text-muted" />
        sthasujan1374@gmail.com
      </span>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <a
        v-for="s in SOCIALS"
        :key="s.id"
        :href="s.href"
        class="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-xs hover:border-accent hover:text-accent"
        target="_blank"
        rel="noopener noreferrer"
      >
        <component
          :is="{ github: Github, linkedin: Linkedin, instagram: Instagram }[s.id] ?? Github"
          :size="14"
        />
        {{ s.id }}
      </a>
    </div>

    <div class="mt-12 rounded-md border border-border bg-panel/60 p-4 text-xs text-muted">
      <span class="text-accent">tip:</span>
      press
      <kbd class="rounded bg-tab px-1.5 py-0.5 text-fg">Ctrl</kbd> +
      <kbd class="rounded bg-tab px-1.5 py-0.5 text-fg">P</kbd>
      to jump between files, or
      <kbd class="rounded bg-tab px-1.5 py-0.5 text-fg">Ctrl</kbd> +
      <kbd class="rounded bg-tab px-1.5 py-0.5 text-fg">Shift</kbd> +
      <kbd class="rounded bg-tab px-1.5 py-0.5 text-fg">C</kbd>
      to ping the Copilot.
    </div>
  </article>
</template>
