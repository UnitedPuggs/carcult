import { client } from '$lib/public_supabase';

export async function PATCH({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
    const { id, event_name, description, event_date } = await request.json();

    const { error } = await supabase
    .from('meets')
    .update({ event_name, event_date, description })
    .eq('id', id)

    if(error)
        return new Response({status: 400, error: error})

    return new Response({status: 200, message: "updated meet"})
}