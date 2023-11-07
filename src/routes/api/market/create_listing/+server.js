import { supabase } from '$lib/supabase'
import { generate } from 'random-words'

async function upload_image(id, file) {
    const url = `${id}/${file.name}`
    const { data, error } = await supabase
    .storage
    .from('marketplace_photos')
    .upload(url, file, {
        cacheControl: '15552000'
    })

    if(error) {
        console.log(error)
        return;
    } else {
        return data.path;
    }
}


export async function POST({ request, locals }) {
    const form_data = await request.formData();
    const session = await locals.getSession();

    const title = form_data.get('title')
    const price = form_data.get('price')
    const description = form_data.get('description')
    const images = form_data.getAll('images')

    let words = generate({ exactly: 3 })
    const id = words.join("-")

    const urls = await Promise.all(images.map(async image => {
        const req = await upload_image(id, image)
        return `https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/marketplace_photos/${req}`
    }))

    const { data, error } = await supabase
    .from('marketplace_listings')
    .insert([
        { 
            id: id,
            seller: session.user.displayname,
            item_name: title,
            price: price,
            item_description: description,
            listing_pics: urls
        }
    ])
    .select()

    if(error)
        return error
    else
        return new Response({status: 200})
}