import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus } from "lucide-react";
import { InternalSurveyData } from "@/types/survey";
import { useState } from "react";

interface InternalSection4Props {
  data: Partial<InternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData>) => void;
}

export const InternalSection4 = ({ data, updateData }: InternalSection4Props) => {
  const [issue2Open, setIssue2Open] = useState(false);
  const [issue3Open, setIssue3Open] = useState(false);
  const [additionalIssues, setAdditionalIssues] = useState<number[]>([]);

  const handleInputChange = (field: keyof InternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof InternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  const addAdditionalIssue = () => {
    const nextIssueNumber = 4 + additionalIssues.length;
    setAdditionalIssues([...additionalIssues, nextIssueNumber]);
  };

  const issueTypes = [
    "Hardware Setup",
    "Software/App Issue",
    "Data Accuracy",
    "User Interface",
    "Performance/Speed",
    "Connectivity",
    "Calibration",
    "User Experience",
    "Documentation",
    "Other"
  ];

  const issuePriorities = [
    "Critical",
    "High",
    "Medium", 
    "Low"
  ];

  const issueImpacts = [
    "Blocks core functionality",
    "Degrades user experience",
    "Minor inconvenience",
    "Cosmetic issue"
  ];

  const resolutionUrgencies = [
    "Immediate (before next session)",
    "This week",
    "Next sprint",
    "Future release"
  ];

  const renderIssueSection = (issueNumber: number) => {
    const issueKey = `issue${issueNumber}` as const;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${issueKey}Type`}>Issue Type</Label>
            <Select
              value={data[`${issueKey}Type` as keyof InternalSurveyData] as string || ""}
              onValueChange={(value) => handleInputChange(`${issueKey}Type` as keyof InternalSurveyData, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace(/[\/\s]/g, '-')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${issueKey}Priority`}>Priority</Label>
            <Select
              value={data[`${issueKey}Priority` as keyof InternalSurveyData] as string || ""}
              onValueChange={(value) => handleInputChange(`${issueKey}Priority` as keyof InternalSurveyData, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {issuePriorities.map((priority) => (
                  <SelectItem key={priority} value={priority.toLowerCase()}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${issueKey}Impact`}>Impact</Label>
            <Select
              value={data[`${issueKey}Impact` as keyof InternalSurveyData] as string || ""}
              onValueChange={(value) => handleInputChange(`${issueKey}Impact` as keyof InternalSurveyData, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select impact" />
              </SelectTrigger>
              <SelectContent>
                {issueImpacts.map((impact) => (
                  <SelectItem key={impact} value={impact.toLowerCase().replace(/\s/g, '-')}>
                    {impact}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${issueKey}Urgency`}>Resolution Urgency</Label>
            <Select
              value={data[`${issueKey}Urgency` as keyof InternalSurveyData] as string || ""}
              onValueChange={(value) => handleInputChange(`${issueKey}Urgency` as keyof InternalSurveyData, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                {resolutionUrgencies.map((urgency) => (
                  <SelectItem key={urgency} value={urgency.toLowerCase().replace(/[()]/g, '').replace(/\s/g, '-')}>
                    {urgency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${issueKey}Description`}>Detailed Description</Label>
          <Textarea
            id={`${issueKey}Description`}
            placeholder="Describe the issue in detail, including steps to reproduce, expected vs actual behavior, and any workarounds discovered..."
            value={data[`${issueKey}Description` as keyof InternalSurveyData] as string || ""}
            onChange={(e) => handleInputChange(`${issueKey}Description` as keyof InternalSurveyData, e.target.value)}
            rows={3}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">User Engagement</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timeToFirstSwing">Time to first swing (minutes)</Label>
            <Input
              id="timeToFirstSwing"
              type="number"
              step="0.5"
              value={data.timeToFirstSwing || ''}
              onChange={(e) => handleInputChange('timeToFirstSwing', e.target.value)}
              placeholder="e.g., 5.5"
            />
          </div>

          <div className="space-y-2">
            <Label>User Excitement Level (1=Not engaged, 5=Very excited)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.userExcitementLevel || 3]}
                onValueChange={(value) => handleSliderChange('userExcitementLevel', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not engaged (1)</span>
                <span>Very excited (5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frustrationMoments">Frustration moments observed</Label>
            <Textarea
              id="frustrationMoments"
              placeholder="Describe any moments where the user showed frustration, confusion, or difficulty..."
              value={data.frustrationMoments || ''}
              onChange={(e) => handleInputChange('frustrationMoments', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakthroughMoments">"Aha!" or breakthrough moments</Label>
            <Textarea
              id="breakthroughMoments"
              placeholder="Describe any moments where the user had a positive realization or breakthrough understanding..."
              value={data.breakthroughMoments || ''}
              onChange={(e) => handleInputChange('breakthroughMoments', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Learning Curve Rating (1=Very steep, 5=Very easy)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.learningCurveRating || 3]}
                onValueChange={(value) => handleSliderChange('learningCurveRating', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Very steep (1)</span>
                <span>Very easy (5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featureAdoptionRate">Feature adoption rate (%)</Label>
            <Input
              id="featureAdoptionRate"
              type="number"
              min="0"
              max="100"
              value={data.featureAdoptionRate || ''}
              onChange={(e) => handleInputChange('featureAdoptionRate', e.target.value)}
              placeholder="e.g., 75 (percentage of features user attempted to use)"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Issues Encountered</h3>
        
        {/* Issue 1 - Always visible */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-4">Issue #1</h4>
          {renderIssueSection(1)}
        </div>

        {/* Issue 2 - Collapsible */}
        <Collapsible open={issue2Open} onOpenChange={setIssue2Open}>
          <div className="border rounded-lg">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <span className="font-medium">Issue #2</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${issue2Open ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0">
              {renderIssueSection(2)}
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Issue 3 - Collapsible */}
        <Collapsible open={issue3Open} onOpenChange={setIssue3Open}>
          <div className="border rounded-lg">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <span className="font-medium">Issue #3</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${issue3Open ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0">
              {renderIssueSection(3)}
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Additional Issues */}
        {additionalIssues.map((issueNumber) => (
          <div key={issueNumber} className="border rounded-lg p-4">
            <h4 className="font-medium mb-4">Issue #{issueNumber}</h4>
            {renderIssueSection(issueNumber)}
          </div>
        ))}

        {/* Add More Issues Button */}
        <Button 
          type="button" 
          variant="outline" 
          onClick={addAdditionalIssue}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Issue
        </Button>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Success Criteria Assessment</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coreFeatureFunctionality">Core feature functionality</Label>
            <Select
              value={data.coreFeatureFunctionality || ""}
              onValueChange={(value) => handleInputChange('coreFeatureFunctionality', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select functionality level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fully-functional">Fully functional</SelectItem>
                <SelectItem value="mostly-functional">Mostly functional</SelectItem>
                <SelectItem value="partially-functional">Partially functional</SelectItem>
                <SelectItem value="not-functional">Not functional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data visualization clarity (1=Unclear, 5=Very clear)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.dataVisualizationClarity || 3]}
                onValueChange={(value) => handleSliderChange('dataVisualizationClarity', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Unclear (1)</span>
                <span>Very clear (5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportGenerationSuccess">Report generation success</Label>
            <Select
              value={data.reportGenerationSuccess || ""}
              onValueChange={(value) => handleInputChange('reportGenerationSuccess', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select success level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="mostly-successful">Mostly successful</SelectItem>
                <SelectItem value="partially-successful">Partially successful</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userTaskCompletionRate">User task completion rate (%)</Label>
            <Input
              id="userTaskCompletionRate"
              type="number"
              min="0"
              max="100"
              value={data.userTaskCompletionRate || ''}
              onChange={(e) => handleInputChange('userTaskCompletionRate', e.target.value)}
              placeholder="e.g., 80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="errorRecoverySuccess">Error recovery success</Label>
            <Select
              value={data.errorRecoverySuccess || ""}
              onValueChange={(value) => handleInputChange('errorRecoverySuccess', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recovery level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Documentation effectiveness (1=Not helpful, 5=Very helpful)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.documentationEffectiveness || 3]}
                onValueChange={(value) => handleSliderChange('documentationEffectiveness', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not helpful (1)</span>
                <span>Very helpful (5)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="successMoments">Success moments and positive feedback</Label>
          <Textarea
            id="successMoments"
            placeholder="Describe successful interactions, positive user reactions, or features that worked particularly well..."
            value={data.successMoments || ''}
            onChange={(e) => handleInputChange('successMoments', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Overall Session Assessment</h3>
        
        <div className="space-y-2">
          <Label htmlFor="sessionSuccessRating">Session Success Rating (1-10)</Label>
          <Select
            value={data.sessionSuccessRating || ""}
            onValueChange={(value) => handleInputChange('sessionSuccessRating', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testingGoalsMet">Were the testing goals met?</Label>
          <Select
            value={data.testingGoalsMet || ""}
            onValueChange={(value) => handleInputChange('testingGoalsMet', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fully">Fully Met</SelectItem>
              <SelectItem value="mostly">Mostly Met</SelectItem>
              <SelectItem value="partially">Partially Met</SelectItem>
              <SelectItem value="not-met">Not Met</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userEngagementLevel">User Engagement Level</Label>
          <Select
            value={data.userEngagementLevel || ""}
            onValueChange={(value) => handleInputChange('userEngagementLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="disengaged">Disengaged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="systemStability">System Stability During Session</Label>
          <Select
            value={data.systemStability || ""}
            onValueChange={(value) => handleInputChange('systemStability', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Overall satisfaction score (1-10)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.overallSatisfactionScore || 5]}
              onValueChange={(value) => handleSliderChange('overallSatisfactionScore', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Recommendation likelihood (1-10)</Label>
          <div className="px-4 py-6">
            <Slider
              value={[data.recommendationLikelihood || 5]}
              onValueChange={(value) => handleSliderChange('recommendationLikelihood', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Not likely (1)</span>
              <span>Very likely (10)</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketReadinessAssessment">Market readiness assessment</Label>
          <Select
            value={data.marketReadinessAssessment || ""}
            onValueChange={(value) => handleInputChange('marketReadinessAssessment', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select readiness level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ready-for-launch">Ready for launch</SelectItem>
              <SelectItem value="minor-fixes-needed">Minor fixes needed</SelectItem>
              <SelectItem value="major-improvements-needed">Major improvements needed</SelectItem>
              <SelectItem value="not-ready">Not ready for market</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorityFixes">Priority fixes needed for next testing session</Label>
          <Textarea
            id="priorityFixes"
            placeholder="List the most important fixes or improvements needed based on this session..."
            value={data.priorityFixes || ''}
            onChange={(e) => handleInputChange('priorityFixes', e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};