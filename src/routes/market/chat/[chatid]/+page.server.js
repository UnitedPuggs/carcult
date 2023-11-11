import { supabase } from '$lib/supabase'

export async function load({ params }) {
    let { data: marketplace_messages, error } = await supabase
    .from('marketplace_messages')
    .select('*')
    .eq('chat_id', params.chatid)
    .range(0, 10)

    if(error)
        return { "load": error }
    else
        return { marketplace_messages }
}