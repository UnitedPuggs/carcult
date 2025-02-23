import { client } from '$lib/public_supabase.js'

export async function DELETE({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { id, url, images } = await request.json();

    console.log(images);

    const { storage_error } = await supabase
    .storage
    .from('garage_photos')
    .remove([String(url.substring(80))]); // Because supabase sdk is retarded and needs [folder/filename] and can't use URL wtf

    if(storage_error) {
        return new Response(JSON.stringify({ error: storage_error}, { status: 400 }));
    }

    const FIXED_ARRAY = images.filter(e => e !== url);
    console.log(FIXED_ARRAY);

    const { gv_error } = await supabase
    .from('garage_vehicle_info')
    .update({ image_urls: FIXED_ARRAY })
    .eq('id', id);

    if(gv_error) {
        return new Response(JSON.stringify({ error: gv_error }, { status: 400 }));
    }

    const { gi_error } = await supabase
    .from('garage_images')
    .delete()
    .eq('vehicle_id', id)
    .eq('image_url', url);

    if(gi_error) {
        return new Response(JSON.stringify({ error: gi_error }, { status: 400 }));
    }

    return new Response(JSON.stringify({ status: 200 }));
}