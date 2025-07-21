import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection4Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection4 = ({ data, updateData }: ExternalSection4Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentMetrics = data.attentionMetrics || [];
    if (checked) {
      updateData({ attentionMetrics: [...currentMetrics, value] });
    } else {
      updateData({ attentionMetrics: currentMetrics.filter(m => m !== value) });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Live Performance</h3>
      
      <div>
        <Label>How well did the system keep up with your hitting? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.systemPerformance || 3]}
            onValueChange={(value) => handleSliderChange('systemPerformance', value)}
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
        <Label>How accurate did the metrics feel? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.metricsAccuracy || 3]}
            onValueChange={(value) => handleSliderChange('metricsAccuracy', value)}
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
        <Label>How distracting was the device during hitting? (1=Poor, 5=Excellent)</Label>
        <div className="px-4 py-6">
          <Slider
            value={[data.deviceDistraction || 3]}
            onValueChange={(value) => handleSliderChange('deviceDistraction', value)}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Distracting (1)</span>
            <span>Not Distracting (5)</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Real-Time Feedback</h3>
      
      <div>
        <Label htmlFor="noticeableDelay">Was there noticeable delay between swing and feedback?</Label>
        <Select value={data.noticeableDelay} onValueChange={(value) => handleInputChange('noticeableDelay', value)}>
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
        <Label htmlFor="missedSwings">Did you notice any missed swings?</Label>
        <Select value={data.missedSwings} onValueChange={(value) => handleInputChange('missedSwings', value)}>
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
        <Label htmlFor="metricsAffectedSwing">Did the metrics affect how you swung?</Label>
        <Select value={data.metricsAffectedSwing} onValueChange={(value) => handleInputChange('metricsAffectedSwing', value)}>
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
        <Label>Which metrics did you pay attention to most?</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'Exit velocity',
            'Bat speed',
            'Launch angle',
            'Distance',
            'Spin rate',
            'Other'
          ].map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <Checkbox
                id={metric}
                checked={data.attentionMetrics?.includes(metric) || false}
                onCheckedChange={(checked) => handleCheckboxChange(metric, checked as boolean)}
              />
              <Label htmlFor={metric} className="text-sm">
                {metric}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-4">Experience Description</h3>
      
      <div>
        <Label htmlFor="hittingFeel">How did it feel to use during hitting?</Label>
        <Textarea
          id="hittingFeel"
          value={data.hittingFeel || ''}
          onChange={(e) => handleInputChange('hittingFeel', e.target.value)}
          placeholder="Describe how it felt to use the system while hitting..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="comparisonToNormal">How did this compare to hitting without technology?</Label>
        <Textarea
          id="comparisonToNormal"
          value={data.comparisonToNormal || ''}
          onChange={(e) => handleInputChange('comparisonToNormal', e.target.value)}
          placeholder="Compare your experience to normal hitting sessions..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="madeAdjustments">Did you make swing adjustments based on the data?</Label>
        <Textarea
          id="madeAdjustments"
          value={data.madeAdjustments || ''}
          onChange={(e) => handleInputChange('madeAdjustments', e.target.value)}
          placeholder="Describe any adjustments you made based on the feedback..."
          rows={3}
        />
      </div>
    </div>
  );
};