<script>
    import { page } from '$app/stores'
    import { invalidateAll } from '$app/navigation';
    import VehicleBox from '$lib/garage/VehicleBox.svelte'
    export let data;

    let file;
    let bio = data.garage[0].bio; //This shit is jank, but it works
    let temp_pfp;
    let edit_mode = false;

    $: follow_status = data.is_following[0];

    $: short = data.garage[0];
    $: shorter = data.garage_info;

    async function toggle_edit() {
        edit_mode = !edit_mode
    }

    async function update_profile() {
        const form_data = new FormData();
        form_data.append("bio", bio);
        form_data.append("file", file)


        const res = await fetch("/api/garage/update_profile", {
            method: "POST",
            body: form_data,
        });

        edit_mode = false;
        invalidateAll();
    }

    const uploaded_file = (e) => {
        let img = e.target.files[0];
        file = img;
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = e => {
            temp_pfp = e.target.result;
        };
    }

    async function follow_user(follower, followed) {
        await fetch('/api/garage/follow_user', {
            method: "POST",
            body: JSON.stringify({follower, followed})
        })
        invalidateAll();
    }
    
    async function unfollow_user(id) {
        await fetch('/api/garage/unfollow_user', {
            method: "DELETE",
            body: JSON.stringify({id})
        })
        invalidateAll();
    }
</script>

<svelte:head>
    <title>{short.username}'s garage</title>
</svelte:head>

<div class="flex flex-row flex-nowrap">
    <div class="w-[150px] lg:max-w-xs lg:min-w-[20rem] min-h-[calc(100vh_-_3.5rem)] p-2 border-white border-2">
        {#if $page.data.session?.user.displayname == short.username}
            <div class="flex justify-between lg:flex-col justify-start items-start">
                <button class="hover:opacity-75" on:click={toggle_edit}>edit</button>
                {#if edit_mode}
                    <button class="hover:opacity-75" on:click={update_profile}>save</button>
                {/if}
            </div>
        {/if}
        <div class="flex flex-col justify-center items-center mx-auto">
            {#if !edit_mode}
                <img src={short.pfp_url} alt="your profile pic" class="rounded-full border-white border-4 lg:mt-6 w-[100px] h-[94.22px] lg:w-[150px] lg:h-[146.22px]" width="150" height="150"/>
            {:else}
            <label>
                <input type="file" class="hidden" bind:value={temp_pfp} on:change={(e) => uploaded_file(e)} />
                <img src={temp_pfp} alt="" class="rounded-full border-4 border-white w-[100px] h-[94.22px] lg:w-[150px] lg:h-[146.22px] cursor-pointer">
            </label>
            {/if}
            <h1 class="text-xl font-semibold lg:text-2xl mt-2">{short.username}</h1>
            <!-- Let's see if this might be worth it -->
            <section class="flex-wrap max-w-[7rem] lg:max-w-[15rem] mt-2 text-center">
                <a href="{$page.url.pathname}/followers">{short.follower_count} followers</a>
                <a href="{$page.url.pathname}/following">{short.following_count} following</a>
            </section>
            {#if $page.data.session?.user.displayname != short.username && $page.data.session?.user && typeof follow_status === 'undefined'}
                <button class="border-2 px-2 py-1 rounded-md mt-4 hover:opacity-75" on:click={() => follow_user($page.data.session.user.displayname, $page.params.slug)}>follow</button>
            {:else if $page.data.session?.user.displayname != short.username && $page.data.session?.user && typeof follow_status !== 'undefined'}
                <button class="border-2 px-2 py-1 rounded-md mt-4 hover:opacity-75" on:click={() => unfollow_user(follow_status.id)}>unfollow</button>
            {/if}
            <h1 class="font-semibold mt-12 text-xl">Joined:</h1>
            <span>{short.created.substring(0, 10)}</span>
            {#if short.bio}
                <h1 class="font-semibold mt-12 text-xl">Bio:</h1>
                {#if !edit_mode}
                    <span class="lg:max-w-[15rem] text-center">{short.bio}</span>
                {:else}
                    <textarea class="p-1 text-black lg:-mb-8 w-full" placeholder="your bio here" bind:value={bio}></textarea>
                {/if}
            {:else}
                {#if edit_mode}
                    <h1 class="font-semibold mt-12 text-xl">Bio:</h1>
                    <textarea class="p-1 text-black lg:-mb-8 w-full" placeholder="your bio here" bind:value={bio}></textarea>
                {/if}
            {/if}
            {#if shorter.length > 0}
                <h1 class="font-semibold mt-12 text-xl">Owner of:</h1>
                <div class="flex flex-col text-center">
                    {#each shorter as vehicles}
                        <span>{vehicles.vehicle_name}</span>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <!-- Vehicle info/images from garage_vehicle_info table -->
    <div class="grow">
        {#if shorter}
            {#each shorter as info}
                <VehicleBox main_image={info.image_urls[0]} vehicle_name={info.vehicle_name} vehicle_slug={info.short_vehicle_name} desc={info.description} info_id={info.id}/>
            {/each}
        {/if}
        {#if $page.data.session?.user.displayname == short.username}
            <!-- need to move functionality from this to navbar -->
            <a href="{$page.url.pathname}/add-car" 
            class="flex hover:opacity-75 border-2 border-white min-h-[200px] max-h-[200px] grow text-3xl font-bold justify-center items-center mx-auto">
            + <!-- hello there :) -->
            </a>
        {/if}
    </div>
</div>