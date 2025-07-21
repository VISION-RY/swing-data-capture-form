import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection2Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection2 = ({ data, updateData }: ExternalSection2Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Setup Experience</h3>
      
      <div>
        <Label>How easy was it to set up the device? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.setupEase || 3]}
            onValueChange={(value) => handleSliderChange('setupEase', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Difficult (1)</span>
            <span>Very Easy (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How clearly did you understand where to place the device? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.placementClarity || 3]}
            onValueChange={(value) => handleSliderChange('placementClarity', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Difficult (1)</span>
            <span>Very Easy (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How confident were you that it was working correctly? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.setupConfidence || 3]}
            onValueChange={(value) => handleSliderChange('setupConfidence', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Difficult (1)</span>
            <span>Very Easy (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Setup Process</h3>
      
      <div>
        <Label htmlFor="neededHelp">Did you need help to set it up?</Label>
        <Select value={data.neededHelp} onValueChange={(value) => handleInputChange('neededHelp', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Yes/No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="setupDuration">How long did setup take?</Label>
        <Select value={data.setupDuration} onValueChange={(value) => handleInputChange('setupDuration', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select setup duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-5">Less than 5 minutes</SelectItem>
            <SelectItem value="5-10-mins">5-10 minutes</SelectItem>
            <SelectItem value="10-15-mins">10-15 minutes</SelectItem>
            <SelectItem value="more-than-15">More than 15 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="setupConfusion">What confused you about setup? (Optional)</Label>
        <Textarea
          id="setupConfusion"
          value={data.setupConfusion || ''}
          onChange={(e) => handleInputChange('setupConfusion', e.target.value)}
          placeholder="Describe any confusion you experienced during setup..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="setupImprovements">What would make setup easier? (Optional)</Label>
        <Textarea
          id="setupImprovements"
          value={data.setupImprovements || ''}
          onChange={(e) => handleInputChange('setupImprovements', e.target.value)}
          placeholder="Suggest improvements for the setup process..."
          rows={3}
        />
      </div>
    </div>
  );
};