import { supabase } from '$lib/supabase'

export async function load() {
    const { data: garage, error } = await supabase
    .from('garage')
    .select('*')

    if(error)
        return {"load": error};

    return {garage: garage}
}