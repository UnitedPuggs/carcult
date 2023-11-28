import { supabase } from '$lib/supabase'

export async function load() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz)
    const date = new Date().toLocaleString('sv', { timeZone: tz }).substring(0, 10)
    console.log(date)

    let { data: meets, meets_err } = await supabase
    .from('meets')
    .select('event_name, slug, event_date')
    .ilike('event_date', `%${date}%`)

    if(meets_err)
        return { "meets": meets_err }

    let { data: marketplace_listings, listing_err } = await supabase
    .from('marketplace_listings')
    .select('id, item_name, seller, listing_pics')
    .order('created_at', { ascending: false })
    .range(0, 5)
    .eq('is_live', true)

    if(listing_err)
        return { "listing": listing_err } 

    let { data: forum_posts, posts_err } = await supabase
    .from('forum_posts')
    .select('post_title, id')
    .order('created_at', { ascending: false })
    .range(0, 5)

    if(posts_err)
        return { "posts": posts_err }

    return { meets, marketplace_listings, forum_posts }
}