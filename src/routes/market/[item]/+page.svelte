<script>
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    export let data;
    let width;

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

    async function click_image_set(pic) {
        curr_img = pic
        curr_img = curr_img
    }

    async function send_message() {
        const req = await fetch('/api/market/first_contact', {
            method: "POST",
            body: JSON.stringify({
                listing_id: market.id, 
                send_user: $page.data.session.user.displayname, 
                receive_user: market.seller,
                message_content: "I'm interested in your item 😊"
            })
        })
        const res = await req.json()
        goto(`/market/chats/${res.chat_id}`)
    }
</script>

<svelte:head>
    <title>marketplace - {market.item_name}</title>
    <meta name="description" content="Explore cars and parts on the carcult market. Join enthusiasts, discover diverse vehicles, and immerse yourself in automotive passion.">
    <meta name="keywords" content="car meets, automotive market, car enthusiasts, carcult">
    <meta name="author" content="carcult">

    <meta property="og:image" content="{curr_img}">
    <meta property="og:image:secure_url" content="{curr_img}">
</svelte:head>

<div class="flex flex-col lg:flex-row" bind:clientWidth={width}>
    <div class="flex justify-center items-center w-full bg-no-repeat bg-cover" style="background-image: url('{curr_img}')">
        <div class="flex flex-row justify-center items-center mx-auto w-full h-full backdrop-blur-md p-1">
            {#if width > 700}
                {#if curr_img_idx > 0}
                    <button
                    class="w-4 lg:w-20 ml-0 mr-auto text-lg lg:text-3xl rounded-full px-3.5 py-0.5 lg:px-6 lg:py-4 border-2 border-gray-400 bg-white text-black font-bold hover:opacity-75 select-none" 
                    on:click={prev_img}>
                        &lt
                    </button>
                {:else}
                    <button class="w-4 lg:w-20 invisible ml-0 mr-auto px-3.5 py-0.5 lg:px-6 lg:py-4">&lt</button>
                {/if}
            {/if}
            <!-- this is/was div hell -->
            <div class="flex flex-col h-96 lg:h-full items-center justify-center">
                <div class="flex justify-center items-center h-full">
                    <img src={curr_img} alt="listing" class="rounded-sm w-fit lg:max-w-4xl max-h-72 lg:max-h-[40rem] select-none" loading="lazy">
                </div>
                <section class="flex justify-center gap-4 p-4 w-full mt-auto mb-0">
                    {#each market.listing_pics as pic}
                    <button on:click={() => click_image_set(pic)}>
                        <div class="flex justify-center items-center bg-transparent p-0.5">
                            {#if curr_img == pic}
                                <img src={pic} alt="car" class="object-cover w-10 h-10 lg:w-16 lg:h-16 rounded-md" loading="lazy">
                            {:else}
                                <img src={pic} alt="car" class="object-cover w-10 h-10 lg:w-16 lg:h-16 opacity-50 rounded-md" loading="lazy">
                            {/if}
                        </div>
                    </button>
                    {/each}
                </section>
            </div>
            {#if width > 700}
                {#if curr_img_idx < market.listing_pics.length - 1}
                    <button 
                    class="w-4 lg:w-20 mr-0 ml-auto text-lg lg:text-3xl rounded-full px-3.5 py-0.5 lg:px-6 lg:py-4 border-2 border-gray-400 bg-white text-black font-bold hover:opacity-75 select-none" 
                    on:click={next_img}>
                        &gt;
                    </button>
                {:else}
                    <button class="w-4 lg:w-20 invisible mr-0 ml-auto px-3.5 py-0.5 lg:px-6 lg:py-4">&gt;</button>
                {/if}
            {/if}
        </div>
    </div>
    <div class="flex flex-col border-l border-gray-600 w-full lg:w-[30rem] min-h-[calc(100vh_-_6rem)] ml-auto mr-0 bg-gray-800 p-2">
        <section class="flex">
            <h1 class="text-2xl font-bold break-words">{market.item_name}</h1>
            <section class="ml-auto mr-2 mt-0.5">
                <a href="/market" class="text-2xl border-2 border-black bg-white text-black font-bold rounded-full px-2.5 py-0.5 text-center hover:opacity-75">x</a>
            </section>
        </section>
        <h2 class="text-lg">${market.price}</h2>
        <h3 class="text-sm text-gray-500">listed on {market.created_at.substring(0, 10)}</h3>
        <!-- would probably want to include message buttons here -->
        <h1 class="text-xl font-bold pt-2">description</h1>
        <span class="max-h-[30rem] min-h-[24rem] overflow-y-auto border border-gray-600 p-1 rounded-md whitespace-pre-wrap">{market.item_description}</span>
        {#if market.seller != $page.data.session?.user.displayname && data.marketplace_messages.length == 0 && $page.data.session?.user}
            <button on:click={send_message}>send message</button>
        {:else if data.marketplace_messages.length > 0 && market.seller != $page.data.session?.user.displayname}
            <button on:click={() => goto(`/market/chats/${data.marketplace_messages[0].chat_id}`)}>check chat</button>
        {/if}
        <h1 class="text-xl font-bold pt-10">seller info</h1>
        <section class="flex items-center gap-4 py-1">
            <a href="/garage/{market.seller}">
                <img src={user.pfp_url} alt="seller" class="rounded-full w-16 h-16" loading="lazy">
            </a>
                <span class="text-xl font-bold">{market.seller}</span>
        </section>
        <span class="text-sm text-gray-500">joined on {user.created.substring(0, 7)}</span>
    </div>
</div>