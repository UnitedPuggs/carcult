<script>
    import { client } from '$lib/public_supabase'
    import { onMount } from 'svelte';
    export let data;

    let meets_arr = [];
    onMount(async() => {
        const supabase = await client(data.session)
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date().toLocaleString('sv', { timeZone: tz }).substring(0, 10)

        let { data: meets, meets_err } = await supabase
        .from('meets')
        .select('event_name, slug, event_date')
        .ilike('event_date', `%${date}%`)

        if(meets_err)
            console.log(meets_err)

        meets_arr = meets
    })  
    
    $: if(meets_arr) {
        meets_arr = meets_arr
    }
</script>

<svelte:head>
    <title>carcult - the best place to find car meets!</title>
    <meta name="description" content="Built by car lovers, carcult is the place where you can find new meets to share your love of cars with other car enthusiasts!">
    <meta name="keywords" content="car enthusiasts, car meets, auto events, car community, automotive gatherings, connect with car lovers, car culture, car show calendar, automotive networking">
    <meta name="author" content="Eddie Poulson">

    <link rel="canonical" href="https://www.carcult.org" />

    <meta property="og:title" content="carcult - connect with car enthusiasts and discover car meets" />
    <meta property="og:description" content="Join carcult, the ultimate web app for car enthusiasts! Discover and connect with fellow car lovers at exciting car meets near you." />
    <meta property="og:image" content="/assets/logo-new.jpg" />
    <meta property="og:url" content="https://www.carcult.org" />
</svelte:head>

<body class="font-mono bg-black">
    <div class="flex flex-col justify-center items-center text-center">
        <h1 class="text-4xl font-bold pt-4">carcult</h1>
        <h2 class="text-lg text-gray-400">the best place to find car meets!</h2>
        <section class="mt-4 w-full max-h-96 overflow-y-auto">
            <h2 class="text-2xl font-bold">today's meets</h2>
            <div class="grid lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-2 p-2">
            {#if meets_arr.length > 0}
                {#each meets_arr as meet} 
                <a href="/meets/{meet.slug}" class="hover:opacity-75">
                    <div class="flex flex-col justify-center items-center border border-white w-42 h-32 p-2">
                        <span class="text-2xl font-bold">{meet.event_name}</span>
                        <span>starting @ {meet.event_date.substring(11)}</span>
                    </div>
                </a>
                {/each}
            {:else}
                <h1>no meets today</h1>
            {/if}
            </div>
        </section>
        <section class="mt-2">
            <h2 class="text-2xl font-bold">new listings</h2>
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 p-2">
                {#each data.marketplace_listings as listing}
                    <a href="/market/{listing.id}" class="hover:opacity-75">
                        <div class="flex flex-col justify-center items-center border-2 h-fit p-2">
                            <div class="w-full h-48 border rounded-lg">
                                <img src={listing.listing_pics[0]} alt="marketplace listing" class="w-full h-full object-cover rounded-lg">
                            </div>
                            <span class="text-lg font-bold max-w-full truncate">{listing.item_name}</span>
                            <span>listed by {listing.seller}</span>
                        </div>
                    </a>
                {/each}
            </div>
        </section>
        <section class="mt-2">
            <h2 class="text-2xl font-bold">new threads</h2>
            <div class="grid grid-cols-2 lg:grid-cols-5 col-auto grid-flow-col p-2 gap-2">
                {#each data.forum_posts as post}
                    <a href="/forum/post/{post.id}" class="hover:opacity-75">
                        <div class="flex border p-2 h-24">
                            <span class="max-h-full overflow-y-hidden">{post.post_title}</span>
                        </div>
                    </a>
                {/each}
            </div>
        </section>
    </div>
</body>