export interface InternalSurveyData {
  // Contact Information (optional)
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  
  // Section 1: Testing Environment Setup
  testingLocationType: string;
  cageWidth: string;
  distanceToFrontNet: string;
  distanceBehindPlate: string;
  ceilingHeight: string;
  totalUsableSpace: string;
  lightingConditions: string;
  weatherConditions: string;
  environmentalFactors: string[];

  // Section 2: User Testing Scenario
  primaryUserType: string;
  userExperienceLevel: string;
  sessionType: string;

  // Section 3: Technical Performance Observations
  watchedTutorial: string;
  setupSpeed: number;
  userConfusionLevel: number;
  requiredAssistance: string;
  calibrationSuccess: string;
  setupTimeMinutes: string;
  calibrationAttempts: string;
  missedSwings: string;
  totalSwings: string;
  falseTriggers: string;
  lagDelayIssues: string;
  lagDelayTimingSeconds: string;
  dataAccuracyConcerns: string;
  detectionAccuracyPercent: string;
  responseTimeConsistency: string;
  measurementReliability: string;
  appCrashes: string;
  connectivityIssues: string;
  dataSyncProblems: string;
  uiConfusion: number;
  appResponseTime: string;
  featureDiscoverability: number;
  navigationEase: number;

  // Section 4: Facilitator Observations
  timeToFirstSwing: string;
  userExcitementLevel: number;
  frustrationMoments: string;
  breakthroughMoments: string;
  learningCurveRating: number;
  featureAdoptionRate: string;
  
  // Success Criteria Assessment
  coreFeatureFunctionality: string;
  dataVisualizationClarity: number;
  reportGenerationSuccess: string;
  userTaskCompletionRate: string;
  errorRecoverySuccess: string;
  documentationEffectiveness: number;
  
  // Issues
  issue1Type: string;
  issue1Priority: string;
  issue1Impact: string;
  issue1Urgency: string;
  issue1Description: string;
  issue2Type: string;
  issue2Priority: string;
  issue2Impact: string;
  issue2Urgency: string;
  issue2Description: string;
  issue3Type: string;
  issue3Priority: string;
  issue3Impact: string;
  issue3Urgency: string;
  issue3Description: string;

  successMoments: string;
  sessionSuccessRating: string;
  testingGoalsMet: string;
  userEngagementLevel: string;
  systemStability: string;
  priorityFixes: string;
  overallSatisfactionScore: number;
  recommendationLikelihood: number;
  marketReadinessAssessment: string;
}

export interface ExternalSurveyData {
  // Contact Information (optional)
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  
  // Section 1: Background Information
  userRole: string;
  techExperience: string;
  launchMonitorExperience: string;

  // Section 2: Setup & First Impressions
  setupEase: number;
  placementClarity: number;
  setupConfidence: number;
  neededHelp: string;
  setupDuration: string;
  setupConfusion: string;
  setupImprovements: string;
  timeToValueRealization: string;

  // Section 3: App & Interface Experience
  startSessionEase: number;
  instructionClarity: number;
  visualIndicatorHelpfulness: number;
  knewRecording: string;
  checkAppFrequency: string;
  appConfusion: string;
  featureCompleteness: number;
  workflowEfficiency: number;

  // Section 4: Hitting Experience
  systemPerformance: number;
  metricsAccuracy: number;
  deviceDistraction: number;
  noticeableDelay: string;
  missedSwings: string;
  metricsAffectedSwing: string;
  attentionMetrics: string[];
  hittingFeel: string;
  comparisonToNormal: string;
  madeAdjustments: string;

  // Section 4.5: Usability & Performance Metrics
  learnability: number;
  errorRecovery: number;
  accessibilityRating: number;
  systemResponsiveness: number;
  dataAccuracy: number;
  reliabilityRating: number;
  performanceConsistency: number;

  // Section 5: Data & Analytics
  metricsClarity: number;
  summaryUsefulness: number;
  chartsClarity: number;
  understoodMetrics: string;
  showedSurprising: string;
  helpedImprovement: string;
  reviewLikelihood: number;
  shareLikelihood: number;
  missingData: string;
  confusingMetrics: string;

  // Section 6: Overall Experience
  overallExperience: number;
  dataTrust: number;
  recommendLikelihood: number;
  weeklyUseLikelihood: number;
  useWithoutCoach: string;
  additionalFeatures: string[];
  likedMost: string;
  frustrations: string;
  mustUseFeatures: string;
  roiExpectation: string;
  competitiveAdvantage: number;
  marketReadiness: string;
  implementationTimeframe: string;

  // Section 7: Persona-Specific Questions (conditional)
  // Player fields
  personalDataMotivation?: number;
  comparisonToOtherTools?: string;
  regularUseConvincer?: string;
  // Parent fields
  costEffectiveness?: number;
  childIndependentUse?: number;
  developmentValue?: string;
  // Coach fields
  teamManagementUsefulness?: number;
  workflowIntegration?: number;
  playerDevelopmentValue?: number;
  teamFeatures?: string;
  // Facility fields
  clientAttraction?: number;
  highVolumeHandling?: number;
  systemDurability?: number;
  operationalBenefits?: string;

  // Section 8: Competitive Comparison (conditional)
  setupComparison?: number;
  accuracyComparison?: number;
  appComparison?: number;
  valueComparison?: number;
  overallComparison?: number;
  betterFeatures?: string;
  otherSystemsBetter?: string;
  trainingApproachChange?: string;
}

export interface SurveyResponse {
  id: string;
  type: 'internal' | 'external';
  data: InternalSurveyData | ExternalSurveyData;
  timestamp: string;
  sessionId: string;
}