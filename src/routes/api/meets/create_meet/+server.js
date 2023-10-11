import { supabase } from '$lib/supabase.js'

export async function POST({ request }) {
    const { user, event_name, date, description } = await request.json();

    const { data, error } = await supabase
    .from('events')
    .insert([{ host: user, event_date: date, event_name: event_name, description: description }])
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify(data))
}