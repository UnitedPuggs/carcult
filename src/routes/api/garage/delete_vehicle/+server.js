import { supabase } from '$lib/supabase.js'

let images = [];

async function parse_url(images_urls) {
    for(let i = 0; i < images_urls.length; i++) {
        if(images_urls[i].substr(80) != "default.jpg")
            images.push(images_urls[i].substr(80))
    }
    console.log(images)
}

export async function DELETE({ request }) {
    const { id } = await request.json();

    let { data: garage_vehicle_info, info_error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('id', id);

    if(info_error)
        return new Response(JSON.stringify(info_error))
    
    if(garage_vehicle_info) {
        await parse_url(garage_vehicle_info[0].image_urls);

        const { error } = await supabase
        .from('garage_vehicle_info')
        .delete()
        .eq('id', id)


        const { delete_data, delete_error } = await supabase
        .storage
        .from('garage_photos') 
        .remove(images)

        if(delete_error)
            return new Response(JSON.stringify(delete_error))

        if(error)
            return new Response(JSON.stringify(error))
    }
    images = [];
    return new Response(JSON.stringify(garage_vehicle_info))
}