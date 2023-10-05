import { supabase } from '$lib/supabase.js'

export async function POST({ request }) {
    const { followed, follower } = await request.json();

    const { data, error } = await supabase
    .from('garage_followers')
    .insert([{followed, follower}])
    .select()

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify({message: "following"}))
}