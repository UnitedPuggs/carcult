import { supabase } from '$lib/supabase.js'

export async function DELETE({ request }) {
    const { id, url, imgs } = await request.json();
    
    const { delete_data, delete_error } = await supabase
    .storage
    .from('garage_photos')
    .remove([url])

    if(delete_error)
        return new Response(JSON.stringify(delete_error))

    const fixed_array = imgs.filter(e => e !== url)
    
    const { data, error } = await supabase
    .from('garage_vehicle_info')
    .update({ image_urls: fixed_array })
    .eq('id', id)
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "deleted image"}))
}