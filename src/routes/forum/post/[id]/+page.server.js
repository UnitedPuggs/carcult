import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: forum_replies, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('post_id', params.id)
    .order('created_at', { ascending: true })

    if(error)
        return { "load": error }

    let { data: forum_posts, post_err } = await supabase
    .from('forum_posts')
    .select('post_title')
    .eq('id', params.id)

    if(post_err)
        return { "load": post_err }

    return { forum_replies, forum_posts }
}