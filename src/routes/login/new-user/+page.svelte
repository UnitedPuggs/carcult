<script>
    import { goto } from '$app/navigation';

    let username;
    export let data;
    const email = data.session.user.email;

    async function assign_username() {
        const req = await fetch("/api/login/update_username", {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, username: username.replace(' ', '')})
        })
        data.session.user.displayname = username.replace(' ', '');
        data.session.user.role = 0;
        goto('/')
    }
</script>

<div class="flex flex-col justify-center items-center mt-4">
    <label for="display_name" class="font-bold">Choose a username:</label>
    <form class="flex flex-col">
        <input id="display_name" type="text" placeholder="username here" class="rounded-sm py-0.5 px-1 text-black mt-1" required bind:value={username}>
        <input type="submit" class="mt-2 font-bold hover:opacity-75" value="Submit" on:click={assign_username}>
    </form>
</div>