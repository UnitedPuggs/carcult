import { supabase } from '$lib/supabase'

export async function load({ params }) {
    const { data: events, error } = await supabase
    .from('events')
    .select('slug, event_name, event_date, bg_img')
    .eq('host', params.slug)
    .order('event_date', { ascending: true });

    if(error)
        return { "load": error };

    return { events: events };
}