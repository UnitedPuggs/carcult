import { supabase } from '$lib/supabase'

export async function load() {
    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, price, listing_pics')
    .order('created_at', { ascending: false })

    if(error)
        return { "load": error }
    else
        return { streamed: { marketplace_listings }}
}