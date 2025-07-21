export interface InternalSurveyData {
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
  setupSpeed: number;
  userConfusionLevel: number;
  requiredAssistance: string;
  calibrationSuccess: string;
  missedSwings: string;
  totalSwings: string;
  falseTriggers: string;
  lagDelayIssues: string;
  dataAccuracyConcerns: string;
  appCrashes: string;
  connectivityIssues: string;
  dataSyncProblems: string;
  uiConfusion: number;

  // Section 4: Facilitator Observations
  timeToFirstSwing: string;
  userExcitementLevel: number;
  frustrationMoments: string;
  breakthroughMoments: string;
  
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
  wouldUserPurchase: string;
  readyForMarket: string;
  sessionSuccessRating: string;
  userAdoptionLikelihood: string;
  priorityFixes: string;
}

export interface ExternalSurveyData {
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

  // Section 3: App & Interface Experience
  startSessionEase: number;
  instructionClarity: number;
  visualIndicatorHelpfulness: number;
  knewRecording: string;
  checkAppFrequency: string;
  appConfusion: string;

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