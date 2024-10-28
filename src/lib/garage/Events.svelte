<script>
    let {
        event_name,
        event_date,
        slug,
        bg_img
    } = $props();
</script>

<a href="/meets/{slug}" class="hover:opacity-75">
    <div class="flex flex-col h-32 justify-center items-center border border-white bg-cover" style="background-image: url('{bg_img}')">
        <div class="flex flex-col text-center backdrop-blur-sm w-full h-full p-2 overflow-y-auto">
            <h1 class="text-xl font-bold text-stroke">{event_name}</h1>
            <span class="text-stroke">{event_date.substring(5, 7)}/{event_date.substring(8, 10)}/{event_date.substring(0, 4)} @ {event_date.substring(11, 16)}</span>
        </div>
    </div>
</a>