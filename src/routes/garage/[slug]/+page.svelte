<script>
    import { page } from '$app/stores'
    import { invalidateAll } from '$app/navigation';
    import VehicleBox from '$lib/garage/VehicleBox.svelte'
    let { data } = $props();

    let textarea = $state();
    $effect(() => {
        if(textarea) {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    });

    let follow_status = $derived(data.is_following[0]);

    let short = $derived(data.garage[0]);

    async function follow_user(follower, followed) {
        await fetch('/api/garage/follow_user', {
            method: "POST",
            body: JSON.stringify({follower, followed}),
            headers: {
            }
        })
        invalidateAll();
    }
    
    async function unfollow_user(id) {
        await fetch('/api/garage/unfollow_user', {
            method: "DELETE",
            body: JSON.stringify({id}),
            headers: {
                'Authorization': `Bearer ${data.session.supabaseAccessToken}`,
            }
        })
        invalidateAll();
    }
</script>

<svelte:head>
    <title>carcult | {short.username}'s garage</title>
</svelte:head>

<div class="flex flex-col flex-nowrap">
    <section class="flex flex-row gap-2 py-4 justify-center">
        <div class="flex flex-col gap-2 items-center">
            <!-- User profile picture -->
            <img src={short.pfp_url} alt="{short.username}'s profile picture" class="rounded-full h-24 w-24 border border-black box">
            <!------------------------->
            <span class="text-sm text-gray-400">Joined {short.created.substring(5, 7)}/{short.created.substring(8, 10)}/{short.created.substring(2, 4)}</span>
            <!--- FOLLOW LOGIC AND COMPONENTS -->
            {#if $page.data.session?.user.displayname != short.username && $page.data.session?.user && typeof follow_status == 'undefined'} <!-- need to change follow to optimistic rendering -->
                <button 
                class="border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80"
                onclick={() => follow_user($page.data.session.user.displayname, $page.params.slug)}
                >
                follow
                </button>
            {:else if $page.data.session?.user.displayname != short.username && $page.data.session?.user && typeof follow_status !== 'undefined'}
                <button 
                class="border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80"
                onclick={() => unfollow_user(follow_status.id)}
                >
                unfollow
                </button>
            {/if}
            <!--------->
            {#if $page.data.session?.user.displayname == short.username}
                <a href="{short.username}/settings">edit</a>
            {/if}
        </div>
        <div class="flex flex-col">
            <span class="font-semibold text-xl">{short.username}</span>
            <!-- User bio -->
            {#if short.bio}
                <p class="w-48 lg:w-72 max-h-32 overflow-y-auto">{short.bio}</p>
            {/if}
            <!------------->
            {#await data.streamed.garage_info}
                <span>loading...</span> <!-- maybe have an animation of some kind -->
            {:then garage}
                {#if garage.length > 0}
                <span class="font-semibold text-lg">owns:</span>
                <div class="flex flex-col text-sm h-15 overflow-y-auto">
                    {#each garage as vehicle}
                        <span>{vehicle.vehicle_name}</span>
                    {/each}
                </div>
                {/if}
            {/await}
        </div>
        <div> <!--followers and following-->

        </div>
    </section>
    <!-- Vehicle info/images from garage_vehicle_info table -->
    <section>
        {#await data.streamed.garage_info}
            <p class="text-center">loading vehicles...</p>
        {:then garage_info}
            {#if garage_info.length > 0}
                <div class="flex flex-col gap-2 p-1 lg:w-3/4 mx-auto">
                    {#each garage_info as info}
                        <VehicleBox main_image={info.using_main ? info.main_image : info.image_urls[0]} vehicle_name={info.vehicle_name} vehicle_slug={info.short_vehicle_name} desc={info.description} info_id={info.id}/>
                    {/each}
                </div>
            {:else}
                {#if $page.data.session?.user.displayname == $page.params.slug}
                    <div class="flex justify-center items-center">
                        <span class="text-2xl">You have no vehicles! Add one <a href="{$page.data.session?.user.displayname}/add-car" class="underline hover:no-underline">here</a></span>
                    </div>
                {/if}
            {/if}
        {/await}
    </section>
</div>