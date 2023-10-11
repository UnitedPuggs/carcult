import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let date_str = params.year + "-" + params.month

    let { data: events, error } = await supabase
    .from('events')
    .select('*')
    .ilike('event_date', `%${date_str}%`)
    .order('event_date', { ascending: true })

    if(error)
        console.log(error)

    return { events: events }
}