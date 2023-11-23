import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { listing_id, send_user, receive_user, message_content } = await request.json()

    const chat_id = crypto.randomUUID()

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

    const { err } = await supabase
    .from('marketplace_buyers')
    .insert([{
        chat_id, 
        buyer: send_user
    }])
    
    if(err)
        return new Response(err)

    return new Response(JSON.stringify({chat_id: chat_id}))
}