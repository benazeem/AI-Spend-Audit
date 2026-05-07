export interface PricingBenchmark {
  toolName: string;
  category: string;
  avgMonthlyPerUser: number;
  budgetThreshold: number;
  overspendThreshold: number;
  alternatives: string[];
  notes?: string;
}

export const PRICING_BENCHMARKS: Record<string, PricingBenchmark> = {
  'chatgpt': {
    toolName: 'ChatGPT',
    category: 'llm',
    avgMonthlyPerUser: 20,
    budgetThreshold: 15,
    overspendThreshold: 30,
    alternatives: ['Claude', 'Gemini', 'Llama (self-hosted)'],
  },
  'claude': {
    toolName: 'Claude',
    category: 'llm',
    avgMonthlyPerUser: 20,
    budgetThreshold: 15,
    overspendThreshold: 30,
    alternatives: ['ChatGPT', 'Gemini', 'Mistral'],
  },
  'github copilot': {
    toolName: 'GitHub Copilot',
    category: 'code-assistant',
    avgMonthlyPerUser: 19,
    budgetThreshold: 15,
    overspendThreshold: 25,
    alternatives: ['Cursor', 'Codeium', 'Tabnine'],
  },
  'cursor': {
    toolName: 'Cursor',
    category: 'code-assistant',
    avgMonthlyPerUser: 20,
    budgetThreshold: 16,
    overspendThreshold: 30,
    alternatives: ['GitHub Copilot', 'Codeium', 'Windsurf'],
  },
  'midjourney': {
    toolName: 'Midjourney',
    category: 'image-generation',
    avgMonthlyPerUser: 30,
    budgetThreshold: 20,
    overspendThreshold: 60,
    alternatives: ['DALL-E', 'Stable Diffusion', 'Ideogram'],
  },
  'dall-e': {
    toolName: 'DALL-E',
    category: 'image-generation',
    avgMonthlyPerUser: 20,
    budgetThreshold: 10,
    overspendThreshold: 40,
    alternatives: ['Midjourney', 'Stable Diffusion', 'Leonardo AI'],
  },
  'jasper': {
    toolName: 'Jasper',
    category: 'llm',
    avgMonthlyPerUser: 49,
    budgetThreshold: 30,
    overspendThreshold: 60,
    alternatives: ['ChatGPT', 'Claude', 'Copy.ai'],
  },
  'grammarly': {
    toolName: 'Grammarly',
    category: 'other',
    avgMonthlyPerUser: 12,
    budgetThreshold: 10,
    overspendThreshold: 20,
    alternatives: ['LanguageTool', 'ProWritingAid', 'ChatGPT'],
  },
  'notion ai': {
    toolName: 'Notion AI',
    category: 'other',
    avgMonthlyPerUser: 10,
    budgetThreshold: 8,
    overspendThreshold: 15,
    alternatives: ['ChatGPT', 'Coda AI', 'Craft'],
  },
  'otter.ai': {
    toolName: 'Otter.ai',
    category: 'transcription',
    avgMonthlyPerUser: 17,
    budgetThreshold: 12,
    overspendThreshold: 25,
    alternatives: ['Whisper (open-source)', 'Fireflies.ai', 'tl;dv'],
  },
  'perplexity': {
    toolName: 'Perplexity',
    category: 'search',
    avgMonthlyPerUser: 20,
    budgetThreshold: 15,
    overspendThreshold: 25,
    alternatives: ['ChatGPT Search', 'Google Gemini', 'You.com'],
  },
  'zapier ai': {
    toolName: 'Zapier AI',
    category: 'automation',
    avgMonthlyPerUser: 30,
    budgetThreshold: 20,
    overspendThreshold: 50,
    alternatives: ['Make (Integromat)', 'n8n', 'Activepieces'],
  },
};

export const CATEGORY_BENCHMARKS: Record<string, { avgMonthlyPerUser: number; overspendMultiplier: number }> = {
  'llm': { avgMonthlyPerUser: 25, overspendMultiplier: 2.0 },
  'image-generation': { avgMonthlyPerUser: 25, overspendMultiplier: 2.5 },
  'code-assistant': { avgMonthlyPerUser: 20, overspendMultiplier: 2.0 },
  'transcription': { avgMonthlyPerUser: 15, overspendMultiplier: 2.0 },
  'search': { avgMonthlyPerUser: 15, overspendMultiplier: 2.0 },
  'automation': { avgMonthlyPerUser: 25, overspendMultiplier: 2.0 },
  'analytics': { avgMonthlyPerUser: 30, overspendMultiplier: 2.0 },
  'other': { avgMonthlyPerUser: 20, overspendMultiplier: 2.0 },
};
