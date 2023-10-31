import { redirect } from '@sveltejs/kit';

export async function load({ fetch, parent }) {
    const { session } = await parent();
    //Pretty sure there's a way I can avoid having a hard-coded url here, but I kinda forgot
    // ^^ fetch thingy as part of the sveltekit api
    const req = await fetch(`/api/login?email=${session.user.email}`);
    const res = await req.json();
    let username = res[0].username;
    if(username != null && username != '') {
        throw redirect(302, '/')
    }
}