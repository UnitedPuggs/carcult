import { supabase } from '$lib/supabase';

export const actions = {
    updateProfile: async({ locals, request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        console.log(data);

        const session = await locals.getSession();

        const url = `${session.user.displayname}/pfp-${data.pfp.name}`;

        if (data.pfp && data.pfp.size > 0) {
            //GETTING CURRENT PFP
            const { data: list, list_error } = await supabase
            .storage
            .from('profile_photos')
            .list(`${session.user.displayname}`);

            if (list_error) {
                return `Error retrieving profile pics list: ${list_error}`;
            }
            /**********************/

            const removing = list.map((pics) => `${session.user.displayname}/${pics.name}`);

            //REMOVING CURRENT PFP
            const { remove_error } = await supabase
            .storage
            .from('profile_photos')
            .remove(removing);

            if(remove_error) {
                return `Error removing profile pics: ${remove_error}`;
            }
            /********************/

            //ADDING NEW PFP
            const { error } = await supabase
            .storage
            .from('profile_photos')
            .upload(url, data.pfp, {
                cacheControl: '300',
                upsert: true,
            });
            /*******************/
            if (error) {
                return `Error adding new profile pic: ${error}`;
            }

            //ADDING URL TO GARAGE TABLE
            const { data: pfp_url } = supabase
            .storage
            .from('profile_photos')
            .getPublicUrl(url);

            const { error: pfp_error } = await supabase
            .from('garage')
            .update({ pfp_url: pfp_url.publicUrl })
            .eq("username", session.user.displayname)
            .select();

            //console.log(`data uploaded ${uploaded} and user is ${session.user.displayname}`)
            /*******************/

            if (pfp_error) {
                return `Error updating user config with new url: ${pfp_error}`
            }
        }

        if (data.bio) {
            const { error } = await supabase
            .from('garage')
            .update({ bio: data.bio })
            .eq("username", session.user.displayname)
            .select();

            if (error) {
                return `Error updating bio: ${error}`;
            }
        }
    }
}

export async function load({ params, locals }) {
    const session = await locals.getSession();

    let { data: garage, error } = await supabase
    .from('garage')
    .select('username, bio, pfp_url')
    .eq('username', params.slug);

    if(error)
        return { error };

    garage = garage[0];

    return {
        garage
    };
}