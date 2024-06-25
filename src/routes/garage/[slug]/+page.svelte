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

    async function toggle_edit() {
        edit_mode = !edit_mode
    }

    async function update_profile() {
        const form_data = new FormData();
        form_data.append("bio", bio);
        form_data.append("file", file)


        await fetch("/api/garage/update_profile", {
            method: "POST",
            body: form_data,
        });

        edit_mode = false;
        invalidateAll();
    }

    const uploaded_file = (e) => {
        let img = e.target.files[0];
        file = img; //since we need to use our "file" value for the endpoint :)
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = e => {
            temp_pfp = e.target.result;
        };
    }

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
    <title>carcult - {short.username}'s garage</title>
</svelte:head>

<div class="flex flex-col lg:flex-row flex-nowrap">
    <div class="flex lg:flex-col flex-row lg:w-[150px] lg:max-w-xs lg:min-w-[20rem] lg:min-h-[calc(100vh_-_6rem)] p-2 border-white border-2">
        <div class="flex flex-col gap-2 justify-center items-center mx-auto">
            {#if $page.data.session?.user.displayname == short.username}
            <div class="flex gap-4">
                <button class="hover:opacity-75 border border-white rounded-sm p-1 hover:scale-95" on:click={toggle_edit}>edit</button>
                {#if edit_mode}
                    <button class="hover:opacity-75 border border-white rounded-sm p-1 hover:scale-95" on:click={update_profile}>save</button>
                {/if}
            </div>
            {/if}
            {#if !edit_mode}
                <img src={short.pfp_url} alt="your profile pic" class="rounded-full border-white border-4 lg:mt-6 w-[100px] h-[94.22px] lg:w-[150px] lg:h-[146.22px]" width="150" height="150"/>
            {:else}
                <label>
                    <input type="file" class="hidden" accept="image/*" bind:value={temp_pfp} on:change={(e) => uploaded_file(e)} />
                    <img src={temp_pfp ? temp_pfp : "/assets/user_profile.png"} alt="" class="lg:mt-6 rounded-full border-4 border-white w-[100px] h-[94.22px] lg:w-[150px] lg:h-[146.22px] cursor-pointer">
                </label>
            {/if}
            <h1 class="text-xl font-semibold lg:text-2xl mt-2">{short.username}</h1>
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
            {#await data.streamed.garage_info}
                <p class="text-center">loading vehicles...</p>
            {:then garage_info}
                {#if garage_info.length > 0}
                    <h1 class="font-semibold mt-12 text-xl">Owner of:</h1>
                    <div class="flex flex-col text-center">
                        {#each garage_info as vehicles}
                            <span>{vehicles.vehicle_name}</span>
                        {/each}
                    </div>
                {/if}
            {/await}
        </div>
    </div>

    <!-- Vehicle info/images from garage_vehicle_info table -->
    <div class="grow">
        {#await data.streamed.garage_info}
            <p class="text-center">loading vehicles...</p>
        {:then garage_info}
            {#if garage_info}
                {#each garage_info as info}
                    <VehicleBox main_image={info.image_urls[0]} vehicle_name={info.vehicle_name} vehicle_slug={info.short_vehicle_name} desc={info.description} info_id={info.id}/>
                {/each}
            {/if}
        {/await}
    </div>
</div>