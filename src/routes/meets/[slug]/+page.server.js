import { supabase } from '$lib/supabase.js'

export async function load({ params }) {
    let { data: events, error } = await supabase
    .from('meets')
    .select('*')
    .eq('slug', params.slug)

    if(error)
        return { error }

    return { events: events }
}