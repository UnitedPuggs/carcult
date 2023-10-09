import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let date_str = params.year + "-" + params.month

    let { data: events, error } = await supabase
    .from('events')
    .select('*')
    .like('event_date', `%${date_str}%`)

    return { events: events }
}