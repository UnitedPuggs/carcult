<script>
    export let data;

    $: events = data.events[0];
</script>

<svelte:head>
    <title>{events.event_name} by {events.host}</title>
</svelte:head>

<div class="flex flex-col justify-center items-center mt-10">
    <h1 class="text-3xl font-bold">{events.event_name}</h1>
    <p class="text-lg">hosted by {events.host}</p>
    <p class="p-1 whitespace-pre-wrap">{events.description}</p>
</div>