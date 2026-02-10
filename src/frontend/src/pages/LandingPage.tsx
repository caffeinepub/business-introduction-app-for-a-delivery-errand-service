import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ContactSection from '../components/sections/ContactSection';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <section id="overview" className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Your Trusted Local Errand Service
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Based in Tuscaloosa, Zippy's Errand Services makes your life easier by handling 
            grocery shopping, restaurant pickups, and special deliveries. We're fast, reliable, 
            and committed to serving our community with care.
          </p>
        </div>
      </section>
      <ServicesSection />
      <HowItWorksSection />
      <ContactSection />
    </div>
  );
}

