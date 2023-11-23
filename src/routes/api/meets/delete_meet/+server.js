import { client } from '$lib/public_supabase';

export async function DELETE({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session)
    const { id, slug } = await request.json();

    const { error } = await supabase
    .from('meets')
    .delete()
    .eq('id', id);

    if(error)
        return new Response({ status: 400, error: error })
    
    const { data: list, img_error } = await supabase
    .storage
    .from('event_photos')
    .list(slug)
    
    if(img_error)
        return new Response(img_error)

    const remove_these = list.map((img) => `${slug}/${img.name}`)

    const { remove_img_err } = await supabase
    .storage
    .from('event_photos')
    .remove(remove_these)

    if(remove_img_err)
        return new Response(remove_img_err)

    return new Response(JSON.stringify({status: 204}))
}