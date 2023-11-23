import { client } from '$lib/public_supabase.js'

export async function DELETE({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)

    const { id } = await request.json()
    
    const { error } = await supabase
    .from('garage_followers')
    .delete()
    .eq('id', id)

    if(error)
        return new Response(error)
    else
        return new Response(JSON.stringify({message: "unfollowed user"}))
}