import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
    const { session } = await parent()
    if(session) {
        //console.log(session)
        redirect(302, "/login/new-user");
    }

    return {}
}