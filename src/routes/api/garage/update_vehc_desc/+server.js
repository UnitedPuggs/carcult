import { supabase } from '$lib/supabase.js'

export async function PATCH({ request }) {
    const { id, desc } = await request.json();

    if(desc) {
        const { data, error } = await supabase
        .from('garage_vehicle_info')
        .update({ description: desc })
        .eq('id', id)
        .select()

        if(error)
            return new Response(JSON.stringify(error))

        return new Response(JSON.stringify({message: "updated description"}))
    }
}