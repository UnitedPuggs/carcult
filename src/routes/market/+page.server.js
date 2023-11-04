import { supabase } from '$lib/supabase'

export async function load() {
    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('item_name, price')

    if(error)
        return { "load": error }
    else
        return { streamed: { marketplace_listings }}
}