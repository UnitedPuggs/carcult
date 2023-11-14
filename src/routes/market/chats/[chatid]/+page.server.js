import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: marketplace_messages, error } = await supabase
    .from('marketplace_messages')
    .select('*')
    .eq('chat_id', params.chatid)
    .order("created_at", { ascending: false })

    let { data: marketplace_listings, listing_err } = await supabase
    .from('marketplace_listings')
    .select('seller, item_name, listing_pics, price')
    .eq('id', marketplace_messages[0].listing_id)

    if(error)
        return { "load": error }
    else
        return { marketplace_messages, marketplace_listings }
}