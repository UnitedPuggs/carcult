import { supabase } from '$lib/supabase'

export async function load({ params, locals }) {
    const session = await locals.getSession();

    let { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', session.user.name)

    console.log()
    if(error)
        return {"load": error};

    return {garage: garage}
}