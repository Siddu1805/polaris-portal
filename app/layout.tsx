import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { WorkflowProvider } from '@/context/WorkflowContext';
import { SavedItemsProvider } from '@/context/SavedItemsContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { GuidedTourBanner } from '@/components/common/GuidedTourBanner';

export const metadata: Metadata = {
  title: 'POLARIS — Polar Science Knowledge & Outreach Portal',
  description: 'A unified digital experience for discovering polar science, research expeditions, scientific datasets, publications, photographs, videos, researchers, educational resources, and science communication content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white">
        <ThemeProvider>
          <ToastProvider>
            <WorkflowProvider>
              <SavedItemsProvider>
                <GuidedTourBanner />
                <Navbar />
                <main className="flex-1 w-full">
                  {children}
                </main>
                <Footer />
                <MobileBottomNav />
              </SavedItemsProvider>
            </WorkflowProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
