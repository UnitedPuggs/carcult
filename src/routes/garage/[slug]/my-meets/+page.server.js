import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: meets, error } = await supabase
    .from('meets')
    .select('slug, event_name, event_date, bg_img')
    .eq('host', params.slug)
    .order('event_date', { ascending: false });

    if(error)
        return { error };
        
    return { meets };
}