import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubNavbarProps {
  backHref?: string;
  backLabel?: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
}

export function SubNavbar({
  backHref = '/',
  backLabel = 'Back',
  breadcrumb,
  actions,
}: SubNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href={backHref}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </Button>
          </Link>
          {breadcrumb && (
            <>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm font-medium text-muted-foreground">
                {breadcrumb}
              </span>
            </>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </nav>
    </header>
  );
}

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
};

export function PageContainer({
  children,
  className,
  size = 'lg',
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full px-6 py-12',
        sizeMap[size],
        className
      )}
    >
      {children}
    </main>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  meta?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  meta,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-10', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {meta && (
            <p className="mt-1 text-xs font-mono text-muted-foreground/70">
              {meta}
            </p>
          )}
          {description && (
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2 pt-1">{actions}</div>
        )}
      </div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'card-elevated rounded-2xl',
        hover && 'transition-all',
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Section({ children, className, bordered = true }: SectionProps) {
  return (
    <section className={cn(bordered && 'border-t border-border/40', className)}>
      {children}
    </section>
  );
}

interface FooterProps {
  right?: React.ReactNode;
}

export function Footer({ right }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-background mt-auto">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AI Spend Audit</p>
        {right ?? <p>Built for startups, by engineers.</p>}
      </div>
    </footer>
  );
}
