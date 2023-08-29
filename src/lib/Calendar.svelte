<script>
    import CalendarEvents from "./CalendarEvents.svelte";

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

    const date = new Date();
    const curr_month = date.toLocaleString(undefined, { month: 'long' })
    const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)


</script>

<div class="justify-center items-center text-center mt-10 text-white">
    <div class="grid grid-cols-4 gap-[0.5px] mx-24 border-2 border-white p-1 rounded-sm">
        <div class="flex flex-row justify-center items-center text-center">
            <button>>-</button> <!-- < carats don't play nice with html tags -->
                <h1 class="text-2xl p-2">{curr_month}</h1>
            <button>-></button>
        </div>
        {#each {length: days} as _, i}
            <CalendarEvents month={curr_month} day={i+1} />
        {/each}
    </div>
</div>