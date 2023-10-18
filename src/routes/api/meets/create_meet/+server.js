import { supabase } from '$lib/supabase.js'

export async function POST({ request }) {
    const { meets } = await request.json();

    const { data, error } = await supabase
    .from('events')
    .insert(meets)
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify(data))
}