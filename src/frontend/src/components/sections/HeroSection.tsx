export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-accent to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Fast, Reliable Errand Services in Tuscaloosa
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              From grocery shopping to restaurant pickups, we handle your errands so you can focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={scrollToContact} className="btn-primary text-lg">
                Request Service Now
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('services');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-lg"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="/assets/generated/zippys-hero.dim_1600x600.png"
              alt="Zippy's Errand Services - Local delivery in Tuscaloosa"
              className="w-full h-auto rounded-lg shadow-warm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

