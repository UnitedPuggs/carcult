import { supabase } from '$lib/supabase.js';

export const actions = {
    setMain: async({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        const { gv_data, error } = await supabase
        .from('garage_vehicle_info')
        .update({
            main_image: data.url
        })
        .eq('id', data.id)
        .select();

        if(error) {
            return `Error setting main image: ${error}`;
        }
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