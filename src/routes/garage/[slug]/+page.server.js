import { supabase } from '$lib/supabase'

export async function load({ params, locals }) {
    const session = await locals.getSession();

    let { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', params.slug);

    if(error)
        return {"load": error};

    let { data: garage_vehicle_info, garage_error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('username', params.slug);
    
    let { data: is_following, follower_error } = await supabase
    .from('garage_followers')
    .select('*')
    .eq('follower', session?.user.displayname)
    .eq('followed', params.slug)
    
    if(garage_error)
        return {"load": garage_error};
    
    return { garage: garage, garage_info: garage_vehicle_info, is_following: is_following };
}