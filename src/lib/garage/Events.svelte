<script>
    let {
        event_name,
        event_date,
        slug,
        bg_img
    } = $props();

    const MEET_TIME = new Date(event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
</script>

<a href="/meets/{slug}" class="hover:opacity-75 rounded-lg overflow-hidden">
    <div class="flex flex-col w-48 h-36 justify-center items-center border border-black rounded-lg bg-cover" style="background-image: url('{bg_img}')">
        <div class="flex flex-col text-center backdrop-blur-sm w-full h-full p-2 overflow-y-auto text-white">
            <h1 class="text-xl font-bold tex text-stroke">{event_name}</h1>
            <span class="text-stroke">{event_date.substring(5, 7)}/{event_date.substring(8, 10)}/{event_date.substring(0, 4)} @ {MEET_TIME}</span>
        </div>
    </div>
</a>