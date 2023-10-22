<script>
    import Events from '$lib/garage/Events.svelte';
    import { page }  from '$app/stores'

    export let data;
    let short = data.events;
</script>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div>
    {#each short as event}
        <Events event_name={event.event_name} event_date={event.event_date} slug={event.slug} />
    {/each}
</div>
{:else}
<div class="text-center mt-10">
    <h1 class="text-2xl">you don't have access to this page</h1>
</div>
{/if}