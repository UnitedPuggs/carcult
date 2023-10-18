import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, SUPABASE_URL, SUPABASE_SECRET } from '$env/static/private';
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { supabase } from '$lib/supabase'

async function get_username(email) {
    const { data: users, error } = await supabase
    .from('users')
    .select('username')
    .eq('email', email)

    if(error)
        return error;

    return users;
}

async function get_role(username) {
    const { data: roles, error } = await supabase
    .from('roles')
    .select('role')
    .eq('username', username)

    if(error)
        return error;

    return roles;
}

export const handle = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [Discord({clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET}), Google({clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET})],
        session: {
            maxAge: 14 * 24 * 60 * 60,
            updateAge: 1 * 24 * 60 * 60
        },
        callbacks: {
            session: async(session) => {
                if(!session) return;

                const user = await get_username(session.user.email);
                let displayname = await user[0].username;
                session.user.displayname = displayname;

                const role = await get_role(session.user.displayname)
                let user_role = await role[0].role;
                session.user.role = user_role;
                return session;
            }
        },
        adapter: SupabaseAdapter({
            url: SUPABASE_URL,
            secret: SUPABASE_SECRET,
        }),
        trustHost: true,
        secret: AUTH_SECRET,
    }
    return authOptions;
})