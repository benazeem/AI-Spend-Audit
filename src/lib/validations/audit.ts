import { z } from 'zod';

export const toolEntrySchema = z.object({
  id: z.string(),
  toolName: z
    .string()
    .min(1, 'Tool name is required')
    .max(100, 'Tool name must be under 100 characters'),
  category: z.enum([
    'llm',
    'image-generation',
    'code-assistant',
    'transcription',
    'search',
    'automation',
    'analytics',
    'other',
  ]),
  monthlySpend: z
    .number({ message: 'Monthly spend must be a number' })
    .min(0, 'Spend cannot be negative')
    .max(1_000_000, 'Please verify this amount'),
  billingCycle: z.enum(['monthly', 'annual']),
  activeUsers: z
    .number({ message: 'Active users must be a number' })
    .int('Must be a whole number')
    .min(1, 'At least 1 user required')
    .max(100_000, 'Please verify this number'),
  usagePercentage: z
    .number({ message: 'Usage must be a number' })
    .min(0, 'Cannot be negative')
    .max(100, 'Cannot exceed 100%'),
});

export const auditFormSchema = z.object({
  tools: z
    .array(toolEntrySchema)
    .min(1, 'Add at least one AI tool to audit')
    .max(20, 'Maximum 20 tools per audit'),
});

export const companyDetailsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(200, 'Company name is too long'),
  contactEmail: z.string().email('Please enter a valid email'),
  teamSize: z
    .number({ message: 'Team size must be a number' })
    .int()
    .min(1)
    .max(100_000)
    .optional(),
});

export type ToolEntryFormValues = z.infer<typeof toolEntrySchema>;
export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type CompanyDetailsFormValues = z.infer<typeof companyDetailsSchema>;
