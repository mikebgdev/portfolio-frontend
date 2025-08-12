import type { ReactNode } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};