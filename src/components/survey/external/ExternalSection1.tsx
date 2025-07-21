import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection1Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection1 = ({ data, updateData }: ExternalSection1Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="userRole">Your Role</Label>
          <Select value={data.userRole} onValueChange={(value) => handleInputChange('userRole', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="player-youth">Player (youth)</SelectItem>
              <SelectItem value="player-high-school">Player (high school)</SelectItem>
              <SelectItem value="player-college">Player (college)</SelectItem>
              <SelectItem value="player-adult">Player (adult/recreational)</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="coach-youth">Coach (youth/travel)</SelectItem>
              <SelectItem value="coach-high-school">Coach (high school)</SelectItem>
              <SelectItem value="coach-college">Coach (college)</SelectItem>
              <SelectItem value="facility-owner">Facility owner/operator</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="techExperience">Experience with Technology</Label>
          <Select value={data.techExperience} onValueChange={(value) => handleInputChange('techExperience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your tech comfort level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very-comfortable">Very comfortable with new tech</SelectItem>
              <SelectItem value="somewhat-comfortable">Somewhat comfortable with tech</SelectItem>
              <SelectItem value="not-very-comfortable">Not very comfortable with tech</SelectItem>
              <SelectItem value="prefer-simple">Prefer simple, basic tech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="launchMonitorExperience">Previous Launch Monitor Experience</Label>
          <Select value={data.launchMonitorExperience} onValueChange={(value) => handleInputChange('launchMonitorExperience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your launch monitor experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never-used">Never used one before</SelectItem>
              <SelectItem value="used-trackman">Used TrackMan</SelectItem>
              <SelectItem value="used-rapsodo">Used Rapsodo</SelectItem>
              <SelectItem value="used-hittrax">Used HitTrax</SelectItem>
              <SelectItem value="used-other">Used other systems</SelectItem>
              <SelectItem value="used-multiple">Used multiple systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};