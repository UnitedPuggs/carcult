<script>
    import UserCard from "$lib/users/UserCard.svelte";

    let username_search;
    let users_found;

    async function search_users() {
        const req = await fetch(`/api/users/search_users?username=${username_search}`)
        const res = await req.json();
        users_found = res.users;
        users_found = users_found;
    }


</script>

<div class="flex flex-col mt-10">
    <form class="flex flex-row justify-center items-center gap-4">
        <input type="search" class="text-black px-1 py-0.5" placeholder="username here" bind:value={username_search}>
        <input type="submit" class="hover:opacity-75 cursor-pointer" on:click={search_users} value="search">
    </form>
    {#if users_found}
        <div class="flex flex-col mt-4">
            {#each users_found as user}
                <UserCard username={user.username} pfp_url={user.pfp_url}/>
            {/each}
        </div>
    {/if}
</div>