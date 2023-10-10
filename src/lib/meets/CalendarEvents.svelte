<script>
    export let day;
    export let date;
    export let events;

    $: event_date = new Date(date.getFullYear(), date.getMonth(), day).toISOString().slice(0, 10);
    
    $: today_events = events.filter(event => {
        return event.event_date == event_date;
    }).map(event => {
        return { event: event.event_name, slug: event.slug }
    })

    
    let extra_style = ""
    //need to figure out if a day is in prev month and apply a new extra_style
</script>

<div class="border border-white flex flex-col h-32 w-48 {extra_style} overflow-y-auto">
    <!--<h1>{curr_date}</h1>-->
    <span class="sticky top-0 bg-black z-50">{day}</span>
    {#if today_events}
        {#each today_events as event}
        <a 
        href="/meets/{event.slug}"
        class="hover:opacity-75 border rounded-sm mx-1 my-0.5 bg-white text-black text-lg font-bold"
        >
            {event.event}
        </a>
    {/each}
    {/if}
</div>