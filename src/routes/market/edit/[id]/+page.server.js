import { supabase } from '$lib/supabase'

export async function load({ params, locals }) {
    const session  = await locals.getSession();

    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('id', params.id)

    const { data: garage, user_error } = await supabase
    .from('garage')
    .select('pfp_url')
    .eq('username', session.user.displayname)

    if(error)
        return { "load": error }
    else
        return { marketplace_listings, garage }
}