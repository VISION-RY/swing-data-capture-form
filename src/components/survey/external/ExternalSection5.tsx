import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection5Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection5 = ({ data, updateData }: ExternalSection5Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Understanding the Data</h3>
      
      <div>
        <Label>How clear were the metrics during hitting? (1=Very Confusing, 5=Very Clear)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.metricsClarity || 3]}
            onValueChange={(value) => handleSliderChange('metricsClarity', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Confusing (1)</span>
            <span>Very Clear (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How useful was the post-session summary? (1=Very Confusing, 5=Very Clear)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.summaryUsefulness || 3]}
            onValueChange={(value) => handleSliderChange('summaryUsefulness', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Confusing (1)</span>
            <span>Very Clear (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How clear were the charts and visuals? (1=Very Confusing, 5=Very Clear)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.chartsClarity || 3]}
            onValueChange={(value) => handleSliderChange('chartsClarity', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Confusing (1)</span>
            <span>Very Clear (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Data Value</h3>
      
      <div>
        <Label htmlFor="understoodMetrics">Did you understand what the metrics meant?</Label>
        <Select value={data.understoodMetrics} onValueChange={(value) => handleInputChange('understoodMetrics', value)}>
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
        <Label htmlFor="showedSurprising">Did the app show you anything surprising?</Label>
        <Select value={data.showedSurprising} onValueChange={(value) => handleInputChange('showedSurprising', value)}>
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
        <Label htmlFor="helpedImprovement">Did the summary help you know what to improve?</Label>
        <Select value={data.helpedImprovement} onValueChange={(value) => handleInputChange('helpedImprovement', value)}>
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
        <Label>How likely are you to review sessions on your own? (1-5 scale)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.reviewLikelihood || 3]}
            onValueChange={(value) => handleSliderChange('reviewLikelihood', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Unlikely (1)</span>
            <span>Very Likely (5)</span>
          </div>
        </div>
      </div>

      <div>
        <Label>How likely are you to share your results? (1-5 scale)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.shareLikelihood || 3]}
            onValueChange={(value) => handleSliderChange('shareLikelihood', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Unlikely (1)</span>
            <span>Very Likely (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Missing Information</h3>
      
      <div>
        <Label htmlFor="missingData">What data did you want that wasn't provided?</Label>
        <Textarea
          id="missingData"
          value={data.missingData || ''}
          onChange={(e) => handleInputChange('missingData', e.target.value)}
          placeholder="Describe any data or metrics you wished were available..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="confusingMetrics">Were any metrics confusing or unclear?</Label>
        <Textarea
          id="confusingMetrics"
          value={data.confusingMetrics || ''}
          onChange={(e) => handleInputChange('confusingMetrics', e.target.value)}
          placeholder="Describe any metrics that were confusing or hard to understand..."
          rows={3}
        />
      </div>
    </div>
  );
};