import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let date = new Date(params.year, params.month - 1);
    //Checking for the 8 days before the month and 8 days after the month, but tbh might just need 2 days after the month
    let start_date = new Date(date.getFullYear(), date.getMonth(), 1 - 8).toISOString();
    let end_date = new Date(date.getFullYear(), date.getMonth() + 1, 8).toISOString();
    
    let { data: events, error } = await supabase
    .from('meets')
    .select('*')
    .lte('event_date', end_date)
    .gte('event_date', start_date)
    .order('event_date', { ascending: true })

    if(error) {
        console.log(error);
        return {};
    }

    let { data: locations, loc_error } = await supabase
    .from('meets')
    .select('id, location')
    .lte('event_date', end_date)
    .gte('event_date', start_date)
    .neq('location', null)

    if(loc_error) {
        console.log(loc_error);
        return {};
    }

    return { events, locations }
}