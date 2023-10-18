<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    let date;
    let end_date;
    let description;
    let event_name;

    let checked = false;
    let repeat_week = false;
    let repeat_month = false;
    let repeat_year = false;

    $: meet_date = new Date(date)
    $: end_date_sub = new Date(end_date)

    const min_date = new Date().toLocaleString('sv').slice(0, 10) + "T00:00"
    const max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleString('sv').slice(0, 10) + "T23:59";
    
    async function create_meet() {
        await fetch('/api/meets/create_meet', {
            method: "POST",
            body: JSON.stringify({meets: [{host: $page.data.session.user.displayname, event_name, event_date: date, description}]})
        })
        let split_date = date.split('-')
        goto(`/meets/${split_date[1]}/${split_date[0]}`)
    }

    const replace_str = (index, replacement, string) => {
        return string.substring(0, index) + replacement + string.substring(index + 1, 16)
    }

    async function create_repeated_meet() {
        let meets = [];
        meets.push({host: $page.data.session.user.displayname, event_name: event_name, event_date: replace_str(10, 'T', meet_date.toLocaleString('sv')), description: description})
        if(repeat_week || (repeat_week && repeat_month) || (repeat_week && repeat_year) || (repeat_week && repeat_month && repeat_year)) {
            while(meet_date.toLocaleString('sv').slice(0, 10) < end_date_sub.toLocaleString('sv').slice(0, 10)) {
                meet_date.setDate(meet_date.getDate() + 7);
                meets.push({host: $page.data.session.user.displayname, event_name: event_name, event_date: replace_str(10, 'T', meet_date.toLocaleString('sv')), description: description})
            }
        }
        if(repeat_month) {
            while(meet_date.toLocaleString('sv').slice(0, 10) < end_date_sub.toLocaleString('sv').slice(0, 10)) {
                meet_date.setMonth(meet_date.getMonth() + 1);
                meets.push({host: $page.data.session.user.displayname, event_name: event_name, event_date: replace_str(10, 'T', meet_date.toLocaleString('sv')), description: description})
            }
        }
        if(repeat_year) {
            while(meet_date < end_date_sub) {
                meet_date.setFullYear(meet_date.getFullYear() + 1);
                meets.push({host: $page.data.session.user.displayname, event_name: event_name, event_date: replace_str(10, 'T', meet_date.toLocaleString('sv')), description: description})
            }
        }
        console.log(meets)
        meet_date = new Date(date);
        await fetch('/api/meets/create_meet', {
            method: "POST",
            body: JSON.stringify({meets: meets})
        })
        let split_date = date.split('-')
        goto(`/meets/${split_date[1]}/${split_date[0]}`)
    }
</script>

<svelte:head>
    <title>creating {$page.data.session.user.displayname}'s event</title>
</svelte:head>

<div class="flex flex-col justify-center items-center mt-10">
    <h1 class="text-2xl font-bold">create your event</h1>
    <label for="event_name">event name</label>
    <input name="event_name" type="text" bind:value={event_name} maxlength="25" required class="text-black px-0.5 py-1" placeholder="event name here">
    <label for="date" class="pt-2">date</label>
    <input name="date" type="datetime-local" bind:value={date} required class="text-black" min={min_date} max={max_date}>
    <label class="pt-4">
        repeat?
        <input type="checkbox" bind:checked={checked}>
    </label>
    {#if checked}
        <!-- repeat every week -->
        <label for="end-date" class="pt-2">end date</label>
        <input type="datetime-local" class="text-black" name="end-date" min={min_date} max={max_date} bind:value={end_date}>
        <div class="flex flex-rows gap-4 pt-2">
            <label>
                repeat weekly
                <input type="checkbox" bind:checked={repeat_week}>
            </label>
            <label>
                repeat monthly
                <input type="checkbox" bind:checked={repeat_month}>
            </label>
            <label>
                repeat yearly
                <input type="checkbox" bind:checked={repeat_year}>
            </label>
        </div>
    {/if}
    <label for="desc" class="pt-2">description</label>
    <textarea name="desc" class="text-black p-1 w-96 h-48" bind:value={description} placeholder="description here"></textarea>
    {#if repeat_week || repeat_month || repeat_year}
        <button on:click={ create_repeated_meet }>submit</button>
    {:else}
        <button on:click={ create_meet }>submit</button>
    {/if}
</div>