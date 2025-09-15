-- Update the check constraint to include the new types
ALTER TABLE public.freelance_updates 
DROP CONSTRAINT IF EXISTS freelance_updates_type_check;

ALTER TABLE public.freelance_updates 
ADD CONSTRAINT freelance_updates_type_check 
CHECK (type IN ('project', 'achievement', 'milestone', 'announcement', 'vibe_check', 'snippet', 'random'));