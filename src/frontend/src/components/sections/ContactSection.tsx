import { Phone, Mail } from 'lucide-react';
import RequestErrandForm from '../forms/RequestErrandForm';

export default function ContactSection() {
  return (
    <section id="contact" className="section-container bg-accent/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Request a Service
          </h2>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:205-246-5688" className="text-muted-foreground hover:text-primary transition-colors">
                      205-246-5688
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Service Area</p>
                    <p className="text-muted-foreground">Tuscaloosa, Alabama</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Quick Response</h4>
              <p className="text-sm text-muted-foreground">
                We typically respond to requests within 1-2 hours during business hours.
              </p>
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-2">
            <RequestErrandForm />
          </div>
        </div>
      </div>
    </section>
  );
}

