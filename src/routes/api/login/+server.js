import { supabase } from '../../../lib/supabase.js';

export async function GET({ locals }) {
    const session = await locals.getSession();
    let {data: user, error} = await supabase
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    console.log(session.user.email)

    if(error)
        return new Response(JSON.stringify(error));

    return new Response(JSON.stringify(user))
}