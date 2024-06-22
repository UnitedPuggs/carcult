<script>
    export let event_name;
    export let event_date;
    export let slug;
    export let bg_img;
</script>

<a href="/meets/{slug}" class="hover:opacity-75">
    <div class="flex flex-col h-24 justify-center items-center border border-white bg-cover" style="background-image: url('{bg_img}')">
        <div class="flex flex-col justify-center items-center backdrop-blur-sm w-full h-full p-2">
            <h1 class="text-xl font-bold text-stroke">{event_name}</h1>
            <span class="text-stroke">{event_date.substring(0, 10)} @ {event_date.substring(11)}</span>
        </div>
    </div>
</a>