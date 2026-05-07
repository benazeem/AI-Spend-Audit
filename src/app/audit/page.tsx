import type { Metadata } from 'next';
import { SubNavbar, PageContainer, PageHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'AI Spend Audit',
  description: 'Enter your AI tools and get instant cost optimization recommendations.',
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SubNavbar backHref="/" backLabel="Back" breadcrumb="New Audit" />

      <PageContainer size="md">
        <PageHeader
          title="Audit your AI spending"
          description="Add each AI tool your team uses. We'll analyze your spending and find savings opportunities."
        />

        <div className="card-elevated rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">
            Audit form component coming next &mdash; will use React Hook Form + Zod validation
            with dynamic tool entry fields.
          </p>
        </div>
      </PageContainer>
    </div>
  );
}
