import { BarChart3, DollarSign, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Section, Footer } from '@/components/layout';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showCta />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="ambient-glow"
              style={{
                top: '-120px',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '500px',
                width: '700px',
                background: 'oklch(0.72 0.19 155 / 8%)',
              }}
            />
            <div
              className="ambient-glow"
              style={{
                top: '200px',
                right: '-80px',
                height: '350px',
                width: '350px',
                background: 'oklch(0.68 0.16 250 / 6%)',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:py-40 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-accent/20 bg-emerald-surface/50 px-4 py-1.5 text-sm text-emerald-accent">
              <Zap className="h-3.5 w-3.5" />
              Free AI spending analysis for startups
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stop overpaying for{' '}
              <span className="gradient-text-primary">AI tools</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
              Most startups waste{' '}
              <strong className="text-emerald-accent font-semibold">30–50%</strong>{' '}
              of their AI budget on underused or overpriced tools. Get a free audit
              with actionable savings recommendations in minutes.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/audit">
                <Button size="lg" className="gap-2 text-base px-8 h-12 btn-cta rounded-xl shadow-lg shadow-blue-accent/20">
                  Audit My AI Spend <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                No signup required &#x2022; Results in 2 minutes
              </p>
            </div>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
              <p className="mt-3 text-muted-foreground">Three steps to optimize your AI spending.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: DollarSign,
                  title: 'Enter your tools',
                  description: 'List your AI subscriptions with pricing, team size, and usage estimates.',
                  step: '01',
                },
                {
                  icon: BarChart3,
                  title: 'Get instant analysis',
                  description: 'Our engine benchmarks your spending against market rates and detects waste.',
                  step: '02',
                },
                {
                  icon: Zap,
                  title: 'Save money',
                  description: 'Receive prioritized recommendations with specific action items and alternatives.',
                  step: '03',
                },
              ].map((feature) => (
                <div key={feature.step} className="card-elevated rounded-2xl p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-accent/10 text-emerald-accent">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="step-badge">{feature.step}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
              {[
                { value: '40%', label: 'Avg. savings found', highlight: true },
                { value: '2 min', label: 'Time to audit', highlight: false },
                { value: '$0', label: 'Cost to you', highlight: true },
                { value: '12+', label: 'Tools benchmarked', highlight: false },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className={`text-3xl metric-value tracking-tight ${stat.highlight ? 'text-emerald-accent' : 'text-foreground'}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to optimize your AI spend?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join forward-thinking startups that have already saved thousands on AI tooling.
            </p>
            <Link href="/audit" className="mt-8 inline-block">
              <Button size="lg" className="gap-2 text-base px-8 h-12 btn-cta rounded-xl shadow-lg shadow-blue-accent/20">
                Start Free Audit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
