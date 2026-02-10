import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

type Route = 'landing' | 'admin';

interface SiteHeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

export default function SiteHeader({ currentRoute, onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/zippys-logo.dim_512x512.png"
              alt="Zippy's Errand Services"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
            <span className="font-heading font-bold text-lg sm:text-xl text-foreground">
              Zippy's Errand Services
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Request Service
            </button>
            {identity && (
              <button
                onClick={() => onNavigate('admin')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </button>
            )}
            <LoginButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('overview')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-center"
              >
                Request Service
              </button>
              {identity && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Admin
                </button>
              )}
              <div className="pt-2">
                <LoginButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

