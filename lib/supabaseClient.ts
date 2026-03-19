
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || "https://bovrapqqwxwemjfpqkqr.supabase.co";
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdnJhcHFxd3h3ZW1qZnBxa3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3Nzg1MDcsImV4cCI6MjA4NjM1NDUwN30.oULjVx0M8nvSPGJGghovPsTS-04zz_Fgl-qY-Rub4jk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
