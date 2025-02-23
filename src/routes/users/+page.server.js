import { supabase } from '$lib/supabase';

export async function load({ url }) {
    const username = await url.searchParams.get('username')
    
    
    const { data: users, error } = await supabase
    .from('garage')
    .select('username, pfp_url, follower_count, following_count')
    .ilike('username', `%${username}%`)
    .range(0, 5);

    if (error) {
        return { error: error };
    }

    return { users }
    
}