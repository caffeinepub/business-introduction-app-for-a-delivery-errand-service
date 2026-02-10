import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'zippys-errand-services'
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/zippys-logo.dim_512x512.png"
                alt="Zippy's Errand Services"
                className="h-10 w-10"
              />
              <span className="font-heading font-bold text-lg">
                Zippy's Errand Services
              </span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Your trusted local delivery and errand service in Tuscaloosa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('overview')}
                className="text-left text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
            <div className="text-secondary-foreground/80 text-sm space-y-2">
              <p>Tuscaloosa, Alabama</p>
              <p>Phone: 205-246-5688</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/60 text-sm">
            © {currentYear} Zippy's Errand Services. All rights reserved.
          </p>
          <p className="text-secondary-foreground/60 text-sm flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

