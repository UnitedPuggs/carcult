import { supabase } from '$lib/supabase'

export async function load({ locals }) {
    const session = await locals.getSession();

    let { data: grouped_messages, error } = await supabase
    .from('grouped_messages')
    .select('chat_id, listing_id')
    .or(`send_user.eq.${session.user.displayname}, receive_user.eq.${session.user.displayname}`)

    let chat_ids = grouped_messages.map(id => id.chat_id)

    let { data: marketplace_buyers, buyer_err } = await supabase
    .from('marketplace_buyers')
    .select('chat_id, buyer')
    .in('chat_id', chat_ids)

    let listing_ids = grouped_messages.map(id => id.listing_id)

    let { data: marketplace_listings, listing_err } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, seller, listing_pics')
    .in('id', listing_ids)

    let temp_matched = marketplace_listings.map(obj => ({
        ...obj, 
        chat_id: grouped_messages.filter(msg => msg.listing_id == obj.id), 
       
    }))

    let combined = temp_matched.map(obj => ({
        ...obj,
        buyer: marketplace_buyers.filter(buyer => buyer.chat_id == obj.chat_id[0].chat_id)
    }))

    if(error)
        return { "load": error }
    else
        return { combined }
}