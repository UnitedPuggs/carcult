<script>
    /*
        Kind of an odd route to have this at, but I feel like the garage is very much user-oriented features
    */
    import Events from '$lib/garage/Events.svelte';
    import { page }  from '$app/stores';
    //import * as Collapsible from "$lib/components/ui/collapsible/index.js";

    // something like { month: [events], month: [...], ... }
    function dateCallback({ event_date }) {
        const date = new Date(event_date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return `${year}-${month.toString().padStart(2, '0')}`
    }

    /**
     * Structure will be like so
     * {
     *  year: ...,
     *  months: {
     *      month: ...,
     *      meets: [...]
     *  }
     * }
    */

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
    let { data } = $props();
    let grouping = Object.groupBy(data.meets, dateCallback);
    let meets = $state([]);
    let yearMap = {};

    for (let key in grouping) {
        const [yearStr, monthStr] = key.split('-');
        const YEAR = parseInt(yearStr);
        const MONTH = parseInt(monthStr) - 1;

        if (!yearMap[YEAR]) {
            yearMap[YEAR] = {
                year: YEAR,
                months: []
            };
        }
        
        yearMap[YEAR].months.push({
            month: MONTHS[MONTH],
            meets: grouping[key]
        });
    }

    for (let year of Object.keys(yearMap)) {
        meets.unshift(yearMap[year]);
    }
</script>

<svelte:head>
    <title>your meets</title>
</svelte:head>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div class="flex flex-col p-2">
{#each meets as yearly}
    <h3 class="text-xl font-semibold underline">{yearly.year} meets</h3>
    <section class="flex gap-2 overflow-x-auto">
        {#each yearly.months as monthly}
            {monthly.month}
            {#each monthly.meets as meet}
                {meet.event_name}
            {/each}
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