import { client } from '$lib/public_supabase.js'

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const supabase = await client(session);
    
    const { meets } = await request.json();

    const { data, error } = await supabase
    .from('meets')
    .insert(meets)
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify(data))
}