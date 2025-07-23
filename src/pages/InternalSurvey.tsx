import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FormProgress } from "@/components/survey/FormProgress";
import { InternalSurveyData } from "@/types/survey";
import { saveSurveyResponse } from "@/utils/surveyStorage";
import { useToast } from "@/hooks/use-toast";
import { InternalSection1 } from "@/components/survey/internal/InternalSection1";
import { InternalSection2 } from "@/components/survey/internal/InternalSection2";
import { InternalSection3 } from "@/components/survey/internal/InternalSection3";
import { InternalSection4 } from "@/components/survey/internal/InternalSection4";

const TOTAL_SECTIONS = 4;

const InternalSurvey = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Partial<InternalSurveyData>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const sectionTitles = {
    1: "Testing Environment Setup",
    2: "User Testing Scenario",
    3: "Technical Performance Observations",
    4: "Facilitator Observations"
  };

  const updateFormData = (sectionData: Partial<InternalSurveyData>) => {
    setFormData(prev => ({ ...prev, ...sectionData }));
  };

  const handleNext = () => {
    if (currentSection < TOTAL_SECTIONS) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const responseId = await saveSurveyResponse('internal', formData as InternalSurveyData);
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
        return <InternalSection1 data={formData} updateData={updateFormData} />;
      case 2:
        return <InternalSection2 data={formData} updateData={updateFormData} />;
      case 3:
        return <InternalSection3 data={formData} updateData={updateFormData} />;
      case 4:
        return <InternalSection4 data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
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
              Internal Testing Facilitator Survey
            </h1>
            <p className="text-muted-foreground">
              Complete this survey after each testing session to help us improve our system.
            </p>
          </div>

          <Card className="shadow-form">
            <CardHeader>
              <FormProgress 
                currentSection={currentSection}
                totalSections={TOTAL_SECTIONS}
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
                
                {currentSection === TOTAL_SECTIONS ? (
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

export default InternalSurvey;