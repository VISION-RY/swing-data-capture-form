import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { getSurveyResponses } from '@/utils/surveyStorage';
import { SurveyResponse, InternalSurveyData, ExternalSurveyData } from '@/types/survey';
import { CheckCircle, XCircle, AlertTriangle, FileDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EvaluationMetric {
  name: string;
  passThreshold: number;
  failThreshold: number;
  currentValue: number;
  unit: string;
  status: 'pass' | 'fail' | 'warning';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const EvaluationDashboard = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [metrics, setMetrics] = useState<EvaluationMetric[]>([]);
  const [criticalStatus, setCriticalStatus] = useState<'ready' | 'minor-fixes' | 'significant-work' | 'major-redesign'>('ready');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSurveyResponses();
        if (Array.isArray(data)) {
          setResponses(data);
          calculateMetrics(data);
        } else {
          console.error('Survey responses is not an array:', data);
          setResponses([]);
          calculateMetrics([]);
        }
      } catch (error) {
        console.error('Error loading survey responses:', error);
        setResponses([]);
        calculateMetrics([]);
      }
    };
    loadData();
  }, []);

  const calculateMetrics = (data: SurveyResponse[]) => {
    const externalResponses = data.filter(r => r.type === 'external') as (SurveyResponse & { data: ExternalSurveyData })[];

    const calculatedMetrics: EvaluationMetric[] = [
      // Setup & Onboarding
      {
        name: 'Setup Time <15 minutes (First-time)',
        passThreshold: 80,
        failThreshold: 60,
        currentValue: calculateSetupTime(externalResponses, '15'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Setup Time <5 minutes (Regular)',
        passThreshold: 80,
        failThreshold: 60,
        currentValue: calculateSetupTime(externalResponses, '5'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Setup Independence',
        passThreshold: 80,
        failThreshold: 65,
        currentValue: calculateSetupIndependence(externalResponses),
        unit: '%',
        status: 'pass',
        priority: 'high'
      },
      {
        name: 'Placement Clarity Rating',
        passThreshold: 85,
        failThreshold: 70,
        currentValue: calculateAverageRating(externalResponses, 'placementClarity'),
        unit: '%',
        status: 'pass',
        priority: 'high'
      },
      // App & Interface
      {
        name: 'Session Start Ease',
        passThreshold: 85,
        failThreshold: 70,
        currentValue: calculateAverageRating(externalResponses, 'startSessionEase'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Recording Status Awareness',
        passThreshold: 95,
        failThreshold: 85,
        currentValue: calculateRecordingAwareness(externalResponses),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      // Live Hitting Experience
      {
        name: 'System Responsiveness',
        passThreshold: 85,
        failThreshold: 70,
        currentValue: calculateAverageRating(externalResponses, 'systemPerformance'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Data Accuracy Trust',
        passThreshold: 90,
        failThreshold: 80,
        currentValue: calculateAverageRating(externalResponses, 'dataTrust'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Low Distraction Level',
        passThreshold: 85,
        failThreshold: 70,
        currentValue: calculateLowDistraction(externalResponses),
        unit: '%',
        status: 'pass',
        priority: 'high'
      },
      // Overall Experience
      {
        name: 'Overall Satisfaction',
        passThreshold: 80,
        failThreshold: 65,
        currentValue: calculateAverageRating(externalResponses, 'overallExperience'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      },
      {
        name: 'Recommendation Likelihood',
        passThreshold: 75,
        failThreshold: 60,
        currentValue: calculateAverageRating(externalResponses, 'recommendLikelihood'),
        unit: '%',
        status: 'pass',
        priority: 'critical'
      }
    ];

    // Determine status for each metric
    calculatedMetrics.forEach(metric => {
      if (metric.currentValue >= metric.passThreshold) {
        metric.status = 'pass';
      } else if (metric.currentValue >= metric.failThreshold) {
        metric.status = 'warning';
      } else {
        metric.status = 'fail';
      }
    });

    setMetrics(calculatedMetrics);
    determineCriticalStatus(calculatedMetrics);
  };

  const calculateSetupTime = (responses: (SurveyResponse & { data: ExternalSurveyData })[], timeLimit: string) => {
    if (responses.length === 0) return 0;
    const withinTime = responses.filter(r => {
      if (timeLimit === '15') {
        return r.data.setupDuration === '<5 mins' || r.data.setupDuration === '5-10 mins' || r.data.setupDuration === '10-15 mins';
      } else {
        return r.data.setupDuration === '<5 mins';
      }
    });
    return (withinTime.length / responses.length) * 100;
  };

  const calculateSetupIndependence = (responses: (SurveyResponse & { data: ExternalSurveyData })[]) => {
    if (responses.length === 0) return 0;
    const independent = responses.filter(r => r.data.neededHelp === 'No');
    return (independent.length / responses.length) * 100;
  };

  const calculateAverageRating = (responses: (SurveyResponse & { data: ExternalSurveyData })[], field: keyof ExternalSurveyData) => {
    if (responses.length === 0) return 0;
    const validResponses = responses.filter(r => typeof r.data[field] === 'number' && (r.data[field] as number) >= 4);
    return (validResponses.length / responses.length) * 100;
  };

  const calculateRecordingAwareness = (responses: (SurveyResponse & { data: ExternalSurveyData })[]) => {
    if (responses.length === 0) return 0;
    const aware = responses.filter(r => r.data.knewRecording === 'Yes');
    return (aware.length / responses.length) * 100;
  };

  const calculateLowDistraction = (responses: (SurveyResponse & { data: ExternalSurveyData })[]) => {
    if (responses.length === 0) return 0;
    const lowDistraction = responses.filter(r => typeof r.data.deviceDistraction === 'number' && (r.data.deviceDistraction as number) <= 2);
    return (lowDistraction.length / responses.length) * 100;
  };

  const determineCriticalStatus = (metricsData: EvaluationMetric[]) => {
    const criticalMetrics = metricsData.filter(m => m.priority === 'critical');
    const passedCritical = criticalMetrics.filter(m => m.status === 'pass').length;
    const failedCritical = criticalMetrics.filter(m => m.status === 'fail').length;

    if (passedCritical === criticalMetrics.length) {
      setCriticalStatus('ready');
    } else if (passedCritical >= criticalMetrics.length - 1 && failedCritical === 0) {
      setCriticalStatus('minor-fixes');
    } else if (failedCritical <= 1) {
      setCriticalStatus('significant-work');
    } else {
      setCriticalStatus('major-redesign');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-500';
      case 'minor-fixes': return 'text-yellow-500';
      case 'significant-work': return 'text-orange-500';
      case 'major-redesign': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const exportEvaluation = () => {
    const evaluationData = {
      timestamp: new Date().toISOString(),
      totalResponses: responses.length,
      externalResponses: responses.filter(r => r.type === 'external').length,
      internalResponses: responses.filter(r => r.type === 'internal').length,
      criticalStatus,
      metrics,
      recommendation: getRecommendation()
    };

    const blob = new Blob([JSON.stringify(evaluationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fullswing-evaluation-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const exportSurveyDataCSV = () => {
    if (responses.length === 0) {
      return;
    }

    // Create CSV headers
    const headers = ['ID', 'Type', 'Session ID', 'Timestamp'];
    
    // Get all possible data keys from all responses
    const allDataKeys = new Set<string>();
    responses.forEach(response => {
      Object.keys(response.data).forEach(key => allDataKeys.add(key));
    });
    
    headers.push(...Array.from(allDataKeys).sort());
    
    // Create CSV rows
    const csvRows = [headers.join(',')];
    
    responses.forEach(response => {
      const row = [
        response.id,
        response.type,
        response.sessionId,
        response.timestamp
      ];
      
      // Add data values in the same order as headers
      Array.from(allDataKeys).sort().forEach(key => {
        const value = response.data[key as keyof typeof response.data];
        // Handle arrays and objects by stringifying them
        const cellValue = Array.isArray(value) 
          ? `"${value.join('; ')}"` 
          : typeof value === 'object' && value !== null
          ? `"${JSON.stringify(value).replace(/"/g, '""')}"` 
          : `"${String(value || '').replace(/"/g, '""')}"`;
        row.push(cellValue);
      });
      
      csvRows.push(row.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fullswing-survey-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRecommendation = () => {
    switch (criticalStatus) {
      case 'ready': return 'LAUNCH READY - All critical criteria met';
      case 'minor-fixes': return 'LAUNCH WITH MINOR FIXES - Address specific issues';
      case 'significant-work': return 'NEEDS SIGNIFICANT WORK - Major improvements required';
      case 'major-redesign': return 'MAJOR REDESIGN REQUIRED - Fundamental changes needed';
    }
  };

  const renderMetricCard = (metric: EvaluationMetric, index: number) => (
    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        {getStatusIcon(metric.status)}
        <div>
          <div className="font-medium">{metric.name}</div>
          <div className="text-sm text-slate-600">
            Pass: ≥{metric.passThreshold}% | Fail: &lt;{metric.failThreshold}%
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold">{metric.currentValue.toFixed(1)}{metric.unit}</div>
        <Badge variant={metric.priority === 'critical' ? 'destructive' : 'secondary'}>
          {metric.priority}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">UAT Evaluation Dashboard</h1>
              <p className="text-slate-600 mt-2">Post-Survey Analysis & Success Criteria Assessment</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportSurveyDataCSV} variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export Survey CSV
            </Button>
            <Button onClick={exportEvaluation} className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export Evaluation
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-900">{responses.length}</div>
              <div className="text-sm text-slate-600">Total Responses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{responses.filter(r => r.type === 'external').length}</div>
              <div className="text-sm text-slate-600">External Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{responses.filter(r => r.type === 'internal').length}</div>
              <div className="text-sm text-slate-600">Internal Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className={`text-2xl font-bold ${getStatusColor(criticalStatus)}`}>
                {criticalStatus.toUpperCase().replace('-', ' ')}
              </div>
              <div className="text-sm text-slate-600">Launch Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Launch Readiness Status */}
        <Card>
          <CardHeader>
            <CardTitle>Launch Readiness Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Current Status:</span>
                <Badge variant={criticalStatus === 'ready' ? 'default' : 'destructive'}>
                  {getRecommendation()}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Critical Criteria Passed</span>
                  <span>{metrics.filter(m => m.priority === 'critical' && m.status === 'pass').length} / {metrics.filter(m => m.priority === 'critical').length}</span>
                </div>
                <Progress 
                  value={(metrics.filter(m => m.priority === 'critical' && m.status === 'pass').length / Math.max(metrics.filter(m => m.priority === 'critical').length, 1)) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Tabs */}
        <Tabs defaultValue="setup" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Setup & Onboarding</TabsTrigger>
            <TabsTrigger value="interface">App & Interface</TabsTrigger>
            <TabsTrigger value="hitting">Hitting Experience</TabsTrigger>
            <TabsTrigger value="overall">Overall Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Setup & Onboarding Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.filter(m => m.name.includes('Setup') || m.name.includes('Placement')).map(renderMetricCard)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interface" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>App & Interface Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.filter(m => m.name.includes('Session') || m.name.includes('Recording')).map(renderMetricCard)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hitting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Hitting Experience Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.filter(m => m.name.includes('System') || m.name.includes('Data') || m.name.includes('Distraction')).map(renderMetricCard)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overall" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Experience Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.filter(m => m.name.includes('Overall') || m.name.includes('Recommendation')).map(renderMetricCard)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EvaluationDashboard;