import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, SUPABASE_URL, SUPABASE_SECRET } from '$env/static/private';
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const handle = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [Discord({clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET}), Google({clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET})],
        session: {
            maxAge: 14 * 24 * 60 * 60,
            updateAge: 1 * 24 * 60 * 60
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