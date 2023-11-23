import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const form_data = await request.formData();
    const session = await locals.getSession();
    const supabase = await client(session)

    const id = form_data.get("id");
    const vehc = form_data.get("vehc_short");
    const image = form_data.get("file");

    let url = `${session.user.displayname}/${vehc}/${crypto.randomUUID()}-${image.name}`;

    if(image && typeof image.name !== 'undefined') {
        const { upload_data, error } = await supabase
        .storage
        .from('garage_photos')
        .upload(url, image, {
            cacheControl: '15552000',
            upsert: true,
        })

        if(error)
            return new Response(JSON.stringify(error))

        const { data } = await supabase
        .storage
        .from('garage_photos')
        .getPublicUrl(url);

        let { data: image_data, image_error } = await supabase
        .from('garage_vehicle_info')
        .select('image_urls')
        .eq('id', id);
        
        let img_urls = image_data[0].image_urls;
        img_urls.push(data.publicUrl)
        
        const { update_urls, update_error } = await supabase
        .from('garage_vehicle_info')
        .update({ image_urls: img_urls })
        .eq('id', id)
        .select();
        return new Response(JSON.stringify({message: "image uploaded"}))
    }
    return new Response(JSON.stringify({error: "no image"}))
}