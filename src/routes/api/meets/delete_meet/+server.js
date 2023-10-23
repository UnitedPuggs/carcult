import { supabase } from '$lib/supabase';

export async function DELETE({ request, locals }) {
    const session = await locals.getSession();
    const { id, host } = await request.json();

    if(session.user.displayname == host) {
        const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

        if(error)
            return new Response({ status: 400, error: error })
        
        return new Response({status: 200, message: "event deleted"})
    } else {
        return new Response({status: 405, error: "user not host"});
    }
}