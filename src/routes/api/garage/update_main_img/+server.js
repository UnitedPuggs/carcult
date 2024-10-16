import { supabase } from '$lib/supabase.js'

export async function PATCH({ request }) {
    const { id, img_urls } = await request.json();

    console.log(img_urls)

    const { data, error } = await supabase
    .from('garage_vehicle_info')
    .update({ image_urls: img_urls })
    .eq('id', id)
    .select()

    console.log(data)

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "updated main image"}))
}