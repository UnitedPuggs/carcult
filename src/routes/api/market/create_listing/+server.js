import { supabase } from '$lib/supabase'
import { client } from '$lib/public_supabase'
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
    const supabase = await client(session);

    const title = form_data.get('title');
    const price = form_data.get('price');
    const description = form_data.get('description');
    const mileage = form_data.get('mileage');
    //console.log(mileage)
    const title_status = form_data.get('title_status');
    const transmission = form_data.get('transmission');
    const images = form_data.getAll('images')

    let words = generate({ exactly: 3 })
    const id = words.join("-")

    //Might be best to just update the row with the urls after a "success"

    const urls = await Promise.all(images.map(async image => {
        const req = await upload_image(id, image)
        return `https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/marketplace_photos/${req}`
    }))

    const { error } = await supabase
    .from('marketplace_listings')
    .insert([
        { 
            id: id,
            seller: session.user.displayname,
            item_name: title,
            price: price,
            item_description: description,
            mileage: mileage,
            title_status: title_status,
            transmission: transmission,
            listing_pics: urls
        }
    ]);

    if(error) {
        console.log(error)
        return new Response({ error: error });
    } else
        return new Response({ status: 200 });
}