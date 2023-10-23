import { supabase } from '$lib/supabase'

export async function GET({ url }) {
    const username = await url.searchParams.get('username')

    let { data: users, error } = await supabase
    .from('garage')
    .select('username, pfp_url')
    .ilike('username', `%${username}%`)

    if(error)
        return new Response(JSON.stringify({ status: 400, error: error }))

    return new Response(JSON.stringify({ status: 200, users }))
}