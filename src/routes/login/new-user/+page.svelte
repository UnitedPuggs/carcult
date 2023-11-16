<script>
    import { goto } from '$app/navigation';

    let username;
    const date = new Date().toISOString();
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

<svelte:head>
    <title>carcult | creating your account!</title>
</svelte:head>

<div class="flex flex-col gap-2 justify-center items-center lg:mt-4 border border-white w-fit mx-auto py-4 px-20">
    <img src="/assets/Hulk_Hogan.jpg" alt="hogan" class="w-[100px] h-[94.22px] lg:w-[150px] lg:h-[146.22px] rounded-full border-2 border-white" />
    <h2 class="text-xl">{username ? username : "your username here"}</h2>
    <h3 class="font-bold text-lg">Joined:</h3>
    <span>{date.substring(0, 10)}</span>
    <form class="flex flex-col" on:submit={assign_username}>
        <input id="display_name" type="text" placeholder="type in your username" class="rounded-sm py-0.5 px-1 text-black mt-1" required bind:value={username}>
        <input type="submit" class="mt-2 p-2 border bg-gray-800 rounded-sm hover:cursor-pointer hover:opacity-75 active:scale-90" value="choose username">
    </form>
</div>