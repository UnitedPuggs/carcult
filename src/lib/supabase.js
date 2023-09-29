import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private'

const supabase_url = SUPABASE_URL;
const supabase_key = SUPABASE_KEY;
export const supabase = createClient(supabase_url, supabase_key);