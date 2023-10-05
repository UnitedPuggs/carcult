import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    const { session } = await parent();
    //Pretty sure there's a way I can avoid having a hard-coded url here, but I kinda forgot
    const req = await fetch(`https://carcult.vercel.app/api/login?email=${session.user.email}`);
    const res = await req.json();
    let username = res[0].username;
    if(username != null && username != '') {
        throw redirect(302, '/')
    }
}