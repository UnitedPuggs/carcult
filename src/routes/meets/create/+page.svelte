<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    let date;
    let description;
    let event_name;

    let checked = false;

    const min_date = new Date().toLocaleString('sv').slice(0, 10) + "T00:00"
    const max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16);
    console.log(min_date)
    
    async function create_event() {
        await fetch('/api/meets/create_meet', {
            method: "POST",
            body: JSON.stringify({user: $page.data.session.user.displayname, event_name, date, description})
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
    <input name="event_name" type="text" bind:value={event_name} maxlength="25" required class="text-black p-1" placeholder="event name here">
    <label for="date">date</label>
    <input name="date" type="datetime-local" bind:value={date} required class="text-black" min={min_date}>
    <h1>{date}</h1>
    <label class="pt-4">
        repeat?
        <input type="checkbox" bind:checked={checked}>
    </label>
    {#if checked}
        <!-- repeat every week -->
        <label for="end-date">end date</label>
        <input type="datetime-local" class="text-black" name="end-date">

        <fieldset class="border-white border">
            
        </fieldset>
        <!-- repeat every month -->
        <fieldset>

        </fieldset>
        <!-- repeat every year-->
        <fieldset>

        </fieldset>
    {/if}
    <label for="desc">description</label>
    <textarea name="desc" class="text-black p-1" bind:value={description} placeholder="description here"></textarea>
    <button on:click={ create_event }>submit</button>
</div>