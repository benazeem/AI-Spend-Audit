import { v4 as uuid } from 'uuid';
import type {
  AuditToolEntry,
  Recommendation,
} from '@/types';
import {
  PRICING_BENCHMARKS,
  CATEGORY_BENCHMARKS,
} from '@/lib/pricing/benchmarks';

interface AuditEngineResult {
  totalMonthlySpend: number;
  projectedSavings: number;
  recommendations: Recommendation[];
}

export function analyzeTools(tools: AuditToolEntry[]): AuditEngineResult {
  const recommendations: Recommendation[] = [];
  let totalMonthlySpend = 0;
  let projectedSavings = 0;

  const categoryToolMap = new Map<string, AuditToolEntry[]>();

  for (const tool of tools) {
    totalMonthlySpend += tool.monthlySpend;

    const existing = categoryToolMap.get(tool.category) ?? [];
    existing.push(tool);
    categoryToolMap.set(tool.category, existing);

    const perUserCost = tool.activeUsers > 0 ? tool.monthlySpend / tool.activeUsers : tool.monthlySpend;
    const benchmark = PRICING_BENCHMARKS[tool.toolName.toLowerCase()];
    const categoryBenchmark = CATEGORY_BENCHMARKS[tool.category];

    if (tool.usagePercentage < 30) {
      const savings = tool.monthlySpend * (1 - tool.usagePercentage / 100) * 0.5;
      projectedSavings += savings;

      recommendations.push({
        id: uuid(),
        toolName: tool.toolName,
        category: tool.category,
        severity: tool.usagePercentage < 15 ? 'critical' : 'high',
        title: `Low utilization detected for ${tool.toolName}`,
        description: `Only ${tool.usagePercentage}% of capacity is being used. Consider reducing seats or switching to a pay-as-you-go plan.`,
        currentSpend: tool.monthlySpend,
        projectedSavings: Math.round(savings * 100) / 100,
        actionItems: [
          `Audit active vs. provisioned seats for ${tool.toolName}`,
          'Interview team members about actual usage frequency',
          tool.usagePercentage < 15
            ? 'Consider cancelling and using a free tier or alternative'
            : 'Downgrade to a smaller plan tier',
        ],
      });
    }

    if (benchmark) {
      if (perUserCost > benchmark.overspendThreshold) {
        const idealCost = benchmark.avgMonthlyPerUser * tool.activeUsers;
        const savings = tool.monthlySpend - idealCost;

        if (savings > 0) {
          projectedSavings += savings;
          recommendations.push({
            id: uuid(),
            toolName: tool.toolName,
            category: tool.category,
            severity: perUserCost > benchmark.overspendThreshold * 1.5 ? 'critical' : 'high',
            title: `${tool.toolName} costs $${perUserCost.toFixed(0)}/user — above market rate`,
            description: `Market average is $${benchmark.avgMonthlyPerUser}/user/month.`,
            currentSpend: tool.monthlySpend,
            projectedSavings: Math.round(savings * 100) / 100,
            actionItems: [
              `Negotiate volume pricing with ${tool.toolName}`,
              `Evaluate alternatives: ${benchmark.alternatives.join(', ')}`,
              'Request a downgrade to a lower plan tier',
            ],
          });
        }
      }
    } else if (categoryBenchmark) {
      const threshold = categoryBenchmark.avgMonthlyPerUser * categoryBenchmark.overspendMultiplier;
      if (perUserCost > threshold) {
        const idealCost = categoryBenchmark.avgMonthlyPerUser * tool.activeUsers;
        const savings = Math.max(0, tool.monthlySpend - idealCost);

        if (savings > 0) {
          projectedSavings += savings;
          recommendations.push({
            id: uuid(),
            toolName: tool.toolName,
            category: tool.category,
            severity: 'medium',
            title: `${tool.toolName} may be above market rate for ${tool.category}`,
            description: `At $${perUserCost.toFixed(0)}/user, this exceeds typical ${tool.category} tooling costs. Industry average is ~$${categoryBenchmark.avgMonthlyPerUser}/user.`,
            currentSpend: tool.monthlySpend,
            projectedSavings: Math.round(savings * 100) / 100,
            actionItems: [
              'Research alternative tools in this category',
              'Request pricing quotes from competitors',
              'Consider open-source alternatives',
            ],
          });
        }
      }
    }

    if (tool.billingCycle === 'monthly' && tool.monthlySpend > 50) {
      const annualSavings = tool.monthlySpend * 0.15;
      projectedSavings += annualSavings;

      recommendations.push({
        id: uuid(),
        toolName: tool.toolName,
        category: tool.category,
        severity: 'low',
        title: `Switch ${tool.toolName} to annual billing`,
        description: `Annual billing typically saves 15-20%. At $${tool.monthlySpend}/mo, switching could save ~$${(annualSavings * 12).toFixed(0)}/year.`,
        currentSpend: tool.monthlySpend,
        projectedSavings: Math.round(annualSavings * 100) / 100,
        actionItems: [
          'Check if annual billing is available',
          'Calculate break-even point (usually 3-4 months)',
          'Confirm tool will be needed for the full year',
        ],
      });
    }
  }

  for (const [category, categoryTools] of categoryToolMap.entries()) {
    if (categoryTools.length >= 2) {
      const toolNames = categoryTools.map((t) => t.toolName);
      const totalCategorySpend = categoryTools.reduce((sum, t) => sum + t.monthlySpend, 0);
      const potentialSavings = totalCategorySpend * 0.3;

      recommendations.push({
        id: uuid(),
        toolName: toolNames.join(', '),
        category: category as AuditToolEntry['category'],
        severity: categoryTools.length >= 3 ? 'high' : 'medium',
        title: `${categoryTools.length} overlapping tools in "${category}"`,
        description: `You're spending $${totalCategorySpend.toFixed(0)}/mo on ${toolNames.join(', ')}. Consolidating to a single tool could save significantly.`,
        currentSpend: totalCategorySpend,
        projectedSavings: Math.round(potentialSavings * 100) / 100,
        actionItems: [
          `Compare feature sets of ${toolNames.join(' vs. ')}`,
          'Survey team to determine which tool is most valued',
          'Plan a migration timeline for consolidation',
        ],
      });
    }
  }

  recommendations.sort((a, b) => b.projectedSavings - a.projectedSavings);

  return {
    totalMonthlySpend: Math.round(totalMonthlySpend * 100) / 100,
    projectedSavings: Math.round(projectedSavings * 100) / 100,
    recommendations,
  };
}
