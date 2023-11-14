import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

const supabase_url = PUBLIC_SUPABASE_URL;
const supabase_key = PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabase_url, supabase_key);