<script>
    import { page } from '$app/stores'
    import VehicleBox from '$lib/garage/VehicleBox.svelte'
    export let data;
    $: short = data.garage[0];
    $: shorter = data.garage_info;
</script>

<svelte:head>
    <title>{short.username}'s garage</title>
</svelte:head>

<div class="flex flex-row flex-nowrap">
    <div class="flex flex-col justify-start items-start max-w-[200px] min-w-[200px] md:max-w-xs md:min-w-[20rem] h-[93.2vh] md:w-[calc(100vh_-_3.5rem)] p-2 border-white border-2">
        <div class="flex flex-col justify-center items-center mx-auto">
            <img src="/assets/Hulk_Hogan.jpg" alt="/assets/Hulk_Hogan.jpg" class="rounded-full border-white border-4 md:mt-6" width="150" height="150"/>
            <h1 class="text-2xl mt-2">{short.username}</h1>
            <h1 class="font-semibold mt-12 text-xl">Joined:</h1>
            <span>{short.created.substring(0, 10)}</span>
            <h1 class="font-semibold mt-12 text-xl">Bio:</h1>
            {#if short.bio}
                <span>{short.bio}</span>
            {/if}
            <h1 class="font-semibold mt-12 text-xl">Owner of:</h1>
            {#if shorter}
                {#each shorter as vehicles}
                    <span>{vehicles.vehicle_name}</span>
                {/each}
            {/if}
        </div>
    </div>
    <!-- Vehicle info/images from garage_vehicle_info table -->
    <div class="flex flex-wrap flex-col items-center justify-start mx-auto">
        {#if shorter}
            {#each shorter as info}
                <VehicleBox main_image={info.image_urls[0]} vehicle_name={info.vehicle_name} desc={info.description}/>
            {/each}
        {/if}
        <a href="{$page.url.pathname}/add-car" class="hover:opacity-75">add car</a>
    </div>
</div>