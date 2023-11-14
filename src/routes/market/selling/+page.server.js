import { supabase } from '$lib/supabase'

export async function load({ locals }) {
    const session = await locals.getSession();

    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('seller', session.user.displayname)
    .order('created_at', { ascending: false })

    if(error)
        return { "load": error }
    else
        return { streamed: { marketplace_listings }}
}