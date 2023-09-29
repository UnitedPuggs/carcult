<script>
    import { page } from '$app/stores'
    export let data;

    $: short = data.garage_info[0];

    async function delete_vehicle(id) {
        await fetch('/api/garage/delete_vehicle', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
    }
</script>

<div class="flex flex-col mt-10 justify-center items-center">
    <h1 class="text-2xl font-bold">{short.vehicle_name}</h1>
    <img src={short.image_urls[0]} alt="your cool car" class="w-[32rem] h-auto max-h-[296px] object-cover border-2 border-white"/>
    <fieldset class="border-white border">
        <legend class="ml-2 font-bold">description</legend>
        <p class="p-2">{short.description}</p>
    </fieldset>
    {#if $page.data.session?.user.displayname == short.username}
        <button class="mt-2 hover:opacity-75" on:click={() => delete_vehicle(short.id)}>delete</button>
    {/if}
</div>