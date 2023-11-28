import { client } from '$lib/public_supabase'

export async function PATCH({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session)

    const { reply_id, reply_content } = await request.json()

    const { error } = await supabase
    .from('forum_replies')
    .update({
        reply_content: reply_content
    })
    .eq('reply_id', reply_id)

    if(error)
        return new Response(error)
    else
        return new Response(JSON.stringify({status: 204, message: "updated reply"}))
}