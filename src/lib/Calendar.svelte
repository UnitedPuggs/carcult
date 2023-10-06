<script>
    import CalendarEvents from "./CalendarEvents.svelte";

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

    const date = new Date("2023-09-01");
    const curr_month = date.toLocaleString(undefined, { month: 'long' })
    const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)
</script>

<div class="justify-center items-center text-center mt-10 text-white">
    <div class="flex flex-row justify-center items-center text-center">
        <button>&lt;-</button>
            <h1 class="text-2xl p-2">{curr_month}</h1>
        <button>-></button>
    </div>
    <section class="grid grid-cols-7 grid-rows-1 max-w-[108rem] mx-auto border border-white">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
    </section>
    <div class="grid grid-cols-7 gap-[0.5px] mx-24 border-2 border-white p-1 rounded-sm">
        {#each {length: days} as _, i}
            <CalendarEvents month={curr_month} day={i+1} date={date}/>
        {/each}
    </div>
</div>