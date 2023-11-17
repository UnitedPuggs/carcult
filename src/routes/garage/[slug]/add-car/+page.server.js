import { supabase } from '$lib/supabase.js'
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        const formdata = await request.formData();
        const session = await locals.getSession();

        const image = formdata.get('file');
        const model = formdata.get('car');
        const desc = formdata.get('desc');

        const randmod = Math.floor(Math.random() * 1000000);
       
        let url = `${session.user.displayname}/${model.replace(/\s+/g, '').trim()}-${randmod}/${image.name}`
        
        if(image && image.name != "undefined") {
            console.log(image.name)
            const { data, error } = await supabase
            .storage
            .from('garage_photos')
            .upload(url, image, {
                cacheControl: '15552000',
                upsert: true,
            });
            if(error)
                return { error };
        } else {
            url = "default.jpg" //we're using the default image stored in the garage_photos bucket if no image is found
        }

        const { data } = supabase
        .storage
        .from('garage_photos')
        .getPublicUrl(url);

        const public_url = [String(data.publicUrl)];

        const { car_data, car_error } = await supabase
        .from('garage_vehicle_info')
        .insert([
            { 
                vehicle_name: model, 
                short_vehicle_name: `${model.replace(/\s+/g, '').trim()}-${randmod}`, 
                username: session.user.displayname, 
                image_urls: public_url, 
                description: desc 
            }
        ])
        .select()

        if(car_error)
            console.log(car_error)

        throw redirect(302, `/garage/${session.user.displayname}`)
    }
}