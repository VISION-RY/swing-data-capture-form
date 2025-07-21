import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection3Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection3 = ({ data, updateData }: ExternalSection3Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">App Navigation</h3>
      
      <div>
        <Label>How easy was it to start a session? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.startSessionEase || 3]}
            onValueChange={(value) => handleSliderChange('startSessionEase', value)}
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
        <Label>How clear were the app instructions? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.instructionClarity || 3]}
            onValueChange={(value) => handleSliderChange('instructionClarity', value)}
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
        <Label>How helpful were the visual indicators? (1=Very Difficult, 5=Very Easy)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.visualIndicatorHelpfulness || 3]}
            onValueChange={(value) => handleSliderChange('visualIndicatorHelpfulness', value)}
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

      <h3 className="text-lg font-semibold pt-4">During Session</h3>
      
      <div>
        <Label htmlFor="knewRecording">Did you know when swings were being recorded?</Label>
        <Select value={data.knewRecording} onValueChange={(value) => handleInputChange('knewRecording', value)}>
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
        <Label htmlFor="checkAppFrequency">How often did you check the app between swings?</Label>
        <Select value={data.checkAppFrequency} onValueChange={(value) => handleInputChange('checkAppFrequency', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="every-swing">Every swing</SelectItem>
            <SelectItem value="every-few-swings">Every few swings</SelectItem>
            <SelectItem value="occasionally">Occasionally</SelectItem>
            <SelectItem value="rarely">Rarely</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="appConfusion">What part of the app confused you? (Optional)</Label>
        <Textarea
          id="appConfusion"
          value={data.appConfusion || ''}
          onChange={(e) => handleInputChange('appConfusion', e.target.value)}
          placeholder="Describe any confusion you experienced with the app..."
          rows={3}
        />
      </div>
    </div>
  );
};