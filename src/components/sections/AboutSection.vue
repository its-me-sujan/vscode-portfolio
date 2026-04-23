<script setup>
import { FOCUS_AREAS } from '@/data/skills.js'
</script>

<template>
  <article class="mx-auto max-w-3xl space-y-6 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold">
        <span class="text-accent"># </span>About Me
      </h1>
      <p class="mt-1 text-sm text-muted">about.md — a quick hello</p>
    </header>

    <p class="leading-relaxed">
      Hi, welcome to my portfolio! I'm an aspiring computer engineer who's endlessly
      curious about how things work — software, systems, and people. I lean toward
      building quiet, reliable backends and making AI tooling useful in the ordinary
      corners of a product.
    </p>
    <p class="leading-relaxed">
      Outside of work I'm into designing, photography, and messing around on the
      keyboard. I care a lot about integrity and shipping things I'd be glad to show my
      future self. Thanks for stopping by.
    </p>

    <section>
      <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
        ## Current Focus
      </h2>
      <ul class="mt-3 flex flex-wrap gap-2">
        <li
          v-for="f in FOCUS_AREAS"
          :key="f"
          class="rounded-full border border-border bg-panel px-3 py-1 text-xs text-fg/90"
        >
          {{ f }}
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
        ## At the crossroads of
      </h2>
      <p class="mt-3 text-fg/90">
        <span class="text-accent">engineering</span>,
        <span class="text-accent2">design</span>, and
        <span class="text-accent">storytelling</span> — the bar is always just a little
        higher than last time.
      </p>
    </section>
  </article>
</template>
