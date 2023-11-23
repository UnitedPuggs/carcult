import { client } from '$lib/public_supabase.js'

export async function DELETE({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { id, url, imgs } = await request.json();

    let stringy_url = [String(url.substring(80))]

    console.log(stringy_url)
    
    const { delete_error } = await supabase
    .storage
    .from('garage_photos')
    .remove(stringy_url)

    if(delete_error)
        return new Response(JSON.stringify(delete_error))

    const fixed_array = imgs.filter(e => e !== url)
    
    const { error } = await supabase
    .from('garage_vehicle_info')
    .update({ image_urls: fixed_array })
    .eq('id', id)

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "deleted image"}))
}