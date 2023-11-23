import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let date_str;
    let prev_date_str;

    if(params.month < 10) {
        date_str = params.year + "-0" + params.month
    } else {
        date_str = params.year + "-" + params.month
    }

    if(params.month <= 10) {
        prev_date_str = `${params.year}-0${params.month - 1}`
    } else {
        prev_date_str = `${params.year}-${params.month - 1}`
    }

    //Pretty sure I'm technically selecting everything from the current and previous month, which is not super efficient, but it is what it is
    let { data: events, error } = await supabase
    .from('meets')
    .select('*')
    .or(`event_date.ilike.%${date_str}%, event_date.ilike.%${prev_date_str}%`)
    .order('event_date', { ascending: true })

    if(error)
        console.log(error)

    return { events: events }
}