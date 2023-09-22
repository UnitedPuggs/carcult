import { supabase } from '$lib/supabase.js'

export const actions = {
    default: async ({ request, locals }) => {
        const formdata = await request.formData();
        const session = await locals.getSession()
        const image = formdata.get('file')
        
        const url = session.user.displayname + "/" + image.name;
        
        const { data, error } = await supabase
        .storage
        .from('garage_photos')
        .upload(url, image, {
            cacheControl: '3600',
            upsert: true,
        })

        if(error)
            return { error };

        return { data };
    }
}