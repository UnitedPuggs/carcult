import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    //refer to following/+page.server.js for comments. code is literally copy-pasted
    let { data: garage_followers, error } = await supabase
    .from('garage_followers')
    .select('follower')
    .eq('followed', params.slug)

    let usernames = [];

    for(let i = 0; i < garage_followers.length; ++i) {
        usernames.push(garage_followers[i].follower)
    }

    let { data: garage, garage_error } = await supabase
    .from('garage')
    .select('username, pfp_url')
    .in('username', usernames)

    return { garage: garage }
}