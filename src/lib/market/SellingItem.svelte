<script>
    import { invalidateAll } from '$app/navigation'
    let {
        id,
        cover_pic,
        item_name,
        price,
        is_live,
        created_at
    } = $props();

    const date = new Date(created_at);

    async function delete_listing() {
        await fetch('/api/market/delete_listing', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
        invalidateAll()
    }

    async function change_mark() {
        let new_mark = !is_live;
        await fetch('/api/market/update_status', {
            method: "PATCH",
            body: JSON.stringify({ id: id, new_status: new_mark})
        })
        invalidateAll()
    }
</script>

<svelte:head>
    <title>carcult marketplace | your listings</title>
</svelte:head>

<div class="flex border border-white w-96 lg:w-180 bg-gray-800 rounded-sm">
    <div class="flex p-2 border-collapse w-full justify-center items-center">
        <img src={cover_pic} alt="" class="w-40 h-40 lg:w-64 lg:h-64 object-cover rounded-md" />
    </div>
    <div class="flex flex-col mx-1 w-full">
        <h1 class="lg:text-2xl font-bold">{item_name}</h1>
        <h2 class="lg:text-lg">${price}</h2>
        {#if is_live}
            <h3 class="text-sm text-gray-400">Active &#8226; listed on {date.getMonth()}/{date.getDate()}</h3>
        {:else}
            <h3 class="text-sm text-gray-400">Sold &#8226; listed on {date.getMonth()}/{date.getDate()}</h3>
        {/if}
        <div class="flex flex-wrap gap-4 my-2 lg:mt-auto mb-2 justify-center items-center">
            {#if is_live}
                <button class="hover:opacity-75 border border-gray-400 bg-gray-600 p-2 rounded-md" onclick={change_mark}>mark as sold</button>
            {:else}
                <button class="hover:opacity-75 border border-gray-400 bg-gray-600 p-2 rounded-md" onclick={change_mark}>mark as unsold</button>
            {/if}
            <a href="/market/edit/{id}" class="hover:opacity-75">edit</a>
            <a href="/market/{id}" class="hover:opacity-75">view listing</a>
            <button class="hover:opacity-75" onclick={delete_listing}>delete</button>
        </div>
    </div>
</div>