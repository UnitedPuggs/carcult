import { supabase } from '$lib/supabase.js'

export const actions = {
    default: async ({ request, locals }) => {
        const formdata = await request.formData();
        const session = await locals.getSession()
        const image = formdata.get('file')
        const model = formdata.get('car')
        const desc = formdata.get('desc')

        const url = session.user.displayname + "/" + image.name;
        
        const { data, error } = await supabase
        .storage
        .from('garage_photos')
        .upload(url, image, {
            cacheControl: '3600',
            upsert: true,
        });

        if(error)
            return { error };

        if(data) {
            const { data } = supabase
            .storage
            .from('garage_photos')
            .getPublicUrl(url);

            const public_url = [String(data.publicUrl)];

        
            const { car_data, car_error } = await supabase
            .from('garage_vehicle_info')
            .insert([
                { vehicle_name: model, username: session.user.displayname, image_urls: public_url, description: desc }
            ])
            .select()

            if(car_error)
                console.log(car_error)
        }

        return { data }
    }
}