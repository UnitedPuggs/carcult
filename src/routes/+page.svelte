<script>
    import { public_sb } from '$lib/public_supabase'
    import { onMount } from 'svelte';
    import MarketItem from '$lib/market/MarketItem.svelte';
    export let data;

    let meets_arr = [];
    onMount(async() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date().toLocaleString('sv', { timeZone: tz }).substring(0, 10)

        let { data: meets, meets_err } = await public_sb
        .from('meets')
        .select('event_name, slug, event_date')
        .ilike('event_date', `%${date}%`)
        .range(0, 5)

        if(meets_err)
            console.log(meets_err)

        meets_arr = meets
    })  
    
    $: if(meets_arr) {
        meets_arr = meets_arr
    }
</script>

<svelte:head>
    <title>carcult | the best place to find car meets!</title>
    <meta name="description" content="Built by car lovers, carcult is the place where you can find new meets to share your love of cars with other car enthusiasts!">
    <meta name="keywords" content="car enthusiasts, car meets, auto events, car community, automotive gatherings, connect with car lovers, car culture, car show calendar, automotive networking">
    <meta name="author" content="carcult">

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
            <h2 class="text-2xl font-bold sticky top-0 bg-black z-50">today's meets</h2>
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
        <section class="mt-4">
            <h2 class="text-2xl font-bold">latest listings</h2>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                {#each data.marketplace_listings as listing}
                    <MarketItem
                    slug={listing.id}
                    cover_pic={listing.listing_pics[0]}
                    price={listing.price}
                    item_name={listing.item_name}
                    mileage={listing.mileage}
                    title_status={listing.title_status}
                    transmission={listing.transmission}
                    />
                {/each}
            </div>
        </section>
        <section class="mt-4 w-full">
            <h2 class="text-2xl font-bold">latest threads</h2>
            <div class="grid grid-cols-1 p-2 gap-1">
                {#each data.forum_posts as post}
                    <a href="/forum/post/{post.forum_replies[0].post_id}" class="hover:opacity-75 border flex flex-col">
                        <div class="flex gap-2 lg:w-full">
                            <img src={post.garage.pfp_url} alt="poster" class="h-16 w-16 object-cover" />
                            <div class="flex flex-col justify-start items-start">
                                <span class="font-bold text-lg">{post.post_title}</span>
                                <span class="text-sm">started by {post.garage.username} on {post.created_at.substring(0, 10)}</span>
                                <span class="text-sm">{post.reply_count > 1 ? `${post.reply_count} replies` : `${post.reply_count} reply`}</span>
                                <span class="text-gray-400">
                                    last reply by {post.forum_replies[post.forum_replies.length - 1].poster} at {post.forum_replies[post.forum_replies.length - 1].created_at.substring(0, 10)}:
                                </span>
                                <p class="text-start max-h-16 overflow-y-auto text-gray-400">
                                    {post.forum_replies[post.forum_replies.length - 1].reply_content}
                                </p>
                            </div>
                        </div>
                    </a>
                {/each}
                <a href="/forum" class="w-full lg:w-48 mx-auto bg-gray-800 p-2 hover:opacity-75">view more threads</a>
            </div>
        </section>
    </div>
</body>