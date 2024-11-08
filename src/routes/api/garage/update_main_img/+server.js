import { supabase } from '$lib/supabase.js'

export async function PATCH({ request }) {
    const { id, img_urls } = await request.json();

    const { data, error } = await supabase
    .from('garage_vehicle_info')
    .update({ image_urls: img_urls })
    .eq('id', id)


    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "updated main image"}))
}