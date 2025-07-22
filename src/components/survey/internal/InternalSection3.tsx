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
      </div>
    </div>
  );
};