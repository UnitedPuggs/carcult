import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: forum_replies, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('post_id', params.id)
    .order('created_at', { ascending: true })

    let { data: forum_posts, post_err } = await supabase
    .from('forum_posts')
    .select('post_title')
    .eq('id', params.id)

    //we love not error-checking

    if(error)
        return { "load": error }
    else
        return { forum_replies, forum_posts }
}