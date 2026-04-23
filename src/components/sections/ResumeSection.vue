<script setup>
import { Download, FileBadge } from 'lucide-vue-next'
</script>

<template>
  <article class="mx-auto max-w-3xl space-y-6 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold text-fg">resume.pdf</h1>
      <p class="mt-1 text-sm text-muted">// drop your actual PDF into /public/resume.pdf</p>
    </header>

    <div class="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-panel/60 p-10 text-center">
      <FileBadge :size="48" class="text-red-400" />
      <p class="font-display text-lg">Your resume goes here.</p>
      <p class="text-sm text-muted">
        Replace this placeholder by putting <code class="rounded bg-tab px-1">resume.pdf</code> in
        the <code class="rounded bg-tab px-1">public/</code> folder and pointing the button at it.
      </p>
      <a
        href="#"
        download
        class="flex items-center gap-2 rounded-md border border-accent bg-accent/20 px-4 py-2 text-sm hover:bg-accent/40"
      >
        <Download :size="14" />
        Download Resume
      </a>
    </div>
  </article>
</template>
