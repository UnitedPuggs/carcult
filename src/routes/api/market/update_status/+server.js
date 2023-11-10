import { supabase } from '$lib/supabase'

export async function PATCH({ request }) {
    const { id, new_status } = await request.json();

    const { data, error } = await supabase
    .from('marketplace_listings')
    .update({ is_live: new_status})
    .eq('id', id)
    .select()

    if(error)
        return new Response(JSON.stringify(error))
    else
        return new Response(JSON.stringify({ status: 200 }))
}