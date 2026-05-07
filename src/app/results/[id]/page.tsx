import type { Metadata } from 'next';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubNavbar, PageContainer, PageHeader } from '@/components/layout';

interface ResultsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Audit Results',
    description: `View AI spend audit results and savings recommendations. Audit ID: ${id}`,
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SubNavbar
        backHref="/audit"
        backLabel="New Audit"
        breadcrumb="Results"
        actions={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
        }
      />

      <PageContainer size="lg">
        <PageHeader
          title="Your Audit Results"
          meta={`Audit ID: ${id}`}
        />

        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          {[
            { label: 'Total Monthly Spend', value: '--', accent: false },
            { label: 'Projected Savings', value: '--', accent: true },
            { label: 'Recommendations', value: '--', accent: false },
          ].map((metric) => (
            <div key={metric.label} className="card-elevated rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className={`mt-2 text-3xl metric-value tracking-tight ${metric.accent ? 'savings-value' : 'text-foreground'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="card-elevated rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">
            Results dashboard component coming next &mdash; will display AI summary, recommendations
            with severity badges, and action items.
          </p>
        </div>
      </PageContainer>
    </div>
  );
}
