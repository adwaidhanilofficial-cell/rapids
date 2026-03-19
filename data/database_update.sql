-- =========================================================================================
-- UPDATE SUPABASE SCHEMA FOR RAZORPAY SUBSCRIPTIONS
-- =========================================================================================

-- Safely add new columns to the `leads` table without deleting or altering existing ones
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS plan_id TEXT;
