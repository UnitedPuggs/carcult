import { supabase } from '$lib/supabase'

export async function load({ locals }) {
    const session = await locals.getSession();

    let { data: group_messages, error } = await supabase
    .from('grouped_messages')
    .select('chat_id, listing_id')
    .or(`send_user.eq.${session.user.displayname}, receive_user.eq.${session.user.displayname}`)

    if(error)
        return { "load": error }
    else
        return { group_messages }
}