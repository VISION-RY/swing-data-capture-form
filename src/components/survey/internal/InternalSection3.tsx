import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { InternalSurveyData } from "@/types/survey";

interface InternalSection3Props {
  data: Partial<InternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData>) => void;
}

export const InternalSection3 = ({ data, updateData }: InternalSection3Props) => {
  const handleInputChange = (field: keyof InternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof InternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  return (
    <div className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Setup Process</h3>
          
          <div className="space-y-2">
            <Label htmlFor="watchedTutorial">Did the user watch the setup tutorial video(s)?</Label>
            <Select
              value={data.watchedTutorial || ""}
              onValueChange={(value) => handleInputChange('watchedTutorial', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="partial">Partially</SelectItem>
              </SelectContent>
            </Select>
          </div>
        
        <div>
          <Label>Setup Speed (1=Poor, 5=Excellent)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.setupSpeed || 3]}
              onValueChange={(value) => handleSliderChange('setupSpeed', value)}
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
          <Label>User Confusion Level (1=Very confused, 5=No confusion)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.userConfusionLevel || 3]}
              onValueChange={(value) => handleSliderChange('userConfusionLevel', value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Very confused (1)</span>
              <span>No confusion (5)</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="requiredAssistance">Required Assistance</Label>
          <Select value={data.requiredAssistance} onValueChange={(value) => handleInputChange('requiredAssistance', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select assistance level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="significant">Significant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="calibrationSuccess">Calibration Success</Label>
          <Select value={data.calibrationSuccess} onValueChange={(value) => handleInputChange('calibrationSuccess', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select calibration result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-try">First try</SelectItem>
              <SelectItem value="2-3-attempts">2-3 attempts</SelectItem>
              <SelectItem value="multiple-attempts">Multiple attempts</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="setupTimeMinutes">Total setup time (minutes)</Label>
            <Input
              id="setupTimeMinutes"
              type="number"
              step="0.5"
              value={data.setupTimeMinutes || ''}
              onChange={(e) => handleInputChange('setupTimeMinutes', e.target.value)}
              placeholder="e.g., 15.5"
            />
          </div>
          <div>
            <Label htmlFor="calibrationAttempts">Number of calibration attempts</Label>
            <Input
              id="calibrationAttempts"
              type="number"
              value={data.calibrationAttempts || ''}
              onChange={(e) => handleInputChange('calibrationAttempts', e.target.value)}
              placeholder="e.g., 3"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold pt-4">Live Performance Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="missedSwings">Missed swings observed</Label>
            <Input
              id="missedSwings"
              type="number"
              value={data.missedSwings || ''}
              onChange={(e) => handleInputChange('missedSwings', e.target.value)}
              placeholder="Number of missed swings"
            />
          </div>
          <div>
            <Label htmlFor="totalSwings">Total swings</Label>
            <Input
              id="totalSwings"
              type="number"
              value={data.totalSwings || ''}
              onChange={(e) => handleInputChange('totalSwings', e.target.value)}
              placeholder="Total number of swings"
            />
          </div>
          <div>
            <Label htmlFor="falseTriggers">False triggers observed</Label>
            <Input
              id="falseTriggers"
              type="number"
              value={data.falseTriggers || ''}
              onChange={(e) => handleInputChange('falseTriggers', e.target.value)}
              placeholder="Number of false triggers"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lagDelayIssues">Lag/delay issues</Label>
          <Select value={data.lagDelayIssues} onValueChange={(value) => handleInputChange('lagDelayIssues', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select lag/delay frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="occasional">Occasional</SelectItem>
              <SelectItem value="frequent">Frequent</SelectItem>
              <SelectItem value="constant">Constant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="lagDelayTimingSeconds">Lag/delay timing (seconds)</Label>
          <Input
            id="lagDelayTimingSeconds"
            type="number"
            step="0.1"
            value={data.lagDelayTimingSeconds || ''}
            onChange={(e) => handleInputChange('lagDelayTimingSeconds', e.target.value)}
            placeholder="Enter delay time in seconds (e.g., 0.5, 1.2)"
          />
        </div>

        <div>
          <Label htmlFor="dataAccuracyConcerns">Data accuracy concerns</Label>
          <Select value={data.dataAccuracyConcerns} onValueChange={(value) => handleInputChange('dataAccuracyConcerns', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select data accuracy assessment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="uncertain">Uncertain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="detectionAccuracyPercent">Detection accuracy (%)</Label>
            <Input
              id="detectionAccuracyPercent"
              type="number"
              min="0"
              max="100"
              value={data.detectionAccuracyPercent || ''}
              onChange={(e) => handleInputChange('detectionAccuracyPercent', e.target.value)}
              placeholder="e.g., 85"
            />
          </div>
          <div>
            <Label htmlFor="responseTimeConsistency">Response time consistency</Label>
            <Select value={data.responseTimeConsistency} onValueChange={(value) => handleInputChange('responseTimeConsistency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select consistency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-consistent">Very consistent</SelectItem>
                <SelectItem value="mostly-consistent">Mostly consistent</SelectItem>
                <SelectItem value="somewhat-inconsistent">Somewhat inconsistent</SelectItem>
                <SelectItem value="very-inconsistent">Very inconsistent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="measurementReliability">Measurement reliability</Label>
            <Select value={data.measurementReliability} onValueChange={(value) => handleInputChange('measurementReliability', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select reliability level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highly-reliable">Highly reliable</SelectItem>
                <SelectItem value="reliable">Reliable</SelectItem>
                <SelectItem value="somewhat-reliable">Somewhat reliable</SelectItem>
                <SelectItem value="unreliable">Unreliable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <h3 className="text-lg font-semibold pt-4">App Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="appCrashes">App crashes/freezes</Label>
            <Input
              id="appCrashes"
              type="number"
              value={data.appCrashes || ''}
              onChange={(e) => handleInputChange('appCrashes', e.target.value)}
              placeholder="Number of crashes/freezes"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="connectivityIssues">Connectivity issues</Label>
            <Select value={data.connectivityIssues} onValueChange={(value) => handleInputChange('connectivityIssues', value)}>
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
            <Label htmlFor="dataSyncProblems">Data sync problems</Label>
            <Select value={data.dataSyncProblems} onValueChange={(value) => handleInputChange('dataSyncProblems', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Yes/No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>User Interface Confusion (1=Very confused, 5=Intuitive)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.uiConfusion || 3]}
              onValueChange={(value) => handleSliderChange('uiConfusion', value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Very confused (1)</span>
              <span>Intuitive (5)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="appResponseTime">App response time assessment</Label>
            <Select value={data.appResponseTime} onValueChange={(value) => handleInputChange('appResponseTime', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select response time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent (instant)</SelectItem>
                <SelectItem value="good">Good (&lt; 1 second)</SelectItem>
                <SelectItem value="acceptable">Acceptable (1-3 seconds)</SelectItem>
                <SelectItem value="slow">Slow (&gt; 3 seconds)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Feature Discoverability (1=Hard to find, 5=Easy to find)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.featureDiscoverability || 3]}
              onValueChange={(value) => handleSliderChange('featureDiscoverability', value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Hard to find (1)</span>
              <span>Easy to find (5)</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Navigation Ease (1=Difficult, 5=Very easy)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.navigationEase || 3]}
              onValueChange={(value) => handleSliderChange('navigationEase', value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Difficult (1)</span>
              <span>Very easy (5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};