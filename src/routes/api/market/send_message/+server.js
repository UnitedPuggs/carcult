import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { chat_id, listing_id, send_user, receive_user, message_content } = await request.json()

    const { error } = await supabase
    .from('marketplace_messages')
    .insert([{
        chat_id,
        listing_id,
        send_user,
        receive_user,
        message_content
    }])

    if(error)
        return new Response(error)
    else
        return new Response(JSON.stringify({status: 200}))
}