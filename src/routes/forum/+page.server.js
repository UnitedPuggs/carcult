import { supabase } from '$lib/supabase'

export async function load() {
    let { data: forum_posts, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false })

    if(error)
        return;
    else
        return { forum_posts }
}