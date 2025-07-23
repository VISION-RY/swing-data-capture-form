import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InternalSurveyData, ExternalSurveyData } from "@/types/survey";

interface ContactInfoProps {
  data: Partial<InternalSurveyData | ExternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData | ExternalSurveyData>) => void;
}

export const ContactInfo = ({ data, updateData }: ContactInfoProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information (Optional)</h3>
      <p className="text-sm text-muted-foreground">
        This information helps us follow up and provide better insights from your session.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter last name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={data.phoneNumber || ''}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </div>
  );
};