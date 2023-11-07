<script>
    import { page } from '$app/stores'
    import MarketItem from '$lib/market/MarketItem.svelte';
    export let data;

    let search_term;

    async function search_market() {
        const req = await fetch(`/api/market/search_market?q=${search_term}`)
        const res = await req.json()
        //I feel like this isn't the best way to do this since I don't know behavior when there's a lot of data
        //Like, maybe it might cause breaks with MarketItem components?
        data.streamed.marketplace_listings = res    
        //Plus if the result returns a lot of shit, it might be best to just #await it in the html instead for loading purposes

        //Could also make search into something [slugified], but idk about that
    }
</script>

<svelte:head>
    <title>carcult marketplace</title>
</svelte:head>

<div class="flex lg:flex-row flex-col">
    <div class="flex flex-col border-2 border-white lg:min-h-[calc(100vh_-_6rem)] w-wo-scroll lg:w-64 p-2">
        <h1 class="font-bold text-2xl">marketplace</h1>
        <form on:submit={search_market}>
            <input type="input" class="bg-gray-800 border border-white px-0.5 py-1 mb-4 w-full" placeholder="search marketplace" bind:value={search_term}>
        </form>
        
        <label for="make-opts" class="font-bold text-xl">make</label>
        <select class="bg-gray-800" id="make-opts">
            <option>matsuda</option>
        </select>
        <label for="model-opts" class="font-bold text-xl">model</label>
        <select class="bg-gray-800" id="model-opts">
            <option>miaba</option>
        </select>

        <label class="font-bold text-xl" for="price-range">price</label>
        <div class="flex gap-2" id="price-range">
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="min" min=0>
            <span>to</span>
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="max" min=0>
        </div>
        {#if $page.data.session?.user}
            <a class="mt-4 border-2 p-4 border-white bg-gray-800 hover:opacity-80 text-center transition-all active:scale-90" href="/market/create">create new listing</a>
        {/if}
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-2 gap-4 justify-items-center w-full h-full">
        {#await data.streamed.marketplace_listings}
            <p>loading marketplace listings...</p>
        {:then result}
            {#each result as listing}
                <MarketItem item_name={listing.item_name} price={listing.price} slug={listing.id} cover_pic={listing.listing_pics[0]}/>
            {/each}
        {/await}
    </div>
</div>