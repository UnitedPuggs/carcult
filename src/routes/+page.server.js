import { supabase } from '$lib/supabase'

export async function load() {
    let { data: marketplace_listings, listing_err } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, seller, listing_pics')
    .order('created_at', { ascending: false })
    .range(0, 4)
    .eq('is_live', true)

    if(listing_err)
        return { "listing": listing_err } 

    let { data: forum_posts, posts_err } = await supabase
    .from('forum_posts')
    .select('post_title, id')
    .order('created_at', { ascending: false })
    .range(0, 4)

    if(posts_err)
        return { "posts": posts_err }

    return { marketplace_listings, forum_posts }
}