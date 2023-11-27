import { supabase } from '$lib/supabase'

async function get_vehicle_info(username) {
    let { data: garage_vehicle_info, error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('username', username);

    if(error)
        return;
    else
        return garage_vehicle_info;
}

export async function load({ params, locals }) {
    const session = await locals.getSession();

    let { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', params.slug);

    if(error)
        return {"load": error};

    let { data: is_following, follower_error } = await supabase
    .from('garage_followers')
    .select('*')
    .eq('follower', session?.user.displayname)
    .eq('followed', params.slug)
    
    if(follower_error)
        return {"load": garage_error};
    
    return { garage: garage, streamed: { garage_info: get_vehicle_info(params.slug) }, is_following: is_following };
}