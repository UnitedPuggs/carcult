import { supabase } from '$lib/supabase'

export async function POST({ request }) {
    const { listing_id, send_user, receive_user, message_content } = await request.json()

    const chat_id = crypto.randomUUID()

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
        return new Response(JSON.stringify({chat_id: chat_id}))
}