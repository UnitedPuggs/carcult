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

<div class="flex flex-col mt-10">
    <form class="flex flex-row justify-center items-center gap-2 border p-2 rounded-sm w-fit mx-auto" on:submit={search_users}>
        <input type="search" class="text-black p-1" placeholder="username here" bind:value={username_search}>
        <input type="submit" class="hover:opacity-75 active:scale-95 cursor-pointer border p-1 rounded-sm" value="search">
    </form>
    {#if users_found.length > 0}
        <div class="flex flex-col mt-4">
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
        <h1 class="font-bold text-3xl text-center mt-5">no users found</h1>
    {/if}   
</div>