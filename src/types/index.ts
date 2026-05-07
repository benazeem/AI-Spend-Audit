export type ToolCategory =
  | 'llm'
  | 'image-generation'
  | 'code-assistant'
  | 'transcription'
  | 'search'
  | 'automation'
  | 'analytics'
  | 'other';

export type BillingCycle = 'monthly' | 'annual';

export interface AuditToolEntry {
  id: string;
  toolName: string;
  category: ToolCategory;
  monthlySpend: number;
  billingCycle: BillingCycle;
  activeUsers: number;
  usagePercentage: number; // 0-100 — estimated utilization
}

export interface AuditFormData {
  tools: AuditToolEntry[];
  companyName?: string;
  contactEmail?: string;
  teamSize?: number;
}

export type RecommendationSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Recommendation {
  id: string;
  toolName: string;
  category: ToolCategory;
  severity: RecommendationSeverity;
  title: string;
  description: string;
  currentSpend: number;
  projectedSavings: number;
  actionItems: string[];
}

export interface AuditResult {
  id: string;
  createdAt: string;
  totalMonthlySpend: number;
  projectedSavings: number;
  savingsPercentage: number;
  recommendations: Recommendation[];
  aiSummary: string | null;
  shareToken: string;
  tools: AuditToolEntry[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
