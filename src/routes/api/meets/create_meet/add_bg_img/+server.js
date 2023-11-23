import { client } from '$lib/public_supabase'

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session);
    const form_data = await request.formData();

    const image = form_data.get('bg');
    const slug = form_data.get('slug');

    let url = `${slug}/${image.name}`

    if(image && typeof image.name !== "undefined") {
        const { upload, upload_error } = await supabase
        .storage
        .from('event_photos')
        .upload(url, image, {
            cacheControl: '15552000',
        })

        if(upload_error)
            return new Response(JSON.stringify(upload_error))

        const { data } = supabase
        .storage
        .from('event_photos')
        .getPublicUrl(url)

        const { img_url, update_error } = await supabase
        .from('meets')
        .update({ bg_img: data.publicUrl })
        .eq('slug', slug)
        .select();

        if(update_error)
            return new Response(JSON.stringify(update_error))
    }

    return new Response({status: 200, message: "image uploaded"})
}