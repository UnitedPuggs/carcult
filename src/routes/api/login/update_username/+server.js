import { client } from '$lib/public_supabase.js'

export async function PATCH({ request, locals }) {
    const session = await locals.getSession()
    const supabase = await client(session)
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