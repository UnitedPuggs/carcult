<script>
    export let data;
    $: market = data.marketplace_listings[0]
    $: user = data.garage[0]

    let curr_img = data.marketplace_listings[0].listing_pics[0]
    $: curr_img_idx = data.marketplace_listings[0].listing_pics.indexOf(curr_img)

    async function next_img() {
        curr_img = data.marketplace_listings[0].listing_pics[++curr_img_idx]
        curr_img = curr_img
    }

    async function prev_img() {
        curr_img = data.marketplace_listings[0].listing_pics[--curr_img_idx]
        curr_img = curr_img
    }
</script>

<svelte:head>
    <title>marketplace - {market.item_name}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row">
    <div class="flex justify-center items-center w-full bg-no-repeat bg-cover" style="background-image: url('{curr_img}')">
        <div class="flex flex-row justify-center items-center mx-auto w-full h-full backdrop-blur-md p-1">
            {#if curr_img_idx > 0}
                <button
                class="w-6 lg:w-20 lg:ml-4 mr-auto text-lg lg:text-3xl rounded-full px-3.5 py-0.5 lg:px-6 lg: lg:py-4 border-2 border-gray-400 bg-white text-black font-bold hover:opacity-75" 
                on:click={prev_img}>
                    &lt
                </button>
            {:else}
                <button class="w-6 lg:w-20 invisible lg:ml-4 mr-auto px-4">&lt-</button>
            {/if}
            <div class="flex flex-col">
                <img src={curr_img} alt="hogan" class="rounded-sm w-[20rem] lg:w-fit lg:max-w-4xl max-h-96">
                <section class="flex justify-center gap-4 p-4">
                    {#each market.listing_pics as pic}
                        <div class="flex items-center bg-transparent p-0.5">
                            {#if curr_img == pic}
                                <img src={pic} alt="car" class="w-full h-full object-cover lg:w-16 rounded-md">
                            {:else}
                                <img src={pic} alt="car" class="w-full h-full object-cover lg:w-16 opacity-50 rounded-md">
                            {/if}
                        </div>
                    {/each}
                </section>
            </div>
            {#if curr_img_idx < market.listing_pics.length - 1}
                <button 
                class="w-6 lg:w-20 lg:mr-4 ml-auto text-lg lg:text-3xl rounded-full px-3.5 py-0.5 lg:px-6 lg: lg:py-4 border-2 border-gray-400 bg-white text-black font-bold hover:opacity-75" 
                on:click={next_img}>
                    &gt;
                </button>
            {:else}
                <button class="w-6 lg:w-20 invisible lg:mr-4 ml-auto px-4">-></button>
            {/if}
        </div>
    </div>
    <div class="flex flex-col border-l border-gray-600 w-full lg:w-[30rem] min-h-[calc(100vh_-_6rem)] ml-auto mr-0 bg-gray-800 p-2">
        <h1 class="text-2xl font-bold">{market.item_name}</h1>
        <h2 class="text-lg">${market.price}</h2>
        <h3 class="text-sm text-gray-500">listed on {market.created_at.substring(0, 10)}</h3>
        <!-- would probably want to include message buttons here -->
        <h1 class="text-xl font-bold pt-2">description</h1>
        <span class="max-h-[30rem] overflow-y-auto border border-gray-600 p-1 rounded-md whitespace-pre-wrap">{market.item_description}</span>
        <h1 class="text-xl font-bold pt-10">seller info</h1>
        <section class="flex items-center gap-4 py-1">
            <a href="/garage/{market.seller}">
                <img src={user.pfp_url} alt="seller" class="rounded-full w-16">
            </a>
                <span class="text-xl font-bold">{market.seller}</span>
        </section>
        <span class="text-sm text-gray-500">joined in {user.created.substring(0, 7)}</span>
    </div>
</div>