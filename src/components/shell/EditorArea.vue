<script setup>
import { computed } from 'vue'
import { useTabsStore } from '@/stores/tabs.js'
import HomeSection from '@/components/sections/HomeSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ReadmeSection from '@/components/sections/ReadmeSection.vue'
import ResumeSection from '@/components/sections/ResumeSection.vue'

const tabs = useTabsStore()

const COMPONENT_MAP = {
  home: HomeSection,
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  contact: ContactSection,
  readme: ReadmeSection,
  resume: ResumeSection,
}

const active = computed(() => COMPONENT_MAP[tabs.activeTab] ?? null)
</script>

<template>
  <div class="relative flex-1 overflow-auto bg-tabActive">
    <div class="absolute left-0 top-0 flex w-10 select-none flex-col items-end pr-2 pt-4 text-[11px] text-muted/60">
      <span v-for="n in 60" :key="n" class="leading-5">{{ n }}</span>
    </div>
    <div class="pl-12 pr-6 pt-4 pb-16">
      <transition name="fade" mode="out-in">
        <component :is="active" :key="tabs.activeTab" />
      </transition>
    </div>
    <div
      v-if="tabs.toastMessage"
      class="pointer-events-none fixed bottom-12 left-1/2 z-50 -translate-x-1/2 rounded-md border border-border bg-panel px-4 py-2 text-xs text-fg shadow-lg animate-fade-in"
    >
      {{ tabs.toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
