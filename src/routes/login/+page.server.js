import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
    const { session } = await parent()
    if(session) {
        redirect(302, "/login/new-user");
    }

    return {}
}