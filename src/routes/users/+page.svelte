<script>
    import UserCard from "$lib/users/UserCard.svelte";

    let username_search;
    let users_found = [];

    //by default we assume users are found
    let found_flag = true;

    async function search_users() {
        const req = await fetch(`/api/users/search_users?username=${username_search}`)
        const res = await req.json();
        users_found = res.users;
        users_found = users_found;

        if(users_found.length == 0)
            found_flag = false;
    }
</script>

<svelte:head>
    <title>carcult user search</title>
</svelte:head>

<div class="flex flex-col mt-10 mb-2">
    <form class="flex flex-row justify-center items-center gap-2 border-2 border-black rounded-xl offset-box p-2 w-fit mx-auto" on:submit={ search_users }>
        <input type="search" class="text-black p-1 border border-black rounded-md shadow" placeholder="find a carcultist" bind:value={username_search}>
        <input type="submit" class="hover:opacity-80 active:scale-95 cursor-pointer border border-black rounded-lg p-1 box transition-all hover:no-box hover:translate-y-0 -translate-y-1" value="&#128269">
    </form>
    {#if users_found.length > 0}
        <div class="flex flex-col mt-4 gap-2">
            {#each users_found as user}
                <UserCard 
                username={user.username} 
                pfp_url={user.pfp_url}
                followers={user.follower_count}
                following={user.following_count}
                />
            {/each}
        </div>
    {:else if !found_flag}
        <h1 class="font-bold text-3xl text-center mt-5">no users found :(</h1>
    {/if}   
</div>