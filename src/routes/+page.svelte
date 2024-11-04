<script>
    import { run } from 'svelte/legacy';

    import { public_sb } from '$lib/public_supabase'
    import { onMount } from 'svelte';
    //import MarketItem from '$lib/market/MarketItem.svelte';
    //export let data;

    let meets_arr = $state([]);
    onMount(async() => { // We fucking hate datetime shit
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date();
        const start_date = new Date().toLocaleString('sv', { timeZone: tz })
        const end_date = new Date(new Date(date).setDate(date.getDate() + 7)).toLocaleString('sv', { timeZone: tz })
        
        let { data: meets, meets_err } = await public_sb
        .from('meets')
        .select('event_name, slug, event_date')
        .lt('event_date', `%${end_date}%`)
        .gt('event_date', `%${start_date}%`)
        .range(0, 10)
        .order('event_date', { ascending: true })

        if(meets_err)
            console.log(meets_err);

        meets_arr = meets;
    })  
    
    run(() => {
        if(meets_arr) {
            meets_arr = meets_arr;
        }
    });
</script>

<svelte:head>
    <title>carcult</title>
    <meta name="description" content="Built by car lovers, carcult is the place where you can find new meets to share your love of cars with other car enthusiasts!">
    <meta name="keywords" content="car enthusiasts, car meets, auto events, car community, automotive gatherings, connect with car lovers, car culture, car show calendar, automotive networking">
    <meta name="author" content="carcult">

    <link rel="canonical" href="https://www.carcult.org" />

    <meta property="og:title" content="carcult - connect with car enthusiasts and discover car meets" />
    <meta property="og:description" content="Join carcult, the ultimate web app for car enthusiasts! Discover and connect with fellow car lovers at exciting car meets near you." />
    <meta property="og:image" content="/assets/logo-tester.png" />
    <meta property="og:url" content="https://www.carcult.org" />
    <link rel="icon" href="/assets/logo-tester.png" />
</svelte:head>


<div class="flex flex-col justify-center items-center text-center">
    <h1 class="text-4xl font-bold pt-4">carcult</h1>
    <h2 class="text-lg text-gray-400">the best place to find car meets!</h2>
    <section class="mt-4 w-full">
        <h2 class="text-2xl font-bold sticky top-0  z-50">this week's meets</h2>
        <div class="{ meets_arr.length > 0 ?'grid grid-cols-2' : ''} gap-1 lg:flex flex-wrap justify-center items-center lg:max-w-full lg:mx-auto" id="not-meet-carousel"> <!-- this might need to be adjusted a bit teehee -->
        {#if meets_arr.length > 0}
            {#each meets_arr as meet} <!-- add in a carousel here? gonna require that we copy-paste this -->
            <a href="/meets/{meet.slug}" class="hover:opacity-75">
                <div 
                class="flex flex-col lg:justify-center lg:items-center m-auto border border-black rounded-lg box w-full lg:w-80 h-36 p-2 transition-all hover:no-box hover:translate-y-1 overflow-auto"
                >
                    <span class="text-lg lg:text-2xl font-bold">{meet.event_name}</span>
                    <span>starting @ {meet.event_date.substring(11, 16)}</span>
                    <span>on {meet.event_date.substring(5, 7)}/{meet.event_date.substring(8, 10)}/{meet.event_date.substring(0, 4)}</span>
                </div>
            </a>
            {/each}
        {:else}
            <h1 class="text-center">no meets this week</h1>
        {/if}
        </div>
    </section>
    <!--
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
    -->
</div>