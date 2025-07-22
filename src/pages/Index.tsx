import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6 tracking-tight">
            Full Swing UAT Survey Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Help us improve our swing analysis system by providing valuable feedback through our comprehensive testing surveys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="shadow-elegant hover:shadow-form transition-all duration-300 border-2 group">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Internal Testing Survey</CardTitle>
              <CardDescription className="text-lg">
                For Full Swing team members facilitating testing sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 text-muted-foreground text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Testing environment setup assessment</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Technical performance observations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Critical issue reporting</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Overall session evaluation</p>
                </div>
              </div>
              <Button 
                className="w-full h-12 text-lg font-semibold"
                onClick={() => navigate('/internal-survey')}
              >
                Start Internal Survey
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-form transition-all duration-300 border-2 group">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">End User Survey</CardTitle>
              <CardDescription className="text-lg">
                For players, parents, coaches, and facility staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 text-muted-foreground text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Setup and first impressions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>App and interface experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Hitting performance feedback</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Overall system evaluation</p>
                </div>
              </div>
              <Button 
                className="w-full h-12 text-lg font-semibold"
                onClick={() => navigate('/user-survey')}
              >
                Start User Survey
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <Card className="shadow-elegant hover:shadow-form transition-all duration-300 border-2">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Evaluation Dashboard</CardTitle>
              <CardDescription className="text-lg">
                Analyze survey responses and view success criteria assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full h-12 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate('/evaluation')}
              >
                View Evaluation Results
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-3xl mx-auto bg-muted/30 border-dashed border-2">
            <CardContent className="pt-8 pb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your feedback is essential for improving our product. Each survey takes approximately 
                <strong className="text-foreground"> 10-15 minutes</strong> to complete and helps us deliver the best possible experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
