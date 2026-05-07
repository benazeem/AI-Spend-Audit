import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer, PageHeader, Footer } from '@/components/layout';

interface SharePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Shared Audit Report',
    description: `View this AI spend audit report with savings recommendations. Share ID: ${id}`,
    openGraph: {
      title: 'AI Spend Audit Report',
      description: 'See how much this team can save on AI tooling costs.',
      type: 'website',
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar showCta={false} />

      <PageContainer size="lg" className="flex-1">
        <div className="mb-6 rounded-xl border border-blue-accent/20 bg-blue-surface/50 px-4 py-3 text-sm text-blue-accent">
          You&apos;re viewing a shared audit report. Want to audit your own AI spend?{' '}
          <Link href="/audit" className="underline underline-offset-4 font-medium">
            Start here
          </Link>
        </div>

        <PageHeader
          title="AI Spend Audit Report"
          meta={`Share token: ${id}`}
        />

        <div className="card-elevated rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">
            Shared report view coming next &mdash; mirrors the results page in a read-only
            format with a CTA to run your own audit.
          </p>
        </div>
      </PageContainer>

      <Footer
        right={
          <Link href="/audit" className="underline underline-offset-4">
            Run your own audit
          </Link>
        }
      />
    </div>
  );
}
