import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'temporary-key');

interface SendAuditEmailParams {
  to: string;
  companyName: string;
  totalMonthlySpend: number;
  projectedSavings: number;
  shareUrl: string;
}

export async function sendAuditEmail(params: SendAuditEmailParams): Promise<boolean> {
  try {
    const { to, companyName, totalMonthlySpend, projectedSavings, shareUrl } = params;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'audit@aispendaudit.com',
      to,
      subject: `Your AI Spend Audit Results — ${companyName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 700;">AI Spend Audit Results</h1>
          <p>Hi ${companyName} team,</p>
          <p>Your AI spend audit is complete. Here's the summary:</p>
          <div style="background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 8px;"><strong>Monthly AI Spend:</strong> $${totalMonthlySpend.toLocaleString()}</p>
            <p style="margin: 0;"><strong>Projected Savings:</strong> $${projectedSavings.toLocaleString()}/mo</p>
          </div>
          <a href="${shareUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            View Full Report
          </a>
          <p style="margin-top: 24px; color: #666; font-size: 14px;">
            This report is also available at: <a href="${shareUrl}">${shareUrl}</a>
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('[Email] Failed to send audit email:', error);
    return false;
  }
}
