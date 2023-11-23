import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session);
    const { title, content } = await request.json();

    if(title && content) {
    const { error } = await supabase
    .from('forum_posts')
    .insert([{
        poster: session.user.displayname,
        post_title: title,
        post_content: content
    }])


    if(error)
        return new Response(error)
    else
        return new Response({status: 204, message: "thread created"})
    } else {
        return new Response({status: 400, message: "no title and/or content"})
    }
}