import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session)
    const { id, content } = await request.json();

    const { error } = await supabase
    .from('forum_replies')
    .insert([{
        post_id: id,
        poster: session.user.displayname,
        reply_content: content
    }])

    let { data: forum_posts, posts_err } = await supabase
    .from('forum_posts')
    .select('reply_count')
    .eq('id', id)

    let count = forum_posts[0].reply_count + 1;

    const { count_err } = await supabase
    .from('forum_posts')
    .update({
        reply_count: count
    })
    .eq('id', id)

    if(error)
        return new Response(error)
    else
        return new Response({ status: 204, message: "reply made" })
} 