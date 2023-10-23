import { supabase } from '$lib/supabase';

export async function PATCH({ request }) {
    const { id, event_name, description, event_date } = await request.json();

    const { data, error } = await supabase
    .from('events')
    .update({ event_name, event_date, description })
    .eq('id', id)
    .select();

    if(error)
        return new Response({status: 400, error: error})

    return new Response({status: 200, message: "updated meet"})
}