import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InternalSurveyData } from "@/types/survey";

interface InternalSection2Props {
  data: Partial<InternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData>) => void;
}

export const InternalSection2 = ({ data, updateData }: InternalSection2Props) => {
  const handleInputChange = (field: keyof InternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="primaryUserType">Primary User Type</Label>
          <Select value={data.primaryUserType} onValueChange={(value) => handleInputChange('primaryUserType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual-player">Individual player</SelectItem>
              <SelectItem value="player-parent">Player + parent</SelectItem>
              <SelectItem value="player-coach">Player + coach</SelectItem>
              <SelectItem value="coach-only">Coach only</SelectItem>
              <SelectItem value="multiple-players-coach">Multiple players + coach</SelectItem>
              <SelectItem value="facility-staff">Facility staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="userExperienceLevel">User Experience Level</Label>
          <Select value={data.userExperienceLevel} onValueChange={(value) => handleInputChange('userExperienceLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select user experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-time-launch-monitor">First time using any launch monitor</SelectItem>
              <SelectItem value="used-other-monitors">Used other launch monitors before</SelectItem>
              <SelectItem value="tech-savvy">Tech-savvy user</SelectItem>
              <SelectItem value="non-tech-savvy">Non-tech-savvy user</SelectItem>
              <SelectItem value="mixed-group">Mixed group (various levels)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sessionType">Session Type</Label>
          <Select value={data.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supervised-demo">Supervised demo/instruction</SelectItem>
              <SelectItem value="independent-use">Independent use (minimal guidance)</SelectItem>
              <SelectItem value="comparative-testing">Comparative testing (vs other tech)</SelectItem>
              <SelectItem value="high-volume-testing">High-volume testing (multiple users)</SelectItem>
              <SelectItem value="quick-setup-breakdown">Quick setup/breakdown test</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};