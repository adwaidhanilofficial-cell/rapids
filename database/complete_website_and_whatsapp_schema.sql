-- =========================================================================================
-- COMPLETE & CORRECTED SUPABASE SCHEMA FOR RAPIDS (Website + WhatsApp AI Agent)
-- =========================================================================================

-- 1. Create the `leads` table (Cleaned & Ordered Version)
CREATE TABLE IF NOT EXISTS public.leads (
    -- Unique Identifier
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Lead Details (Core)
    name TEXT,                             -- Full Name (from Website or WhatsApp)
    first_name TEXT,                       -- First name (extracted or specific)
    phone TEXT UNIQUE NOT NULL,            -- WhatsApp/Contact Number (with country code like 91)
    email TEXT,                            -- Email address
    source TEXT DEFAULT 'website',         -- Lead origin: 'website' or 'whatsapp'
    
    -- WhatsApp AI Meta Data
    wa_name TEXT,                          -- Raw WhatsApp Profile Name
    phone_id TEXT,                         -- The WhatsApp Business Account Phone ID
    bot_paused TEXT DEFAULT 'false',       -- 'true' if a human takes over the chat
    opted_out TEXT DEFAULT 'false',        -- 'true' if the user unsubscribes
    
    -- Funnel Tracking & Preferences
    status TEXT DEFAULT 'lead',            -- Track global state e.g., 'lead', 'pending', 'paid'
    funnel_stage TEXT DEFAULT 'new',       -- Specific step inside the n8n flow
    language TEXT DEFAULT 'English',       -- Preferred communication language
    location TEXT,                         -- Location/City provided by the user
    pain_point TEXT,                       -- Selected pain point/reason
    
    -- Order & Payment Info
    amount NUMERIC(10, 2) DEFAULT 0,       -- Amount paid (e.g., 5 or 499)
    order_id TEXT,                         -- Razorpay Order ID
    payment_id TEXT,                       -- Razorpay Payment ID
    
    -- System Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add an index to speed up phone number lookups (essential for WhatsApp agent speed)
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);

-- 3. Auto-update the `updated_at` column whenever a row changes
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON public.leads;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- =========================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow service role (n8n backend & Vercel API backend) full god-mode access
DROP POLICY IF EXISTS "Service Role Full Access Leads" ON public.leads;
CREATE POLICY "Service Role Full Access Leads" 
ON public.leads FOR ALL USING (auth.role() = 'service_role');

-- Allow anonymous users (Website Frontend) to insert new leads
DROP POLICY IF EXISTS "Anon Insert Leads" ON public.leads;
CREATE POLICY "Anon Insert Leads" 
ON public.leads FOR INSERT WITH CHECK (auth.role() = 'anon');

-- Allow anonymous users (Website Frontend) to update their own lead record (e.g., adding email)
DROP POLICY IF EXISTS "Anon Update Leads" ON public.leads;
CREATE POLICY "Anon Update Leads" 
ON public.leads FOR UPDATE USING (auth.role() = 'anon');

-- Allow anonymous users (Website Frontend) to immediately read the lead they just created
DROP POLICY IF EXISTS "Anon Select Leads" ON public.leads;
CREATE POLICY "Anon Select Leads" 
ON public.leads FOR SELECT USING (auth.role() = 'anon');
