<script>
    import { run } from 'svelte/legacy';

    import { page } from '$app/stores'
    import MarketItem from '$lib/market/MarketItem.svelte';
    let { data = $bindable() } = $props();

    let search_term = $state();
    //funny little workaround, but it stays 0 once the user starts touching stuff
    let min_price = $state(0 ? min_price : "");
    let max_price = $state(0 ? max_price : "");
    let timer;


    async function search_market() {
        clearTimeout(timer)
        const req = await fetch(`/api/market/search_market?q=${search_term}&min=${min_price}&max=${max_price}`)
        const res = await req.json()
        //I feel like this isn't the best way to do this since I don't know behavior when there's a lot of data
        //Like, maybe it might cause breaks with MarketItem components?
        data.streamed.marketplace_listings = res    
        //Plus if the result returns a lot of shit, it might be best to just #await it in the html instead for loading purposes

        //Could also make search into something [slugified], but idk about that since it'd require some funkery
    }

    const debounce = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            search_market();
        }, 1000)
    }

    function check_acc_age() { 
        let acc_created = new Date($page.data.session?.user.created_at);
        let today = new Date();

        let time_diff = today.getTime() - acc_created.getTime();
        let day_diff = Math.round(time_diff / (1000 * 3600 * 24));
        return day_diff;
    }
    run(() => {
        if(search_term == "") {
            //this is so janky
            min_price = ""
            max_price = ""
            search_market()
        }
    });
</script>

<svelte:head>
    <title>carcult marketplace</title>
</svelte:head>

<div class="flex lg:flex-row flex-col">
    <div class="flex flex-col border-2 border-white lg:min-h-[calc(100vh-6rem)] w-wo-scroll lg:w-64 p-2">
        <h1 class="font-bold text-2xl">marketplace</h1>
        <form onsubmit={search_market}>
            <input type="input" class="bg-gray-800 border border-white px-0.5 py-1 mb-4 w-full" placeholder="search marketplace" bind:value={search_term} oninput={debounce}>
        </form>

        <h1 class="font-bold text-xl">price</h1>
        <div class="flex gap-2" id="price-range">
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="min" min=0 bind:value={min_price}>
            <span>to</span>
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="max" min=0 bind:value={max_price}>
        </div>
        {#if $page.data.session?.user}
            {#if check_acc_age() > 14}
                <a class="mt-4 border-2 p-4 border-white bg-gray-800 hover:opacity-80 text-center transition-all active:scale-90" href="/market/create">create new listing</a>
            {/if}
            <a class="mt-4 p-4 border-2 border-white bg-gray-800 hover:opacity-80 text-center transition-all active:scale-90 rounded-sm" href="/market/chats">chats</a>
            {#if check_acc_age() > 14}
                <a class="mt-4 p-4 bg-gray-800 hover:opacity-80 text-center transition-all active:scale-90 rounded-sm" href="/market/selling">selling</a>
            {/if}
        {/if}
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-min p-2 gap-2 justify-items-center w-full">
        {#await data.streamed.marketplace_listings}
            <p>loading marketplace listings...</p>
        {:then result}
            {#each result as listing}
                <MarketItem 
                item_name={listing.item_name} 
                price={listing.price} 
                slug={listing.id} 
                cover_pic={listing.listing_pics[0]} 
                mileage={listing.mileage} 
                title_status={listing.title_status} 
                transmission={listing.transmission} 
                />
            {/each}
        {/await}
    </div>
</div>