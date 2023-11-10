import { supabase } from '$lib/supabase'

let images = []

export async function DELETE({ request }) {
    const { id } = await request.json()
    
    const { error } = await supabase
    .from('marketplace_listings')
    .delete()
    .eq('id', id)

    if(error)   
        return new Response({status: 500, error})

    const { data: list, fuck_this_error } = await supabase
    .storage
    .from('marketplace_photos')
    .list(id)

    const remove_these = list.map((img) => `${id}/${img.name}`)

    console.log(remove_these)

    const { data, img_error } = await supabase
    .storage
    .from('marketplace_photos')
    .remove(remove_these)

    if(img_error)
        return new Response({status: 500, img_error})
    else    
        return new Response(JSON.stringify({status: 200}))
}