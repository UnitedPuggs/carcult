<script>
    /*
        Kind of an odd route to have this at, but I feel like the garage is very much user-oriented features
    */
    import Events from '$lib/garage/Events.svelte';
    import { page }  from '$app/stores'

    export let data;
    let short = data.events;
</script>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div>
    {#each short as event}
        <Events event_name={event.event_name} event_date={event.event_date} slug={event.slug} bg_img={event.bg_img} />
    {/each}
</div>
{:else}
<div class="text-center mt-10">
    <h1 class="text-2xl">you don't have access to this page</h1>
</div>
{/if}