import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InternalSurveyData } from "@/types/survey";

interface InternalSection1Props {
  data: Partial<InternalSurveyData>;
  updateData: (data: Partial<InternalSurveyData>) => void;
}

export const InternalSection1 = ({ data, updateData }: InternalSection1Props) => {
  const handleInputChange = (field: keyof InternalSurveyData, value: string) => {
    updateData({ [field]: value });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentFactors = data.environmentalFactors || [];
    if (checked) {
      updateData({ environmentalFactors: [...currentFactors, value] });
    } else {
      updateData({ environmentalFactors: currentFactors.filter(f => f !== value) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="testingLocationType">Testing Location Type</Label>
          <Select value={data.testingLocationType} onValueChange={(value) => handleInputChange('testingLocationType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select testing location type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indoor-batting-cage">Indoor batting cage</SelectItem>
              <SelectItem value="indoor-facility-open">Indoor facility (open)</SelectItem>
              <SelectItem value="outdoor-field">Outdoor field</SelectItem>
              <SelectItem value="backyard-home-setup">Backyard/home setup</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cageWidth">Cage Width (feet)</Label>
            <Input
              id="cageWidth"
              type="number"
              value={data.cageWidth || ''}
              onChange={(e) => handleInputChange('cageWidth', e.target.value)}
              placeholder="Enter width in feet"
            />
          </div>
          <div>
            <Label htmlFor="distanceToFrontNet">Distance from plate to front net/screen (feet)</Label>
            <Input
              id="distanceToFrontNet"
              type="number"
              value={data.distanceToFrontNet || ''}
              onChange={(e) => handleInputChange('distanceToFrontNet', e.target.value)}
              placeholder="Enter distance in feet"
            />
          </div>
          <div>
            <Label htmlFor="distanceBehindPlate">Distance behind home plate (feet)</Label>
            <Input
              id="distanceBehindPlate"
              type="number"
              value={data.distanceBehindPlate || ''}
              onChange={(e) => handleInputChange('distanceBehindPlate', e.target.value)}
              placeholder="Enter distance in feet"
            />
          </div>
          <div>
            <Label htmlFor="ceilingHeight">Ceiling height (if indoor) (feet)</Label>
            <Input
              id="ceilingHeight"
              type="number"
              value={data.ceilingHeight || ''}
              onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
              placeholder="Enter height in feet"
            />
          </div>
          <div>
            <Label htmlFor="totalUsableSpace">Total usable space length (feet)</Label>
            <Input
              id="totalUsableSpace"
              type="number"
              value={data.totalUsableSpace || ''}
              onChange={(e) => handleInputChange('totalUsableSpace', e.target.value)}
              placeholder="Enter total length in feet"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lightingConditions">Lighting Conditions</Label>
          <Select value={data.lightingConditions} onValueChange={(value) => handleInputChange('lightingConditions', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select lighting conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-lighting">Low lighting</SelectItem>
              <SelectItem value="medium-lighting">Medium lighting</SelectItem>
              <SelectItem value="bright-lighting">Bright lighting</SelectItem>
              <SelectItem value="artificial-only">Artificial lighting only</SelectItem>
              <SelectItem value="natural-only">Natural lighting only</SelectItem>
              <SelectItem value="mixed">Mixed (artificial + natural)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="weatherConditions">Weather Conditions</Label>
          <Select value={data.weatherConditions} onValueChange={(value) => handleInputChange('weatherConditions', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select weather conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunny">Sunny</SelectItem>
              <SelectItem value="cloudy-overcast">Cloudy/Overcast</SelectItem>
              <SelectItem value="partly-cloudy">Partly cloudy</SelectItem>
              <SelectItem value="indoor-na">Indoor (N/A)</SelectItem>
              <SelectItem value="light-rain-drizzle">Light rain/drizzle</SelectItem>
              <SelectItem value="windy">Windy</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Environmental Factors</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              'Metal structures nearby',
              'Multiple hitting areas in use',
              'Electronic interference present',
              'Background noise/distractions',
              'Temperature extremes (hot/cold)',
              'High humidity',
              'None of the above'
            ].map((factor) => (
              <div key={factor} className="flex items-center space-x-2">
                <Checkbox
                  id={factor}
                  checked={data.environmentalFactors?.includes(factor) || false}
                  onCheckedChange={(checked) => handleCheckboxChange(factor, checked as boolean)}
                />
                <Label htmlFor={factor} className="text-sm">
                  {factor}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};