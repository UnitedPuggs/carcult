<script>
    import { onMount } from "svelte";
    import { goto, invalidate } from '$app/navigation'
    import { page } from '$app/stores'
    import CalendarEvents from "$lib/meets/CalendarEvents.svelte";
    export let data;

    $: events = data.events

    let date;
    $: month_str = ref_date.toLocaleString(undefined, { month: 'long' });
    let curr_year;
    let first_day;
    let prev_month_days;
    $: calendar_days = [];

    const today = new Date();

    //Just gets the month from [month] param and year from the [year] param
    $: curr_month = parseInt($page.params.month) - 1;
    $: curr_year = parseInt($page.params.year)
    $: ref_date = new Date(curr_year, curr_month)

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

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

    let width = 0;

    onMount(() => {
        get_current_calendar(curr_month);
    })
</script>

<svelte:head>
    <title>{month_str.toLowerCase()} meets</title>
</svelte:head>

<div bind:clientWidth={width}>
    {#if $page.data.session?.user.role >= 1}
        <a href="/meets/create" class="m-2 inline-block hover:opacity-75">create meet</a>
    {/if}
    <div class="mt-6">
        <div class="flex flex-row justify-center items-center text-center">
            <button on:click={() => {
                calendar_days = [];
                get_current_calendar(--curr_month);
            }}
            class="select-none"
            >
            &lt;-
            </button>
            <section>
                <h1 class="text-2xl p-2 -mb-3 w-52">{month_str} {curr_year}</h1>
                <button on:click={() => {
                    goto_today()
                }} 
                class="pb-4 hover:opacity-75 select-none"
                >
                today
                </button>
            </section>
            <button on:click={() => {
                calendar_days = [];
                get_current_calendar(++curr_month);
            }}
            class="select-none"
            >
            -&gt;
        </button>
        </div>
        <div class="flex flex-col justify-center items-center mx-auto rounded-sm w-full lg:w-[85rem] p-1 overflow-y-auto overflow-x-hidden">
            <section class="grid grid-cols-7 mx-auto border border-white w-full lg:w-[84rem] sticky top-0 bg-black z-50 text-center text-xs lg:text-base">
                {#if width > 700}
                    <span>Sunday</span>
                    <span>Monday</span>
                    <span>Tuesday</span>
                    <span>Wednesday</span>
                    <span>Thursday</span>
                    <span>Friday</span>
                    <span>Saturday</span>
                {:else}
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tues</span>
                    <span>Wed</span>
                    <span>Thurs</span>
                    <span>Fri</span>
                    <span>Sat</span>
                {/if}
            </section>
            <div class="grid grid-cols-7 px-1 h-auto w-screen">
                {#each calendar_days as day}
                    <CalendarEvents day={day} date={date} {events} />
                {/each}
            </div>
        </div>
    </div>
</div>