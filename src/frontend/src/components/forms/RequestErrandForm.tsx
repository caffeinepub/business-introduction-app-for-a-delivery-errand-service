import { useState } from 'react';
import { useSubmitContactRequest } from '../../hooks/useSubmitContactRequest';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  pickupDetails: string;
  dropoffDetails: string;
  notes: string;
  preferredTime: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  serviceType: '',
  pickupDetails: '',
  dropoffDetails: '',
  notes: '',
  preferredTime: ''
};

export default function RequestErrandForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: submitRequest, isPending } = useSubmitContactRequest();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.serviceType !== '' &&
      formData.pickupDetails.trim() !== '' &&
      formData.dropoffDetails.trim() !== ''
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;

    // Compose structured message for backend
    const message = `
SERVICE TYPE: ${formData.serviceType}
PHONE: ${formData.phone}
${formData.email ? `EMAIL: ${formData.email}` : ''}

PICKUP DETAILS:
${formData.pickupDetails}

DROP-OFF DETAILS:
${formData.dropoffDetails}

${formData.preferredTime ? `PREFERRED TIME: ${formData.preferredTime}` : ''}

${formData.notes ? `ADDITIONAL NOTES:\n${formData.notes}` : ''}
    `.trim();

    submitRequest(
      {
        name: formData.name,
        email: formData.email || 'no-email@provided.com',
        message
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setFormData(initialFormData);
          setTimeout(() => setShowSuccess(false), 5000);
        }
      }
    );
  };

  if (showSuccess) {
    return (
      <Card className="bg-primary/10 border-primary">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your request. We'll contact you shortly to confirm the details.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="btn-primary"
            >
              Submit Another Request
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="required">
              Your Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="required">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="205-246-5688"
              required
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType" className="required">
              Service Type *
            </Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
              <SelectTrigger id="serviceType" data-service-select>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grocery Delivery">Grocery Delivery</SelectItem>
                <SelectItem value="Restaurant Delivery">Restaurant Delivery</SelectItem>
                <SelectItem value="Special Delivery">Special Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Details */}
          <div>
            <Label htmlFor="pickupDetails" className="required">
              Pickup Details *
            </Label>
            <Textarea
              id="pickupDetails"
              value={formData.pickupDetails}
              onChange={(e) => handleChange('pickupDetails', e.target.value)}
              placeholder="Where should we pick up from? Include store name, address, or specific items needed."
              rows={3}
              required
            />
          </div>

          {/* Drop-off Details */}
          <div>
            <Label htmlFor="dropoffDetails" className="required">
              Drop-off Details *
            </Label>
            <Textarea
              id="dropoffDetails"
              value={formData.dropoffDetails}
              onChange={(e) => handleChange('dropoffDetails', e.target.value)}
              placeholder="Where should we deliver? Include your address and any special instructions."
              rows={3}
              required
            />
          </div>

          {/* Preferred Time */}
          <div>
            <Label htmlFor="preferredTime">Preferred Time Window</Label>
            <Input
              id="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => handleChange('preferredTime', e.target.value)}
              placeholder="e.g., Today 2-4pm, Tomorrow morning"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any other information we should know?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isPending}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </button>

          <p className="text-sm text-muted-foreground text-center">
            * Required fields
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

