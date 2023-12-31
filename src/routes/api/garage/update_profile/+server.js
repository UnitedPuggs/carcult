import { client } from '$lib/public_supabase.js'

export async function POST({ request, locals }) {
    const formdata = await request.formData();
    const session = await locals.getSession();

    const supabase = await client(session)
    
    const image = formdata.get("file");
    const bio = formdata.get("bio")

    let url = session.user.displayname + "/pfp-" + image.name;

    if(image && typeof image.name !== "undefined") {
        const { data: list, list_error } = await supabase
        .storage
        .from('profile_photos')
        .list(`${session.user.displayname}`)

        const file_to_remove = list.map((pics) => `${session.user.displayname}/${pics.name}`)

        const { remove_data, remove_error } = await supabase
        .storage
        .from('profile_photos')
        .remove(file_to_remove)

        const { upload_data, error } = await supabase
        .storage
        .from('profile_photos')
        .upload(url, image, {
            cacheControl: '300',
            upsert: true,
        });

        if(error)
            return new Response(JSON.stringify(error))

        const { data } = supabase
        .storage
        .from('profile_photos')
        .getPublicUrl(url);

        const { pfp_data, pfp_error } = await supabase
        .from('garage')
        .update({ pfp_url: data.publicUrl })
        .eq("username", session.user.displayname)
        .select()

        if(pfp_error)
            return new Response(JSON.stringify(pfp_error))
    }

    if(bio) {
        const { data, error } = await supabase
        .from('garage')
        .update({ bio: bio })
        .eq("username", session.user.displayname)
        .select()
        
        if(error)
            return new Response(JSON.stringify(error))
    }


    return new Response(JSON.stringify({message: "updated user profile"}));
}