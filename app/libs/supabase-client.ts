import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

console.log('process.env', process.env)

export const supabase = createClient(supabaseUrl, supabaseKey);
