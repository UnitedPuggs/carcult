import { supabase } from '$lib/supabase'

export async function POST({ request }) {
    const { chat_id, listing_id, send_user, receive_user, message_content } = await request.json()

    const { data, error } = await supabase
    .from('marketplace_messages')
    .insert([{
        chat_id,
        listing_id,
        send_user,
        receive_user,
        message_content
    }])
    .select()

    if(error)
        return new Response(error)
    else
        return new Response(JSON.stringify({status: 200}))
}