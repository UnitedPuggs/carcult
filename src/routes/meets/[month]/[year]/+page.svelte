<script>
    import { run } from 'svelte/legacy';

    import { onMount } from "svelte";
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import { swipe } from "svelte-gestures";
    import CalendarEvents from "$lib/meets/CalendarEvents.svelte";
    
    let { data = $bindable() } = $props();

    let width = $state(0);
    let radius = $state(0);
    let user_location = $state(0);
    
    let setEvent = $state(data.events)
    let events = $derived(setEvent)

    $effect(() => {
        data.events;

        setEvent = data.events;
    })

    let date = $state();
    let curr_year = $state();
    let first_day;
    let prev_month_days;

    const today = new Date();


    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const short_days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const long_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    run(() => {
        curr_year = parseInt($page.params.year);
    });
    //Just gets the month from [month] param and year from the [year] param
    let curr_month;
    run(() => {
        curr_month = parseInt($page.params.month) - 1;
    });
    let ref_date;
    run(() => {
        ref_date = new Date(curr_year, curr_month);
    });
    let month_str = $state("");
    run(() => {
        month_str = ref_date.toLocaleString(undefined, { month: 'long' });
    });
    let calendar_days = $state([]);

    async function getCoords(address) {
        const req = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const res = await req.json();

        if(res.length > 0) {
            const location = res[0];
            return {
                lat: parseFloat(location.lat), 
                lon: parseFloat(location.lon)
            };
        } else {
            return {
                lat: parseFloat(41.84201),
                lon: parseFloat(-89.485937)
            };
        }
    }

    function to_rad(degrees) {
        return degrees * (Math.PI / 180);
    }

    async function calculate_distance(start_coord, end_coord) {
        const R = 6371; //Earth's radius in km
        const lat_dist = to_rad(end_coord.lat - start_coord.lat);
        const lon_dist = to_rad(end_coord.lon - start_coord.lon);

        const a = Math.pow(Math.sin(lat_dist / 2), 2) + Math.cos(to_rad(start_coord.lat)) * Math.cos(to_rad(end_coord.lat)) * Math.pow(Math.sin(lon_dist / 2), 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        const dist = R * c; //Distance in km
        return dist;
    }

    async function search_locations(user_location, radius, all_locations) {
        let user_coords = null;
        if(localStorage.getItem("user_coords")) {
            console.log("got from local storage")
            user_coords = JSON.parse(localStorage.getItem("user_coords"));
        } else {
            user_coords = await getCoords(user_location);
            localStorage.setItem("user_coords", JSON.stringify(user_coords));
        }

        const locations_in_rad = [];

        for(const location of all_locations) {
            const location_coords = { lat: location.latitude, lon: location.longitude }
           

            const dist = await calculate_distance(user_coords, location_coords);
            console.log(`${dist}km away from user`);
            if(dist <= radius) {
                locations_in_rad.push(location);
            }
        }
        //console.log(`rad ${locations_in_rad}`)
        for(let i = 0; i < locations_in_rad.length; ++i) {
            console.log(locations_in_rad[i]);
        }
        setEvent = data.events.filter((x) => 
            locations_in_rad.find(({ id }) => x.id === id)
        ); 
        console.log(data.events)
    }

    async function get_current_calendar(month) {
        //If we go over december, increment into jan the next year basically
        if(month == 12) {
            ref_date.setFullYear(++curr_year);
            month = 0;
            curr_month = 0;
        }
        //If we go under jan, decrement into the last year
        if(month == -1) {
            ref_date.setFullYear(--curr_year);
            month = 11;
            curr_month = 11;
        }

        date = new Date(ref_date.getFullYear(), month, 1);
        month_str = date.toLocaleString(undefined, { month: 'long' })
        curr_year = ref_date.getFullYear();
        const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)
        first_day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        prev_month_days = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); 

        for(let i = first_day; i > 0; --i) {
            calendar_days.push({month: curr_month - 1, curr_day: prev_month_days - (i - 1), extra_style: "opacity-60"});
        }

        for(let i = 1; i <= days; ++i) {
            calendar_days.push({month: curr_month, curr_day: i, extra_style: ""});
        }

        goto(`/meets/${month + 1}/${curr_year}`)
    }

    async function goto_today() {
        curr_month = today.getMonth();
        curr_year = today.getFullYear();
        ref_date = new Date(curr_year, curr_month);
        calendar_days = [];
        get_current_calendar(curr_month)
    }

    function handler(event) {
        calendar_days = [];
        if(event.detail.direction == "left") {
            get_current_calendar(++curr_month);
        } else if (event.detail.direction == "right") {
            get_current_calendar(--curr_month);
        }
    }

    onMount(() => {
        get_current_calendar(curr_month);
    });
</script>

<svelte:head>
    <title>carcult | {month_str.toLowerCase()} meets</title>
    <meta name="description" content="Explore upcoming car meets on the carcult calendar. Join enthusiasts, discover diverse vehicles, and immerse yourself in automotive passion.">
    <meta name="keywords" content="car meets, automotive events, car enthusiasts, carcult">
    <meta name="author" content="carcult">

    <meta property="og:title" content="carcult | {month_str.toLowerCase()} meets">
    <meta property="og:image" content="/assets/logo-tester.jpg">
    <meta property="og:image:secure_url" content="/assets/logo-tester.jpg">
    <meta property="og:url" content="https://carcult.org/meets/{$page.params.month}/{$page.params.year}">
</svelte:head>

<div bind:clientWidth={width} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y'}} onswipe={handler}>
    {#if $page.data.session?.user.role >= 1}
        <a href="/meets/create" class="border border-black box p-1 m-2 inline-block rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80">new meet</a>
    {/if}
    <div class="mt-6">
        <form class="flex justify-center items-center gap-2 text-black" onsubmit={() => search_locations(user_location, radius, data.locations)}>
            <label>location</label>
            <input type="text" class="border border-black" bind:value={user_location} />
            <label>radius (in km)</label>
            <input type="number" class="border border-black" min=1 max=200 bind:value={radius} />
            <input type="submit" />
        </form> 
        <div class="flex flex-row justify-center items-center text-center">
            <button onclick={() => {
                calendar_days = [];
                get_current_calendar(--curr_month);
            }}
            class="select-none"
            >
            &lt;-
            </button>
            <section>
                <h1 class="text-2xl p-2 -mb-2 w-52 font-bold select-none">{month_str} {curr_year}</h1>
                <button onclick={() => {
                    goto_today()
                }} 
                class="pb-4 hover:opacity-75 select-none"
                >
                today
                </button>
            </section>
            <button onclick={() => {
                calendar_days = [];
                get_current_calendar(++curr_month);
            }}
            class="select-none"
            >
            -&gt;
            </button>
        </div>
        <div class="flex flex-col justify-center items-center mx-auto rounded-sm w-full lg:w-[85rem] pb-4 lg:px-0 px-1">
            <div class="grid grid-cols-7 h-auto lg:w-auto w-screen gap-[1px]">
                {#each width > 640 ? long_days : short_days as day}
                    <section class="sticky top-0 z-50 text-center outline outline-1 text-sm lg:text-base">
                        <span class="font-semibold">{day}</span>
                    </section>
                {/each}
                {#each calendar_days as day}
                    <CalendarEvents {day} {date} {events} />
                {/each}
            </div>
        </div>
    </div>
</div>