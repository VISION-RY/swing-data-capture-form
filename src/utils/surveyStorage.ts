import { SurveyResponse, InternalSurveyData, ExternalSurveyData } from '@/types/survey';

const STORAGE_KEY = 'fullswing_survey_responses';

export const saveSurveyResponse = (
  type: 'internal' | 'external',
  data: InternalSurveyData | ExternalSurveyData
): string => {
  const sessionId = generateSessionId();
  const response: SurveyResponse = {
    id: generateId(),
    type,
    data,
    timestamp: new Date().toISOString(),
    sessionId
  };

  const existingResponses = getSurveyResponses();
  const updatedResponses = [...existingResponses, response];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResponses));
  return response.id;
};

export const getSurveyResponses = (): SurveyResponse[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const exportSurveyData = (): string => {
  const responses = getSurveyResponses();
  return JSON.stringify(responses, null, 2);
};

export const clearSurveyData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateSessionId = (): string => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
};