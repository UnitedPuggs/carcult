import { supabase } from '$lib/supabase.js';

export async function GET({ url }) {
    const email = url.searchParams.get('email')

    const {data: user, error} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)

    if(error)
        return new Response(JSON.stringify(error));

    return new Response(JSON.stringify(user))
}