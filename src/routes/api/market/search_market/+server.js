import { supabase } from '$lib/supabase'

export async function GET({ url }) {
    const search_term = url.searchParams.get('q')

    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, price, listing_pics')
    .ilike('item_name', `%${search_term}%`)

    if(error)
        return new Response(error)
    else
        return new Response(JSON.stringify(marketplace_listings))
}