<script>
    export let event_name;
    export let event_date;
    export let slug;
</script>

<a href="/meets/{slug}" class="hover:opacity-75">
    <div class="flex flex-col h-24 justify-center items-center border border-white w-wo-scroll">
        <h1 class="text-xl font-bold">{event_name}</h1>
        <span>{event_date.substring(0, 10)} @ {event_date.substring(11)}</span>
    </div>
</a>