import { client } from '$lib/public_supabase'

export async function DELETE({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)

    const { reply_id, post_id } = await request.json()

    const { error } = await supabase
    .from('forum_replies')
    .delete()
    .eq('reply_id', reply_id)

    if(error)
        return new Response(error)
    
    let { data: forum_posts, posts_err } = await supabase
    .from('forum_posts')
    .select('reply_count')
    .eq('id', post_id)

    if(posts_err)
        return new Response(posts_err)

    let count = forum_posts[0].reply_count - 1;

    const { count_err } = await supabase
    .from('forum_posts')
    .update({
        reply_count: count
    })
    .eq('id', post_id)

    if(count_err)
        return new Response(count_err)

    return new Response(JSON.stringify({status: 200, message: "reply deleted"}))
}