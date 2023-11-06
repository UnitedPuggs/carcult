import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('id', params.item)

    let { data: garage, seller_error } = await supabase
    .from('garage')
    .select('created, pfp_url')
    .eq('username', marketplace_listings[0].seller)

    if(error || seller_error)
        return { "load": error }
    else
        return { marketplace_listings, garage }
}