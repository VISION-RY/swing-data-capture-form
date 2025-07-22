import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FormProgress } from "@/components/survey/FormProgress";
import { ExternalSurveyData } from "@/types/survey";
import { saveSurveyResponse } from "@/utils/surveyStorage";
import { useToast } from "@/hooks/use-toast";
import { ExternalSection1 } from "@/components/survey/external/ExternalSection1";
import { ExternalSection2 } from "@/components/survey/external/ExternalSection2";
import { ExternalSection3 } from "@/components/survey/external/ExternalSection3";
import { ExternalSection4 } from "@/components/survey/external/ExternalSection4";
import { ExternalSection5 } from "@/components/survey/external/ExternalSection5";
import { ExternalSection6 } from "@/components/survey/external/ExternalSection6";
import { ExternalSection7 } from "@/components/survey/external/ExternalSection7";
import { ExternalSection8 } from "@/components/survey/external/ExternalSection8";

const TOTAL_SECTIONS = 8;

const UserSurvey = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Partial<ExternalSurveyData>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const sectionTitles = {
    1: "Background Information",
    2: "Setup & First Impressions",
    3: "App & Interface Experience",
    4: "Hitting Experience",
    5: "Data & Analytics",
    6: "Overall Experience",
    7: "Role-Specific Questions",
    8: "Competitive Comparison"
  };

  const updateFormData = (sectionData: Partial<ExternalSurveyData>) => {
    setFormData(prev => ({ ...prev, ...sectionData }));
  };

  const handleNext = () => {
    // Skip section 7 if no specific role selected or section 8 if no experience
    if (currentSection === 6 && !shouldShowSection7()) {
      if (shouldShowSection8()) {
        setCurrentSection(8);
      } else {
        handleSubmit();
      }
    } else if (currentSection === 7 && !shouldShowSection8()) {
      handleSubmit();
    } else if (currentSection < TOTAL_SECTIONS) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection === 8 && !shouldShowSection7()) {
      setCurrentSection(6);
    } else if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const shouldShowSection7 = () => {
    const role = formData.userRole;
    return role && ['player-youth', 'player-high-school', 'player-college', 'player-adult', 'parent', 'coach-youth', 'coach-high-school', 'coach-college', 'facility-owner'].includes(role);
  };

  const shouldShowSection8 = () => {
    return formData.launchMonitorExperience && formData.launchMonitorExperience !== 'never-used';
  };

  const handleSubmit = async () => {
    try {
      const responseId = await saveSurveyResponse('external', formData as ExternalSurveyData);
      toast({
        title: "Survey Submitted Successfully",
        description: `Response ID: ${responseId}`,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return <ExternalSection1 data={formData} updateData={updateFormData} />;
      case 2:
        return <ExternalSection2 data={formData} updateData={updateFormData} />;
      case 3:
        return <ExternalSection3 data={formData} updateData={updateFormData} />;
      case 4:
        return <ExternalSection4 data={formData} updateData={updateFormData} />;
      case 5:
        return <ExternalSection5 data={formData} updateData={updateFormData} />;
      case 6:
        return <ExternalSection6 data={formData} updateData={updateFormData} />;
      case 7:
        return shouldShowSection7() ? <ExternalSection7 data={formData} updateData={updateFormData} /> : null;
      case 8:
        return shouldShowSection8() ? <ExternalSection8 data={formData} updateData={updateFormData} /> : null;
      default:
        return null;
    }
  };

  const getEffectiveTotalSections = () => {
    let total = 6; // Base sections
    if (shouldShowSection7()) total++;
    if (shouldShowSection8()) total++;
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              End User Survey
            </h1>
            <p className="text-muted-foreground">
              Share your experience with our swing analysis system to help us improve.
            </p>
          </div>

          <Card className="shadow-form">
            <CardHeader>
              <FormProgress 
                currentSection={currentSection}
                totalSections={getEffectiveTotalSections()}
                sectionTitle={sectionTitles[currentSection as keyof typeof sectionTitles]}
              />
            </CardHeader>
            <CardContent className="space-y-6">
              {renderCurrentSection()}
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentSection === 1}
                >
                  Previous
                </Button>
                
                {(currentSection === getEffectiveTotalSections()) ? (
                  <Button onClick={handleSubmit}>
                    Submit Survey
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next Section
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSurvey;