import { supabase } from '$lib/supabase'

export async function load({ params }) {

    let { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', params.slug)

    if(error)
        return {"load": error};

    return {garage: garage}
}