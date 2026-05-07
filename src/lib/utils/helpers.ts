// =============================================================================
// Shared Utility Functions
// =============================================================================

/**
 * Format a number as USD currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as a percentage string.
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Construct the full public URL for a shared audit.
 */
export function getShareUrl(shareToken: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  return `${baseUrl}/share/${shareToken}`;
}

/**
 * Simple delay utility for loading states.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Severity badge color mapping.
 */
export const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/20',
  high: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
};
