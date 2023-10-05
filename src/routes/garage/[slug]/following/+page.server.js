import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    //Searching garage_followers for the garage account that the user is at
    let { data: garage_followers, error } = await supabase
    .from('garage_followers')
    .select('followed')
    .eq('follower', params.slug)

    let usernames = [];

    //we want to know who's being followed and then check in garage for username and profile picture
    for(let i = 0; i < garage_followers.length; ++i) {
        usernames.push(garage_followers[i].followed)
    }

    //this checks if the usernames in the usernames array exist in garage and then selects pfp and un
    let { data: garage, garage_error } = await supabase
    .from('garage')
    .select('username, pfp_url')
    .in('username', usernames)

    return { garage: garage }
}