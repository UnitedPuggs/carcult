import { supabase } from '$lib/supabase'

export async function GET({ url }) {
    const search_term = url.searchParams.get('q')
    const min = url.searchParams.get('min')
    const max = url.searchParams.get('max')

    //let's just say I'm tired and lazy right now
    if(!min && !max) {
        let { data: marketplace_listings, error } = await supabase
        .from('marketplace_listings')
        .select('id, item_name, price, listing_pics')
        .ilike('item_name', `%${search_term}%`)
        .order('created_at', { ascending: false })

        if(error)
            return new Response(error)
        else
            return new Response(JSON.stringify(marketplace_listings))
    } else if(!min && max) {
        let { data: marketplace_listings, error } = await supabase
        .from('marketplace_listings')
        .select('id, item_name, price, listing_pics')
        .ilike('item_name', `%${search_term}%`)
        .lte('price', max)
        .order('created_at', { ascending: false })

        if(error)
            return new Response(error)
        else
            return new Response(JSON.stringify(marketplace_listings))
    } else if(min && !max) {
        let { data: marketplace_listings, error } = await supabase
        .from('marketplace_listings')
        .select('id, item_name, price, listing_pics')
        .ilike('item_name', `%${search_term}%`)
        .gte('price', min)
        .order('created_at', { ascending: false })

        if(error)
            return new Response(error)
        else
            return new Response(JSON.stringify(marketplace_listings))
    } else {
        let { data: marketplace_listings, error } = await supabase
        .from('marketplace_listings')
        .select('id, item_name, price, listing_pics')
        .ilike('item_name', `%${search_term}%`)
        .gte('price', min)
        .lte('price', max)
        .order('created_at', { ascending: false })

        if(error)
            return new Response(error)
        else
            return new Response(JSON.stringify(marketplace_listings))
    }
}