<script>
    export let day;
    export let date;
    export let events;

    $: event_date = new Date(date.getFullYear(), day.month, day.curr_day).toISOString().slice(0, 10);
    $: today_events = events.filter(event => {
        return event.event_date.substring(0, 10) == event_date;
    }).map(event => {
        return { event: event.event_name, slug: event.slug }
    })
    //need to figure out if a day is in prev month and apply a new extra_style
</script>

<div class="outline outline-1 outline-black flex flex-col w-full lg:w-48 h-40 {day.extra_style} overflow-y-auto pointer-events-none">
    <!--<h1>{curr_date}</h1>-->
    <span class="sticky top-0 z-50 pl-1 select-none bg-white w-full">{day.curr_day}</span>
    <div class="flex flex-col">
        {#if today_events}
            {#each today_events as event}
                <a 
                href="/meets/{event.slug}"
                class="border border-black mx-0.5 p-1 rounded-lg text-center overflow-auto font-bold shadow hover:opacity-80 pointer-events-auto text-xs lg:text-lg"
                >
                    {event.event}
                </a>
            {/each}
        {/if}
    </div>
</div>