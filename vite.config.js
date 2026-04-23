import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(() => {
  const isVercel = Boolean(process.env.VERCEL)

  return {
    plugins: [vue()],
    base: isVercel ? '/' : '/vscode-portfolio/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
