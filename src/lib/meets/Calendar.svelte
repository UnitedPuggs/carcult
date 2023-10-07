<script>
  import { onMount } from "svelte";
    import CalendarEvents from "./CalendarEvents.svelte";

    let ref_date = new Date()
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
    }

    onMount(() => {
        get_current_calendar(ref_date.getMonth());
    })
</script>

<div class="justify-center items-center text-center mt-10 text-white">
    <div class="flex flex-row justify-center items-center text-center">
        <button on:click={() => {
            calendar_days = [];
            get_current_calendar(--curr_month)
        }}>
        &lt;-
        </button>
            <h1 class="text-2xl p-2">{month_str} {curr_year}</h1>
        <button on:click={() => {
            calendar_days = [];
            get_current_calendar(++curr_month)
        }}>-&gt;</button>
    </div>
    <div class="flex flex-col justify-center items-center mx-auto rounded-sm w-[85rem]  p-1 overflow-y-auto overflow-x-hidden">
        <section class="grid grid-cols-7 grid-rows-1 mx-auto border border-white w-[84rem] sticky top-0 bg-black z-50">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
        </section>
        <div class="grid grid-cols-7 px-1 h-[40rem]">
            {#each calendar_days as day}
                <CalendarEvents month={month_str} day={day} date={date} day_arr={calendar_days} />
            {/each}
        </div>
    </div>
</div>