export const INTENTS = [
  {
    id: 'identity',
    keywords: ['who are you', 'Sujan Shrestha', 'what are you', 'aahana.exe'],
    reply: "No name, just Sujan Shrestha's Copilot — think of me as the portfolio's unpaid intern.",
  },
  {
    id: 'who',
    keywords: ['who is', 'tell me about', 'about her', 'about him', 'about them'],
    reply: "They're a backend-leaning developer who's into AI/ML and data. Open about.md for the long form.",
  },
  {
    id: 'skills',
    keywords: ['skill', 'stack', 'tech'],
    reply: 'Yeah, check skills.yaml for the full breakdown — languages, frameworks, AI tooling, the works.',
  },
  {
    id: 'projects',
    keywords: ['project', 'build', 'made', 'portfolio piece'],
    reply: "Pop open projects.json — there's a grid of things worth clicking through.",
  },
  {
    id: 'experience',
    keywords: ['experience', 'work', 'job', 'role', 'career'],
    reply: 'experience.ts has the timeline — current role first, internships below.',
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'hire', 'hmu'],
    reply: "There's a contact form right in the portfolio — hit the contact.css tab and drop a message 📬.",
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download'],
    reply: 'resume.pdf is one tab away. You can download it too.',
  },
  {
    id: 'code',
    keywords: ['source', 'code', 'github', 'clone', 'repo'],
    reply: "The repo's there for inspiration, not copy-paste. Build your own slay 💅.",
  },
  {
    id: 'vibes',
    keywords: ['how are they', 'how are you', 'vibes', 'mood'],
    reply: "Honestly seems like they're thriving — heads-down on the next shippable thing.",
  },
  {
    id: 'fallback',
    keywords: [],
    reply: "I'm mostly a demo Copilot with canned replies — try asking about projects, skills, or experience.",
  },
]

export const GREETING = "Hey! I'm the portfolio's Copilot. Ask me anything — skills, projects, experience, how to get in touch."
