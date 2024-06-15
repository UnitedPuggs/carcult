/*import { supabase } from '$lib/supabase'

export async function load() {
    let { data: marketplace_listings, listing_err } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, seller, listing_pics, mileage, transmission, title_status, price')
    .order('created_at', { ascending: false })
    .range(0, 5)
    .eq('is_live', true)

    if(listing_err)
        return { "listing": listing_err } 

    let { data: forum_posts, posts_err } = await supabase
    .from('forum_posts')
    .select(
        `post_title, reply_count, created_at,
        garage:poster (
            username,
            pfp_url
        ),
        forum_replies:id (
            post_id,
            created_at,
            reply_content,
            poster
        )
        `
    )
    .order('created_at', { ascending: false })
    .range(0, 4)

    if(posts_err)
        return { "posts": posts_err }
    else
        return { marketplace_listings, forum_posts }
}*/