import { INTENTS } from '@/data/copilotReplies.js'
import { useCopilotStore } from '@/stores/copilot.js'

function matchIntent(text) {
  const lower = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const intent of INTENTS) {
    if (!intent.keywords.length) continue
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) {
        const score = kw.length
        if (score > bestScore) {
          bestScore = score
          best = intent
        }
      }
    }
  }
  return best ?? INTENTS.find((i) => i.id === 'fallback')
}

export function useCopilotBot() {
  const copilot = useCopilotStore()

  async function ask(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    copilot.pushUser(trimmed)
    copilot.typing = true
    const intent = matchIntent(trimmed)
    const delay = 500 + Math.min(1400, intent.reply.length * 12)
    await new Promise((r) => setTimeout(r, delay))
    copilot.typing = false
    copilot.pushBot(intent.reply)
  }

  return { ask }
}
