import { ShoppingCart, UtensilsCrossed, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesSection() {
  const scrollToContact = (serviceType?: string) => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
    
    // Pre-select service type if provided
    if (serviceType) {
      setTimeout(() => {
        const selectElement = document.querySelector<HTMLButtonElement>('[data-service-select]');
        if (selectElement) {
          selectElement.click();
        }
      }, 300);
    }
  };

  const services = [
    {
      icon: ShoppingCart,
      title: 'Grocery Delivery',
      description: 'We shop for your groceries and deliver them fresh to your door. Just send us your list and we will handle the rest.',
      color: 'text-primary'
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant Delivery',
      description: 'Craving your favorite meal? We pick up from local restaurants and bring it to you hot and ready.',
      color: 'text-primary'
    },
    {
      icon: Package,
      title: 'Special Delivery',
      description: 'Need something picked up or dropped off? We handle pickups and deliveries from local stores and businesses.',
      color: 'text-primary'
    }
  ];

  return (
    <section id="services" className="section-container bg-accent/30">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Our Services
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We offer three core services to make your life easier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          const iconColorClass = service.color + ' mb-4';
          return (
            <Card key={index} className="hover:shadow-warm transition-shadow">
              <CardHeader>
                <div className={iconColorClass}>
                  <IconComponent className="h-12 w-12" />
                </div>
                <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <button
                  onClick={() => scrollToContact(service.title)}
                  className="w-full btn-primary"
                >
                  Request This Service
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

