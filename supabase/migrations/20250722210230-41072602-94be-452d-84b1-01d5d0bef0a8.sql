-- Create survey_responses table to store all survey data
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('internal', 'external')),
  data JSONB NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_survey_responses_type ON public.survey_responses(type);
CREATE INDEX idx_survey_responses_created_at ON public.survey_responses(created_at DESC);
CREATE INDEX idx_survey_responses_session_id ON public.survey_responses(session_id);

-- Enable Row Level Security (but make it permissive since no auth needed)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create permissive policy allowing all operations for everyone
CREATE POLICY "Allow all operations on survey_responses" 
ON public.survey_responses 
FOR ALL 
USING (true) 
WITH CHECK (true);