import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Spend Audit — Optimize Your AI Tooling Costs',
    template: '%s | AI Spend Audit',
  },
  description:
    'Analyze your startup\'s AI tool spending and get actionable recommendations to reduce costs by up to 40%. Free, instant audit.',
  keywords: ['AI spend', 'AI tools', 'cost optimization', 'startup', 'SaaS audit'],
  openGraph: {
    title: 'AI Spend Audit — Optimize Your AI Tooling Costs',
    description:
      'Free AI spending analysis for startups. Get personalized recommendations in minutes.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
