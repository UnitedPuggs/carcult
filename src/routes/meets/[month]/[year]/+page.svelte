<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import CalendarEvents from "$lib/meets/CalendarEvents.svelte";
    export let data;

    $: events = data.events

    let ref_date = new Date();
    let date;
    let month_str;
    let curr_year;
    let first_day;
    let prev_month_days;
    let calendar_days = [];

    let curr_month = ref_date.getMonth();

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

    async function get_current_calendar(month) {
        date = new Date(ref_date.getFullYear(), month, 1);
        month_str = date.toLocaleString(undefined, { month: 'long' })
        curr_year = date.getFullYear();
        const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)

        first_day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        prev_month_days = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); 

        for(let i = first_day; i > 0; --i) {
            calendar_days.push(prev_month_days - (i - 1));
        }

        for(let i = 1; i <= days; ++i) {
            calendar_days.push(i);
        }
    
        goto(`/meets/${month + 1}/2023`)
    }

    onMount(() => {
        get_current_calendar(ref_date.getMonth());
    })
</script>

<svelte:head>
    <title>{month_str} meets</title>
</svelte:head>

<div>
    {#if $page.data.session?.user.role >= 1}
        <a href="/meets/create" class="m-2 inline-block hover:opacity-75">create event</a>
    {/if}
    <div class="mt-8">
    <div class="flex flex-row justify-center items-center text-center">
        <button on:click={() => {
            calendar_days = [];
            get_current_calendar(--curr_month);
        }}>
        &lt;-
        </button>
            <h1 class="text-2xl p-2">{month_str} {curr_year}</h1>
        <button on:click={() => {
            calendar_days = [];
            get_current_calendar(++curr_month);
        }}>-&gt;</button>
    </div>
    <div class="flex flex-col justify-center items-center mx-auto rounded-sm w-[85rem] p-1 overflow-y-auto overflow-x-hidden">
        <section class="grid grid-cols-7 grid-rows-1 mx-auto border border-white w-[84rem] sticky top-0 bg-black z-50">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
        </section>
        <div class="grid grid-cols-7 px-1 h-auto">
            {#each calendar_days as day}
                <CalendarEvents day={day} date={date} {events} />
            {/each}
        </div>
    </div>
    </div>
</div>