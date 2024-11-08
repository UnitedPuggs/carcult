<script>
    /*
        Kind of an odd route to have this at, but I feel like the garage is very much user-oriented features
    */
    import Events from '$lib/garage/Events.svelte';
    import { page }  from '$app/stores';

    // something like { month: [events], month: [...], ... }
    function dateCallback({ event_date }) {
        const month = new Date(event_date);
        return month.getMonth() + 1;
    }

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
    let { data } = $props();
    let grouping = Object.groupBy(data.events, dateCallback);
    let events = $state([]);

    for (let key in grouping) {
        let months = MONTHS[key - 1];
        events.unshift({ month: months, events: grouping[key]});
    }
</script>

<svelte:head>
    <title>your meets</title>
</svelte:head>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div class="flex flex-col p-2">
{#each events as event}
    <h3 class="text-xl font-semibold underline">{event.month} meets</h3>
    <section class="flex gap-2 overflow-x-auto">
        {#each event.events as meet}
            <Events event_name={meet.event_name} event_date={meet.event_date} slug={meet.slug} bg_img={meet.bg_img} />
        {/each}
    </section>
    <hr class="m-1" />
{/each}
</div>
{:else}
<div class="text-center mt-10">
    <h1 class="text-2xl">you don't have access to this page</h1>
</div>
{/if}