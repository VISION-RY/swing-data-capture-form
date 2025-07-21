import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection8Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection8 = ({ data, updateData }: ExternalSection8Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Competitive Comparison</h3>
      <p className="text-muted-foreground">
        Since you have experience with other launch monitor systems, please compare this system to others you've used.
      </p>
      
      <div>
        <Label>Ease of setup compared to other systems (1=Much Worse, 3=About the Same, 5=Much Better)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.setupComparison || 3]}
            onValueChange={(value) => handleSliderChange('setupComparison', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Much Worse (1)</span>
            <span>About Same (3)</span>
            <span>Much Better (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Data accuracy compared to other systems (1=Much Worse, 3=About the Same, 5=Much Better)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.accuracyComparison || 3]}
            onValueChange={(value) => handleSliderChange('accuracyComparison', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Much Worse (1)</span>
            <span>About Same (3)</span>
            <span>Much Better (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>App experience compared to other systems (1=Much Worse, 3=About the Same, 5=Much Better)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.appComparison || 3]}
            onValueChange={(value) => handleSliderChange('appComparison', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Much Worse (1)</span>
            <span>About Same (3)</span>
            <span>Much Better (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Value for money compared to other systems (1=Much Worse, 3=About the Same, 5=Much Better)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.valueComparison || 3]}
            onValueChange={(value) => handleSliderChange('valueComparison', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Much Worse (1)</span>
            <span>About Same (3)</span>
            <span>Much Better (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Overall experience compared to other systems (1=Much Worse, 3=About the Same, 5=Much Better)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.overallComparison || 3]}
            onValueChange={(value) => handleSliderChange('overallComparison', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Much Worse (1)</span>
            <span>About Same (3)</span>
            <span>Much Better (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Specific Comparisons</h3>
      
      <div>
        <Label htmlFor="betterFeatures">What does this do better than other systems?</Label>
        <Textarea
          id="betterFeatures"
          value={data.betterFeatures || ''}
          onChange={(e) => handleInputChange('betterFeatures', e.target.value)}
          placeholder="Describe what this system does better than others you've used..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="otherSystemsBetter">What do other systems do better?</Label>
        <Textarea
          id="otherSystemsBetter"
          value={data.otherSystemsBetter || ''}
          onChange={(e) => handleInputChange('otherSystemsBetter', e.target.value)}
          placeholder="Describe what other systems do better than this one..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="trainingApproachChange">How does this change your training approach?</Label>
        <Textarea
          id="trainingApproachChange"
          value={data.trainingApproachChange || ''}
          onChange={(e) => handleInputChange('trainingApproachChange', e.target.value)}
          placeholder="Describe how this system would change your training approach compared to others..."
          rows={3}
        />
      </div>
    </div>
  );
};