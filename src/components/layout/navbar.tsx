import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  showCta?: boolean;
}

export function Navbar({ showCta = true }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-accent/15 text-emerald-accent text-sm font-bold select-none">
            AI
          </div>
          <span className="text-foreground">Spend Audit</span>
        </Link>

        {showCta && (
          <Link href="/audit">
            <Button size="sm" className="gap-1.5 btn-cta rounded-lg">
              Start Audit <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
