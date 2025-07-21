import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection6Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection6 = ({ data, updateData }: ExternalSection6Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentFeatures = data.additionalFeatures || [];
    if (checked) {
      updateData({ additionalFeatures: [...currentFeatures, value] });
    } else {
      updateData({ additionalFeatures: currentFeatures.filter(f => f !== value) });
    }
  };

  const additionalFeatureOptions = [
    'Hitting analysis only',
    'Pitching analysis',
    'Both hitting and pitching',
    'Game 3D mode/simulation',
    'Ability to get free or discounted gear',
    'Recruiting and leaderboards for HS/College',
    'Advanced video analysis',
    'Team comparison features',
    'Mobile app improvements',
    'Lower price point',
    'Subscription model option',
    'Integration with other training tools',
    'None - current features sufficient',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">System Performance</h3>
      
      <div>
        <Label>Overall experience today (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.overallExperience || 3]}
            onValueChange={(value) => handleSliderChange('overallExperience', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Poor (1)</span>
            <span>Excellent (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How much do you trust the data? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.dataTrust || 3]}
            onValueChange={(value) => handleSliderChange('dataTrust', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Poor (1)</span>
            <span>Excellent (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How likely are you to recommend this system? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.recommendLikelihood || 3]}
            onValueChange={(value) => handleSliderChange('recommendLikelihood', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Poor (1)</span>
            <span>Excellent (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How likely are you to use this weekly in training? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.weeklyUseLikelihood || 3]}
            onValueChange={(value) => handleSliderChange('weeklyUseLikelihood', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Poor (1)</span>
            <span>Excellent (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Future Use</h3>
      
      <div>
        <Label htmlFor="useWithoutCoach">Would you use this without a coach present?</Label>
        <Select value={data.useWithoutCoach} onValueChange={(value) => handleInputChange('useWithoutCoach', value)}>
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
        <Label>What additional features would make you purchase this system?</Label>
        <div className="grid grid-cols-1 gap-2 mt-2 max-h-60 overflow-y-auto">
          {additionalFeatureOptions.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={data.additionalFeatures?.includes(feature) || false}
                onCheckedChange={(checked) => handleCheckboxChange(feature, checked as boolean)}
              />
              <Label htmlFor={feature} className="text-sm">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="likedMost">What did you like most about the experience?</Label>
        <Textarea
          id="likedMost"
          value={data.likedMost || ''}
          onChange={(e) => handleInputChange('likedMost', e.target.value)}
          placeholder="Describe what you enjoyed most about using the system..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="frustrations">What frustrated you, if anything?</Label>
        <Textarea
          id="frustrations"
          value={data.frustrations || ''}
          onChange={(e) => handleInputChange('frustrations', e.target.value)}
          placeholder="Describe any frustrations or pain points..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="mustUseFeatures">What would make this a "must-use" tool?</Label>
        <Textarea
          id="mustUseFeatures"
          value={data.mustUseFeatures || ''}
          onChange={(e) => handleInputChange('mustUseFeatures', e.target.value)}
          placeholder="What features or changes would make this essential for you..."
          rows={3}
        />
      </div>
    </div>
  );
};