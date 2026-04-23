<script setup>
import { ref } from 'vue'
import { Github, Linkedin, Mail, Youtube, Instagram } from 'lucide-vue-next'
import { SOCIALS } from '@/data/sections.js'

const form = ref({ name: '', email: '', message: '' })
const status = ref('')

function submit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    status.value = 'Please fill in all required fields.'
    return
  }
  status.value = "Thanks! I'll get back to you soon 📬"
  form.value = { name: '', email: '', message: '' }
  setTimeout(() => (status.value = ''), 3500)
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  medium: Mail,
  twitter: Mail,
  youtube: Youtube,
  leetcode: Mail,
  instagram: Instagram,
}
</script>

<template>
  <article class="mx-auto max-w-3xl space-y-6 animate-fade-in">
    <header>
      <h1 class="font-display text-3xl font-bold text-fg">
        <span class="text-accent2">.contact</span>
        <span class="text-muted"> {</span>
      </h1>
      <p class="mt-1 text-sm text-muted">contact.css — drop a message, I read everything</p>
    </header>

    <form
      class="grid gap-4 rounded-lg border border-border bg-panel/60 p-5"
      @submit.prevent="submit"
    >
      <label class="flex flex-col gap-1 text-xs text-muted">
        name:
        <input
          v-model="form.name"
          type="text"
          class="rounded border border-border bg-tab px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="your name"
        />
      </label>
      <label class="flex flex-col gap-1 text-xs text-muted">
        email:
        <input
          v-model="form.email"
          type="email"
          class="rounded border border-border bg-tab px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="you@example.com"
        />
      </label>
      <label class="flex flex-col gap-1 text-xs text-muted">
        message:
        <textarea
          v-model="form.message"
          rows="5"
          class="resize-y rounded border border-border bg-tab px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="what's on your mind?"
        />
      </label>
      <div class="flex items-center justify-between">
        <span class="text-xs text-muted">{{ status }}</span>
        <button
          type="submit"
          class="rounded-md border border-accent bg-accent/20 px-4 py-1.5 text-sm text-fg transition hover:bg-accent/40"
        >
          send_message()
        </button>
      </div>
    </form>

    <section>
      <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
        /* find me on */
      </h2>
      <ul class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <li v-for="s in SOCIALS" :key="s.id">
          <a
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-sm hover:border-accent hover:text-accent"
          >
            <component :is="iconMap[s.id] ?? Mail" :size="14" />
            {{ s.id }}
          </a>
        </li>
      </ul>
    </section>

    <p class="font-mono text-sm text-muted">}</p>
  </article>
</template>
