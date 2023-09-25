import { supabase } from '$lib/supabase'

export async function load({ params }) {

    let { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', params.slug)

    if(error)
        return {"load": error};

    let { data: garage_vehicle_info, garage_error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('username', params.slug)

    if(garage_error)
        return {"load": garage_error}
    
    //yeah, dunno if this is the best way to get it done, but it does get it done

    return {garage: garage, garage_info: garage_vehicle_info}
}