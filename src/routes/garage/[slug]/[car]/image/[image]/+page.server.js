import { supabase } from '$lib/supabase.js';

export const actions = {
    setMain: async({ request }) => {

    }
}

export async function load({ params }) {
    let { data: image_urls, error } = await supabase
    .from('garage_vehicle_info')
    .select('id, username, image_urls')
    .eq('short_vehicle_name', params.car);

    const id = image_urls[0].id;

    let { data: stats, stats_error } = await supabase
    .from('garage_images')
    .select('*')
    .eq('vehicle_id', id)
    .eq('slug', params.image);

    return {
        image_urls,
        stats
    };
}