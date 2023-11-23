import { supabase } from '$lib/supabase.js'

export async function GET({ url }) {
    //I don't think this is being used at all lmao
    const un = url.searchParams.get("username");
    const { data: garage, error } = await supabase
    .from('garage')
    .select('*')
    .eq('username', un)

    if(error)
        return new Response(JSON.stringify(error))

    return new Response(JSON.stringify(garage))
}