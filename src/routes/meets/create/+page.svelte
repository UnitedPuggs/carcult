<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    let date;
    let description;
    let event_name;

    let checked = false;
    let repeat_week = false;
    let repeat_month = false;
    let repeat_year = false;

    const min_date = new Date().toLocaleString('sv').slice(0, 10) + "T00:00"
    const max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleString('sv').slice(0, 10) + "T23:59";
    
    async function create_meet() {
        await fetch('/api/meets/create_meet', {
            method: "POST",
            body: JSON.stringify({user: $page.data.session.user.displayname, event_name, date, description})
        })
        let split_date = date.split('-')
        goto(`/meets/${split_date[1]}/${split_date[0]}`)
    }

    async function create_repeated_meet() {
        alert("hello")
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
        <input type="datetime-local" class="text-black" name="end-date" min={min_date} max={max_date}>
        <div class="flex flex-rows gap-4 pt-2">
            <label>
                repeat every week
                <input type="checkbox" bind:checked={repeat_week}>
            </label>
            <label>
                repeat every month
                <input type="checkbox" bind:checked={repeat_month}>
            </label>
            <label>
                repeat every year
                <input type="checkbox" bind:checked={repeat_year}>
            </label>
        </div>
    {/if}
    <label for="desc" class="pt-2">description</label>
    <textarea name="desc" class="text-black p-1" bind:value={description} placeholder="description here"></textarea>
    {#if repeat_week || repeat_month || repeat_year}
        <button on:click={ create_repeated_meet }>submit</button>
    {:else}
        <button on:click={ create_meet }>submit</button>
    {/if}
</div>