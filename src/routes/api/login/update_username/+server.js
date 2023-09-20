import { supabase } from '$lib/supabase.js'

export async function PATCH({ request }) {
    const { email, username } = await request.json();
    let cleaned_user = username.replace(' ', '');

    const { error } = await supabase
    .from('users')
    .update({username: cleaned_user})
    .eq('email', email);

    if(error)
        return new Response(JSON.stringify(error));

    return new Response(JSON.stringify({message: "Username established"}));
}