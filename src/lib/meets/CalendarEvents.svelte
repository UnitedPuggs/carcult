<script>
    let { day, date, events } = $props();

    let today_events = $derived(events.filter(event => {
        let event_date = $derived(new Date(date.getFullYear(), day.month, day.curr_day).toLocaleDateString('en-US', { timeZone: event.timezone})); //This is the date coming in
        let temp_date = new Date(event.event_date).toLocaleDateString('en-US', { timeZone: event.timezone}) //This is the event date
        return temp_date == event_date;
    }).map(event => {
        let temp_date = new Date(event.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
        return { event: event.event_name, slug: event.slug, time: temp_date }
    }));
</script>

<div class="outline outline-1 outline-black dark:outline-white flex flex-col w-full lg:w-48 h-40 {day.extra_style} overflow-y-auto">
    <div class="flex flex-row group mb-1">
        <span class="sticky top-0 z-50 pl-1 select-none bg-white dark:bg-[#272933]">{day.curr_day}</span>
        <a href="/meets/create?date={date.getFullYear()}-{day.month + 1}-{day.curr_day}" class="mr-1 ml-auto invisible group-hover:visible">[+]</a>
    </div>
    <div class="flex flex-col">
        {#if today_events}
            {#each today_events as event}
                <a 
                href="/meets/{event.slug}"
                class="border border-black dark:border-white mx-0.5 p-1 rounded-lg text-center overflow-auto font-bold shadow hover:opacity-80 pointer-events-auto text-xs lg:text-lg"
                >
                    <span>{event.time}</span>
                    <span>{event.event}</span>
                </a>
            {/each}
        {/if}
    </div>
</div>