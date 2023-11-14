import { supabase } from '$lib/supabase'

export async function load({ params, locals }) {
    const session = await locals.getSession()

    let { data: marketplace_listings, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('id', params.item)

    let { data: garage, seller_error } = await supabase
    .from('garage')
    .select('created, pfp_url')
    .eq('username', marketplace_listings[0].seller)

    let { data: marketplace_messages, msg_error } = await supabase
    .from('marketplace_messages')
    .select('chat_id')
    .match({ listing_id: marketplace_listings[0].id, send_user: session?.user.displayname})

    if(error || seller_error)
        return { "load": error }
    else
        return { marketplace_listings, garage, marketplace_messages }
}