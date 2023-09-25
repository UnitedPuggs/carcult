import { supabase } from '$lib/supabase.js'

export async function POST({ request }) {
    const { vehicle_name, image_urls } = await request.json();

    const { data, error } = await supabase
    .from('garage_vehicle_info')
    .insert([
        { vehicle_name, image_urls }
    ])
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify(data))
}