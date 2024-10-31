import { supabase } from '$lib/supabase';

export async function load({ params, locals }) {
    const session = await locals.getSession();

    let { data: garage, error } = await supabase
    .from('garage')
    .select('username, bio, pfp_url')
    .eq('username', params.slug);

    if(error)
        return { error };

    garage = garage[0];

    return {
        garage
    };
}