import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Full Swing UAT Survey Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us improve our swing analysis system by providing valuable feedback through our comprehensive testing surveys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-form hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Internal Testing Survey</CardTitle>
              <CardDescription className="text-lg">
                For Full Swing team members facilitating testing sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-muted-foreground">
                <p>• Testing environment setup assessment</p>
                <p>• Technical performance observations</p>
                <p>• Critical issue reporting</p>
                <p>• Overall session evaluation</p>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate('/internal-survey')}
              >
                Start Internal Survey
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-form hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">End User Survey</CardTitle>
              <CardDescription className="text-lg">
                For players, parents, coaches, and facility staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-muted-foreground">
                <p>• Setup and first impressions</p>
                <p>• App and interface experience</p>
                <p>• Hitting performance feedback</p>
                <p>• Overall system evaluation</p>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate('/user-survey')}
              >
                Start User Survey
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mt-8">
          <Card className="shadow-form hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Evaluation Dashboard</CardTitle>
              <CardDescription>
                Analyze survey responses and view success criteria assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/evaluation')}
              >
                View Evaluation Results
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-accent/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Your feedback is essential for improving our product. Each survey takes approximately 
                <strong> 10-15 minutes</strong> to complete and helps us deliver the best possible experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
