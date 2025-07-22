import { SurveyResponse, InternalSurveyData, ExternalSurveyData } from '@/types/survey';
import { supabase } from '@/integrations/supabase/client';

export const saveSurveyResponse = async (
  type: 'internal' | 'external',
  data: InternalSurveyData | ExternalSurveyData
): Promise<string> => {
  const sessionId = generateSessionId();
  
  const { data: response, error } = await supabase
    .from('survey_responses')
    .insert({
      type,
      data: data as any,
      session_id: sessionId
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving survey response:', error);
    throw error;
  }

  return response.id;
};

export const getSurveyResponses = async (): Promise<SurveyResponse[]> => {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching survey responses:', error);
    return [];
  }

  return data.map(row => ({
    id: row.id,
    type: row.type as 'internal' | 'external',
    data: row.data as unknown as InternalSurveyData | ExternalSurveyData,
    timestamp: row.created_at,
    sessionId: row.session_id
  }));
};

export const exportSurveyData = async (): Promise<string> => {
  const responses = await getSurveyResponses();
  return JSON.stringify(responses, null, 2);
};

export const clearSurveyData = async (): Promise<void> => {
  const { error } = await supabase
    .from('survey_responses')
    .delete()
    .neq('id', '');
  
  if (error) {
    console.error('Error clearing survey data:', error);
    throw error;
  }
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateSessionId = (): string => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
};