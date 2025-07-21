import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ExternalSurveyData } from "@/types/survey";

interface ExternalSection7Props {
  data: Partial<ExternalSurveyData>;
  updateData: (data: Partial<ExternalSurveyData>) => void;
}

export const ExternalSection7 = ({ data, updateData }: ExternalSection7Props) => {
  const handleInputChange = (field: keyof ExternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleSliderChange = (field: keyof ExternalSurveyData, value: number[]) => {
    updateData({ [field]: value[0] });
  };

  const isPlayer = data.userRole?.startsWith('player');
  const isParent = data.userRole === 'parent';
  const isCoach = data.userRole?.startsWith('coach');
  const isFacilityOwner = data.userRole === 'facility-owner';

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Role-Specific Questions</h3>
      
      {isPlayer && (
        <div className="space-y-4">
          <h4 className="font-medium">For Players</h4>
          
          <div>
            <Label>How motivating was the personal data tracking? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.personalDataMotivation || 3]}
                onValueChange={(value) => handleSliderChange('personalDataMotivation', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Motivating (1)</span>
                <span>Very Motivating (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="comparisonToOtherTools">How does this compare to other training tools you've used?</Label>
            <Textarea
              id="comparisonToOtherTools"
              value={data.comparisonToOtherTools || ''}
              onChange={(e) => handleInputChange('comparisonToOtherTools', e.target.value)}
              placeholder="Compare this system to other training tools you've used..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="regularUseConvincer">What would convince you to use this regularly?</Label>
            <Textarea
              id="regularUseConvincer"
              value={data.regularUseConvincer || ''}
              onChange={(e) => handleInputChange('regularUseConvincer', e.target.value)}
              placeholder="What factors would make you want to use this system regularly..."
              rows={3}
            />
          </div>
        </div>
      )}

      {isParent && (
        <div className="space-y-4">
          <h4 className="font-medium">For Parents</h4>
          
          <div>
            <Label>How cost-effective does this seem for family use? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.costEffectiveness || 3]}
                onValueChange={(value) => handleSliderChange('costEffectiveness', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Cost-Effective (1)</span>
                <span>Very Cost-Effective (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label>How easy would this be for your child to use independently? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.childIndependentUse || 3]}
                onValueChange={(value) => handleSliderChange('childIndependentUse', value)}
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
            <Label htmlFor="developmentValue">What value would this add to your child's development?</Label>
            <Textarea
              id="developmentValue"
              value={data.developmentValue || ''}
              onChange={(e) => handleInputChange('developmentValue', e.target.value)}
              placeholder="Describe how this system could help your child's development..."
              rows={3}
            />
          </div>
        </div>
      )}

      {isCoach && (
        <div className="space-y-4">
          <h4 className="font-medium">For Coaches</h4>
          
          <div>
            <Label>How useful would this be for team management? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.teamManagementUsefulness || 3]}
                onValueChange={(value) => handleSliderChange('teamManagementUsefulness', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Useful (1)</span>
                <span>Very Useful (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label>How well would this integrate with your coaching workflow? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.workflowIntegration || 3]}
                onValueChange={(value) => handleSliderChange('workflowIntegration', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Poor Integration (1)</span>
                <span>Perfect Integration (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label>How valuable would this be for player development tracking? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.playerDevelopmentValue || 3]}
                onValueChange={(value) => handleSliderChange('playerDevelopmentValue', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Valuable (1)</span>
                <span>Very Valuable (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="teamFeatures">What features would you need for team use?</Label>
            <Textarea
              id="teamFeatures"
              value={data.teamFeatures || ''}
              onChange={(e) => handleInputChange('teamFeatures', e.target.value)}
              placeholder="Describe features that would be important for coaching a team..."
              rows={3}
            />
          </div>
        </div>
      )}

      {isFacilityOwner && (
        <div className="space-y-4">
          <h4 className="font-medium">For Facility Owners</h4>
          
          <div>
            <Label>How valuable would this be for attracting clients? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.clientAttraction || 3]}
                onValueChange={(value) => handleSliderChange('clientAttraction', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Valuable (1)</span>
                <span>Very Valuable (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label>How well would this handle high-volume use? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.highVolumeHandling || 3]}
                onValueChange={(value) => handleSliderChange('highVolumeHandling', value)}
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
            <Label>How durable does this system appear? (1-5 scale)</Label>
            <div className="px-4 py-6">
              <Slider
                value={[data.systemDurability || 3]}
                onValueChange={(value) => handleSliderChange('systemDurability', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Durable (1)</span>
                <span>Very Durable (5)</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="operationalBenefits">What operational benefits would this provide?</Label>
            <Textarea
              id="operationalBenefits"
              value={data.operationalBenefits || ''}
              onChange={(e) => handleInputChange('operationalBenefits', e.target.value)}
              placeholder="Describe operational benefits for your facility..."
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  );
};