import { supabase } from '$lib/supabase'
import { client } from '$lib/public_supabase'

async function upload_image(id, file) {
    const url = `${id}/${file.name}`
    const { data, error } = await supabase
    .storage
    .from('marketplace_photos')
    .upload(url, file, {
        cacheControl: '15552000',
        upsert: true
    })

    if(error) {
        console.log(error)
        return;
    } else {
        return data.path;
    }
}

export async function PATCH({ request, locals }) {
    const form_data = await request.formData()
    const session = await locals.getSession()
    const supabase = await client(session)

    const id = form_data.get('id')
    const title = form_data.get('title');
    const price = form_data.get('price');
    const description = form_data.get('description');
    const mileage = form_data.get('mileage');
    const title_status = form_data.get('title_status');
    const transmission = form_data.get('transmission');
    const zip = form_data.get('zip');
    const images = form_data.getAll('images')
    const orig_images = form_data.getAll('img_arr')

    const urls = await Promise.all(images.map(async image => {
        const req = await upload_image(id, image)
        return `https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/marketplace_photos/${req}`
    }))

    orig_images.push(...urls)

    const { error } = await supabase
    .from('marketplace_listings')
    .update([{
        item_name: title,
        price: price,
        item_description: description,
        mileage: mileage,
        title_status: title_status,
        transmission: transmission,
        zip: zip,
        listing_pics: orig_images
    }])
    .eq('id', id);

    if(error)
        return new Response(JSON.stringify({error: error}))
    else
        return new Response(JSON.stringify({status: 204}))
}