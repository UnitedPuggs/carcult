import { client } from '$lib/public_supabase'

export async function PATCH({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { id, new_status } = await request.json();

    const { data, error } = await supabase
    .from('marketplace_listings')
    .update({ is_live: new_status})
    .eq('id', id)
    .select()

    if(error)
        return new Response(JSON.stringify(error))
    else
        return new Response(JSON.stringify({ status: 200 }))
}