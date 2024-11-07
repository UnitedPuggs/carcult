<script>
    import { run } from 'svelte/legacy';

    import { public_sb } from '$lib/public_supabase'
    import { onMount } from 'svelte';
    //import MarketItem from '$lib/market/MarketItem.svelte';
    //export let data;

    let weeksMeets = $state([]);
    onMount(async() => { // We fucking hate datetime shit
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get client's timezone
        const date = new Date();
        const start_date = new Date().toLocaleString('en-US', { timeZone: tz })
        const end_date = new Date(new Date(date).setDate(date.getDate() + 7)).toLocaleString('en-US', { timeZone: tz })
        
        let { data: meets, err } = await public_sb
        .from('meets')
        .select('event_name, slug, event_date, timezone')
        .lt('event_date', `%${end_date}%`)
        .gt('event_date', `%${start_date}%`)
        .range(0, 10)
        .order('event_date', { ascending: true })

        if(err)
            console.log(err);

        weeksMeets = meets;
    });

    function convertToTimezone(meet, tz) {
        const DATE = new Date(meet).toLocaleTimeString('en-US', { timezone: tz, hour: '2-digit', minute: '2-digit' })
        return DATE;
    }
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
        <div class="{ weeksMeets.length > 0 ?'grid grid-cols-2' : ''} gap-1 lg:flex flex-wrap justify-center items-center lg:max-w-full lg:mx-auto" id="not-meet-carousel"> <!-- this might need to be adjusted a bit teehee -->
        {#if weeksMeets.length > 0}
            {#each weeksMeets as meet} <!-- add in a carousel here? gonna require that we copy-paste this -->
            <a href="/meets/{meet.slug}" class="hover:opacity-75">
                <div 
                class="flex flex-col lg:justify-center lg:items-center m-auto border border-black rounded-lg box w-full lg:w-80 h-36 p-2 transition-all hover:no-box hover:translate-y-1 overflow-auto"
                >
                    <span class="text-lg lg:text-2xl font-bold">{meet.event_name}</span>
                    <span>starting @ {convertToTimezone(meet.event_date, meet.timezone)}</span>
                    <span>on {meet.event_date.substring(5, 7)}/{meet.event_date.substring(8, 10)}/{meet.event_date.substring(0, 4)}</span>
                </div>
            </a>
            {/each}
        {:else}
            <h1 class="text-center">no meets this week</h1>
        {/if}
        </div>
    </section>
</div>