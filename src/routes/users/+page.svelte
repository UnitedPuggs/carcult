<script>
    import UserCard from "$lib/users/UserCard.svelte";

    let { data } = $props();

    let username_search = $state();
    let users_found = $state([]);

    $effect(() => {
        if (data.users) {
            users_found = data.users;
        }
    })

    //by default we assume users are found
    let found_flag = $state(true);
</script>

<svelte:head>
    <title>carcult user search</title>
</svelte:head>

<div class="flex flex-col mt-10 mb-2">
    <form class="flex flex-row justify-center items-center gap-2 border-2 border-black rounded-lg offset-box p-2 w-fit mx-auto" method="GET">
        <input name="username" type="search" class="text-black p-1 border border-black rounded-md shadow" placeholder="find a carcultist" bind:value={username_search}>
        <input type="submit" class="btn cursor-pointer hover:translate-y-0 -translate-y-1" value="&#128269">
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