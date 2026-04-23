import { SECTIONS, SECTION_ORDER } from '@/data/sections.js'
import { THEMES } from '@/stores/theme.js'

const HELP_LINES = [
  'Available commands:',
  '  help                — show this message',
  '  ls                  — list files',
  '  cat <file>          — print a file',
  '  clear               — clear the terminal',
  '  git status          — show repo status',
  '  git log             — show recent commits',
  '  python --version    — show Python version',
  '  whoami              — print current user',
  '  echo <text>         — echo text',
  '  theme <name>        — change color theme',
  '  open <section>      — open a portfolio tab',
]

export function useTerminalCommands({ tabs, theme, layout, clearTerminal }) {
  function run(input) {
    const raw = input.trim()
    if (!raw) return []
    const [cmd, ...rest] = raw.split(/\s+/)
    const arg = rest.join(' ')

    switch (cmd) {
      case 'help':
        return HELP_LINES
      case 'ls':
        return [SECTION_ORDER.map((id) => SECTIONS[id].title).join('   ')]
      case 'cat': {
        const match = SECTION_ORDER.find((id) => SECTIONS[id].title === arg)
        if (!match) return [`cat: ${arg}: No such file or directory`]
        tabs.openTab(match)
        return [`// opened ${SECTIONS[match].title} — see the editor above`]
      }
      case 'clear':
        clearTerminal()
        return []
      case 'git': {
        const sub = rest[0]
        if (sub === 'status') {
          return [
            'On branch main',
            "Your branch is up to date with 'origin/main'.",
            '',
            'nothing to commit, working tree clean',
          ]
        }
        if (sub === 'log') {
          return [
            'a3f1c2e (HEAD -> main) feat: wire copilot chat',
            'b8d4e22 chore: scaffold vscode shell',
            'c0a12ff feat: add theme variants',
          ]
        }
        return [`git: '${sub ?? ''}' is not a git command.`]
      }
      case 'python': {
        if (rest.join(' ') === '--version') return ['Python 3.11.0']
        return ['Python interactive mode not available here.']
      }
      case 'whoami':
        return ['visitor']
      case 'echo':
        return [arg]
      case 'theme': {
        const name = arg.trim().toLowerCase()
        const match = THEMES.find((t) => t.id === name)
        if (!match) {
          return [
            `theme: unknown theme '${name}'. Available:`,
            '  ' + THEMES.map((t) => t.id).join(', '),
          ]
        }
        theme.setTheme(match.id)
        return [`theme set to ${match.label}`]
      }
      case 'open': {
        const name = arg.trim()
        if (!SECTIONS[name]) return [`open: unknown section '${name}'`]
        tabs.openTab(name)
        return [`opened ${SECTIONS[name].title}`]
      }
      default:
        return [`bash: ${cmd}: command not found`]
    }
  }

  return { run }
}
