import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let { data: garage_followers, error } = await supabase
    .from('garage_followers')
    .select('followed')
    .eq('follower', params.slug)

    let usernames = [];

    for(let i = 0; i < garage_followers.length; ++i) {
        usernames.push(garage_followers[i].followed)
    }

    let { data: garage, garage_error } = await supabase
    .from('garage')
    .select('pfp_url')
    .in('username', usernames)

    return { garage_followers: garage_followers, garage: garage }
}