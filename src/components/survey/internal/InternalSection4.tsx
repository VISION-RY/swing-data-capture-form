import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { InternalSurveyData } from "@/types/survey";

interface InternalSection4Props {
  data: Partial<InternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData>) => void;
}

export const InternalSection4 = ({ data, updateData }: InternalSection4Props) => {
  const handleInputChange = (field: keyof InternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof InternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  const issueTypes = [
    "Hardware malfunction",
    "Software/app crash",
    "Data accuracy problem",
    "User interface confusion",
    "Setup difficulty",
    "Calibration failure",
    "Connectivity issue",
    "Performance lag",
    "Safety concern",
    "Documentation unclear",
    "Other"
  ];

  const issuePriorities = [
    "Blocker - Prevents basic functionality",
    "Critical - Major feature doesn't work",
    "High - Important feature impaired",
    "Medium - Minor functionality issue",
    "Low - Cosmetic or enhancement"
  ];

  const issueImpacts = [
    "Affects all users",
    "Affects specific persona only",
    "Affects specific environment only",
    "Affects first-time users only",
    "Affects experienced users only"
  ];

  const resolutionUrgencies = [
    "Fix before any further testing",
    "Fix before launch",
    "Fix in post-launch update",
    "Consider for future version",
    "No fix needed"
  ];

  const renderIssueSection = (issueNumber: number) => {
    const issueFields = {
      1: {
        type: 'issue1Type',
        priority: 'issue1Priority',
        impact: 'issue1Impact',
        urgency: 'issue1Urgency',
        description: 'issue1Description'
      },
      2: {
        type: 'issue2Type',
        priority: 'issue2Priority',
        impact: 'issue2Impact',
        urgency: 'issue2Urgency',
        description: 'issue2Description'
      },
      3: {
        type: 'issue3Type',
        priority: 'issue3Priority',
        impact: 'issue3Impact',
        urgency: 'issue3Urgency',
        description: 'issue3Description'
      }
    };

    const fields = issueFields[issueNumber as keyof typeof issueFields];

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-semibold">Issue #{issueNumber}</h4>
        
        <div>
          <Label>Issue Type</Label>
          <Select 
            value={data[fields.type as keyof InternalSurveyData] as string} 
            onValueChange={(value) => handleInputChange(fields.type as keyof InternalSurveyData, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent>
              {issueTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Issue Priority</Label>
          <Select 
            value={data[fields.priority as keyof InternalSurveyData] as string} 
            onValueChange={(value) => handleInputChange(fields.priority as keyof InternalSurveyData, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue priority" />
            </SelectTrigger>
            <SelectContent>
              {issuePriorities.map(priority => (
                <SelectItem key={priority} value={priority.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Issue Impact</Label>
          <Select 
            value={data[fields.impact as keyof InternalSurveyData] as string} 
            onValueChange={(value) => handleInputChange(fields.impact as keyof InternalSurveyData, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue impact" />
            </SelectTrigger>
            <SelectContent>
              {issueImpacts.map(impact => (
                <SelectItem key={impact} value={impact.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {impact}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Resolution Urgency</Label>
          <Select 
            value={data[fields.urgency as keyof InternalSurveyData] as string} 
            onValueChange={(value) => handleInputChange(fields.urgency as keyof InternalSurveyData, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select resolution urgency" />
            </SelectTrigger>
            <SelectContent>
              {resolutionUrgencies.map(urgency => (
                <SelectItem key={urgency} value={urgency.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {urgency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Issue Description</Label>
          <Textarea
            value={data[fields.description as keyof InternalSurveyData] as string || ''}
            onChange={(e) => handleInputChange(fields.description as keyof InternalSurveyData, e.target.value)}
            placeholder="Describe the issue in detail..."
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
        
        <div>
          <Label htmlFor="timeToFirstSwing">Time to first successful swing (minutes)</Label>
          <Input
            id="timeToFirstSwing"
            type="number"
            value={data.timeToFirstSwing || ''}
            onChange={(e) => handleInputChange('timeToFirstSwing', e.target.value)}
            placeholder="Enter time in minutes"
          />
        </div>

        <div>
          <Label>User Excitement Level (1-5 scale)</Label>
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
              <span>Low (1)</span>
              <span>High (5)</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="frustrationMoments">Frustration Moments</Label>
          <Textarea
            id="frustrationMoments"
            value={data.frustrationMoments || ''}
            onChange={(e) => handleInputChange('frustrationMoments', e.target.value)}
            placeholder="Describe any moments of user frustration..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="breakthroughMoments">Breakthrough Moments</Label>
          <Textarea
            id="breakthroughMoments"
            value={data.breakthroughMoments || ''}
            onChange={(e) => handleInputChange('breakthroughMoments', e.target.value)}
            placeholder="Describe any breakthrough or 'aha' moments..."
            rows={3}
          />
        </div>

        <h3 className="text-lg font-semibold pt-4">Critical Issues Observed</h3>
        
        {[1, 2, 3].map(issueNumber => renderIssueSection(issueNumber))}

        <div>
          <Label htmlFor="successMoments">Success Moments</Label>
          <Textarea
            id="successMoments"
            value={data.successMoments || ''}
            onChange={(e) => handleInputChange('successMoments', e.target.value)}
            placeholder="What worked exceptionally well, user 'wow' moments, smooth workflow areas..."
            rows={4}
          />
        </div>

        <h3 className="text-lg font-semibold pt-4">Overall Session Assessment</h3>
        
        <div>
          <Label htmlFor="wouldUserPurchase">Would this user purchase the system?</Label>
          <Select value={data.wouldUserPurchase} onValueChange={(value) => handleInputChange('wouldUserPurchase', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select purchase likelihood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="definitely">Definitely</SelectItem>
              <SelectItem value="probably">Probably</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
              <SelectItem value="probably-not">Probably not</SelectItem>
              <SelectItem value="definitely-not">Definitely not</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="readyForMarket">Ready for market release?</Label>
          <Select value={data.readyForMarket} onValueChange={(value) => handleInputChange('readyForMarket', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select market readiness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes-ready-now">Yes - ready now</SelectItem>
              <SelectItem value="yes-minor-fixes">Yes with minor fixes</SelectItem>
              <SelectItem value="no-significant-work">No - needs significant work</SelectItem>
              <SelectItem value="no-major-redesign">No - major redesign needed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sessionSuccessRating">Session Success Rating</Label>
          <Select value={data.sessionSuccessRating} onValueChange={(value) => handleInputChange('sessionSuccessRating', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select session success rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exceeded-expectations">Exceeded expectations</SelectItem>
              <SelectItem value="met-expectations">Met expectations</SelectItem>
              <SelectItem value="below-expectations">Below expectations</SelectItem>
              <SelectItem value="failed-basic-requirements">Failed to meet basic requirements</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="userAdoptionLikelihood">User Adoption Likelihood</Label>
          <Select value={data.userAdoptionLikelihood} onValueChange={(value) => handleInputChange('userAdoptionLikelihood', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select adoption likelihood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High - will definitely adopt</SelectItem>
              <SelectItem value="medium">Medium - likely to adopt</SelectItem>
              <SelectItem value="low">Low - unlikely to adopt</SelectItem>
              <SelectItem value="very-low">Very low - will not adopt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priorityFixes">Priority Fixes Needed</Label>
          <Textarea
            id="priorityFixes"
            value={data.priorityFixes || ''}
            onChange={(e) => handleInputChange('priorityFixes', e.target.value)}
            placeholder="List the most critical fixes needed before launch..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};