export async function load({ parent }) {
    const { session } = await parent()
    
    if(session) {
        const req = await fetch(`https://carcult-git-mvp-unitedpuggs.vercel.app/api/login?email=${session.user.email}`);
        const res = await req.json();
        session.user.displayname = res[0].username;
    }
}