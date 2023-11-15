import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: forum_replies, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('post_id', params.id)
    .order('created_at', { ascending: true })

    if(error)
        return { "load": error }
    else
        return { forum_replies }
}