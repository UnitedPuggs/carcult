import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

export async function client(session) {
    const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${session?.supabaseAccessToken}`
            }
        }
    })
    return client;
}

export const public_sb = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)