import { supabase } from '$lib/supabase'

export async function load({ locals }) {
    const session  = await locals.getSession();

    const { data: garage, error } = await supabase
    .from('garage')
    .select('pfp_url')
    .eq('username', session.user.displayname)


    return { garage }
}