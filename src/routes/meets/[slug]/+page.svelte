<script>
    export let data;

    $: events = data.events[0];
</script>

<svelte:head>
    <title>{events.event_name} by {events.host}</title>
</svelte:head>

<div class="flex flex-col justify-center items-center mt-10">
    <h1 class="text-3xl font-bold">{events.event_name}</h1>
    <p class="text-lg">hosted by <strong><a href="/garage/{events.host}" class="underline hover:no-underline">{events.host}</a></strong></p>
    <p>on {events.event_date.substring(0, 10)} @ {events.event_date.substring(11)}</p>
    <p class="p-1 whitespace-pre-wrap md:max-w-xl">{events.description}</p>
</div>