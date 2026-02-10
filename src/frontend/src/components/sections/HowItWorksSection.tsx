import { MessageSquare, CheckCircle, Truck } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Tell Us What You Need',
      description: 'Fill out our simple request form with your errand details, pickup and drop-off locations.'
    },
    {
      icon: CheckCircle,
      title: 'We Confirm Your Request',
      description: 'Our team reviews your request and confirms the details and timing with you.'
    },
    {
      icon: Truck,
      title: 'We Deliver',
      description: 'We handle your errand quickly and professionally, keeping you updated along the way.'
    }
  ];

  return (
    <section id="how-it-works" className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Getting started with Zippy's is easy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <step.icon className="h-8 w-8" />
            </div>
            <div className="relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

