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

<div class="border border-white flex flex-col h-40 w-full lg:w-48 {day.extra_style} overflow-y-auto">
    <!--<h1>{curr_date}</h1>-->
    <span class="sticky top-0 bg-black z-50 pl-1">{day.curr_day}</span>
    {#if today_events}
        {#each today_events as event}
            <a 
            href="/meets/{event.slug}"
            class="hover:opacity-75 border rounded-sm mx-1 my-0.5 bg-white text-black text-xs lg:text-lg font-bold"
            >
                {event.event}
            </a>
        {/each}
    {/if}
</div>