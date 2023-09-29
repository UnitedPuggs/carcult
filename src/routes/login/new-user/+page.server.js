import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    const { session } = await parent();
    const req = await fetch(`https://carcult-git-mvp-unitedpuggs.vercel.app/api/login?email=${session.user.email}`);
    const res = await req.json();
    let username = res[0].username;
    if(username != null && username != '') {
        throw redirect(302, '/')
    }
}