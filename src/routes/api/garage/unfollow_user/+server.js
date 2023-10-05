import { supabase } from '$lib/supabase.js'

export async function DELETE({ request }) {
    const { id } = await request.json()
    
    const { error } = await supabase
    .from('garage_followers')
    .delete()
    .eq('id', id)

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "unfollowed user"}))
}