import { supabase } from '$lib/supabase'

export const actions = {
    updateDesc: async({ request }) => {

    },
    addImage: async({ request, locals, params }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        const session = await locals.getSession();

        console.log(data);

        const url = `${session.user.displayname}/${params.car}/${data.image.name}-${crypto.randomUUID()}`

        if (data.image && data.image.size > 0) {
            //UPLOADING NEW IMAGE TO BUCKET
            const { error: upload_error } = await supabase
            .storage
            .from('garage_photos')
            .upload(url, data.image, { 
                cacheControl: '15552000',
                upsert: true,
            });

            if (upload_error) {
                return `Error uploading garage photo: ${upload_error}`;
            }
            /***************************/

            //ADDING TO URL ARRAY
            const { data: img_url, error: url_error } = await supabase
            .storage
            .from('garage_photos')
            .getPublicUrl(url);

            if (url_error) {
                return `Error getting url: ${url_error}`;
            }
            
            const { data: garage_vehicle_info, error: gv_info_error } = await supabase
            .from('garage_vehicle_info')
            .select('id')
            .eq('short_vehicle_name', params.car)
            .eq('username', params.slug)
            .range(0, 1);

            if (gv_info_error) {
                return `Error getting garage vehicle info: ${gv_info_error}`;
            }

            const id = garage_vehicle_info[0].id;

            const { data: image_data, error: image_error } = await supabase
            .from('garage_vehicle_info')
            .select('image_urls')
            .eq('id', id);

            if (image_error) {
                return `Error getting gv info urls: ${image_error}`;
            }

            let img_urls = image_data[0].image_urls;
            img_urls.push(img_url.publicUrl);

            const { error: update_error } = await supabase
            .from('garage_vehicle_info')
            .update({ image_urls: img_urls })
            .eq('id', id)
            .select();
            /***********************/

            if (update_error) {
                return `Error updating url array: ${update_error}`;
            }
        }
    }
}

export async function load({ params }) {
    const { data: garage_vehicle_info, error } = await supabase
    .from('garage_vehicle_info')
    .select('*')
    .eq('short_vehicle_name', params.car)
    .eq('username', params.slug)

    if(error)
        return {"load": error};

    return { garage_info: garage_vehicle_info };
}