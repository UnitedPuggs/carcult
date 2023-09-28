import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: garage_vehicle_info, error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('vehicle_name', params.car)
    .eq('username', params.slug)

    if(error)
        return {"load": error};

    return { garage_info: garage_vehicle_info };
}