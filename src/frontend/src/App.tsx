import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LandingPage from './pages/LandingPage';
import AdminRequestsPage from './pages/AdminRequestsPage';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import ProfileSetupPrompt from './components/auth/ProfileSetupPrompt';
import { Toaster } from '@/components/ui/sonner';

type Route = 'landing' | 'admin';

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('landing');
  const { identity } = useInternetIdentity();

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('/admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: Route) => {
    if (route === 'landing') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${route}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader currentRoute={currentRoute} onNavigate={navigate} />
      <main className="flex-1">
        {currentRoute === 'landing' && <LandingPage />}
        {currentRoute === 'admin' && <AdminRequestsPage />}
      </main>
      <SiteFooter />
      {identity && <ProfileSetupPrompt />}
      <Toaster />
    </div>
  );
}

export default App;

