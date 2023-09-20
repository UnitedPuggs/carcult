import { supabase } from '$lib/supabase.js'

export async function PATCH({ request }) {
    const { email, username } = await request.json();

    const { error } = await supabase
    .from('users')
    .update({username: username})
    .eq('email', email);

    if(error)
        return new Response(JSON.stringify(error));

    return new Response(JSON.stringify({message: "Username established"}));
}