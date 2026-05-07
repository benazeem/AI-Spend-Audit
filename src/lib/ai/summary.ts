// =============================================================================
// Anthropic AI Integration — Audit Summary Generator
// =============================================================================
// Generates a personalized, executive-style narrative summary of audit findings.
// Uses Claude's structured reasoning to explain recommendations in context.
// =============================================================================

import Anthropic from '@anthropic-ai/sdk';
import type { AuditToolEntry, Recommendation } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateSummaryInput {
  tools: AuditToolEntry[];
  totalMonthlySpend: number;
  projectedSavings: number;
  recommendations: Recommendation[];
  companyName?: string;
  teamSize?: number;
}

/**
 * Generate a personalized AI narrative summarizing the audit results.
 *
 * Returns null if the API call fails — the app works fine without a summary,
 * so we degrade gracefully rather than blocking the user.
 */
export async function generateAuditSummary(
  input: GenerateSummaryInput,
): Promise<string | null> {
  try {
    const { tools, totalMonthlySpend, projectedSavings, recommendations, companyName, teamSize } =
      input;

    const savingsPercentage =
      totalMonthlySpend > 0 ? ((projectedSavings / totalMonthlySpend) * 100).toFixed(1) : '0';

    const topRecommendations = recommendations
      .slice(0, 5)
      .map(
        (r, i) =>
          `${i + 1}. [${r.severity.toUpperCase()}] ${r.title} — potential savings: $${r.projectedSavings}/mo`,
      )
      .join('\n');

    const toolList = tools
      .map((t) => `- ${t.toolName} (${t.category}): $${t.monthlySpend}/mo, ${t.activeUsers} users, ${t.usagePercentage}% utilization`)
      .join('\n');

    const prompt = `You are a senior AI strategy consultant writing a brief executive summary for a startup's AI tooling spend audit.

${companyName ? `Company: ${companyName}` : 'Company: [unnamed startup]'}
${teamSize ? `Team size: ${teamSize} people` : ''}

AI Tool Stack:
${toolList}

Summary Metrics:
- Total monthly AI spend: $${totalMonthlySpend}
- Projected monthly savings: $${projectedSavings} (${savingsPercentage}%)
- Number of recommendations: ${recommendations.length}

Top Recommendations:
${topRecommendations}

Write a concise, actionable 3-4 paragraph summary that:
1. Opens with the big picture — is this spend healthy, concerning, or critical?
2. Highlights the 2-3 highest-impact changes the company should make
3. Closes with a forward-looking note about optimizing their AI stack as they scale
4. Uses specific numbers from the data — don't be generic

Tone: Direct, professional, helpful — like a sharp VP of Engineering giving feedback.
Length: 200-300 words maximum.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    return textBlock?.text ?? null;
  } catch (error) {
    console.error('[AI Summary] Failed to generate:', error);
    return null;
  }
}
