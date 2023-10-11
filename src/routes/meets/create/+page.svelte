<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    let date;
    let description;
    let event_name;

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
    <input name="event_name" type="text" bind:value={event_name} maxlength="25" required class="text-black">
    <label for="date">date</label>
    <input name="date" type="datetime-local" bind:value={date} required class="text-black">
    <label for="desc">description</label>
    <textarea name="desc" class="text-black" bind:value={description}></textarea>
    <button on:click={ create_event }>submit</button>
</div>