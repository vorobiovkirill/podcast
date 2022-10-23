import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string || 'https://ifndmjhlubaqtrhdwxaa.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY as string || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbmRtamhsdWJhcXRyaGR3eGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ1ODIxMDAsImV4cCI6MTk2MDE1ODEwMH0.ypv_LTlXP_RBGG_qLf3ioMxFq9PuTXQF2SVeBBTClLo';

export const supabase = createClient(supabaseUrl, supabaseKey);
