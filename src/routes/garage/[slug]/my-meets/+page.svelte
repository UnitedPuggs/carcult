<script>
    /*
        Kind of an odd route to have this at, but I feel like the garage is very much user-oriented features
    */
    import Events from '$lib/garage/Events.svelte';
    import { page }  from '$app/stores'

    export let data;
    $: short = data.events;
</script>

<svelte:head>
    <title>your meets</title>
</svelte:head>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div class="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 mt-4 p-1">
    {#each short as event}
        <Events event_name={event.event_name} event_date={event.event_date} slug={event.slug} bg_img={event.bg_img} />
    {/each}
</div>
{:else}
<div class="text-center mt-10">
    <h1 class="text-2xl">you don't have access to this page</h1>
</div>
{/if}