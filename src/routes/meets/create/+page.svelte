<script>

    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import slugify from 'slugify';

    let date = $state();
    let end_date = $state();
    let description = $state();
    let event_name = $state();
    let location = $state();
    
    let bg_img = $state();
    let meet_slug;

    let checked = false;
    let repeat_week = $state(false);
    let repeat_month = $state(false);
    let repeat_year = $state(false);

    let meet_date;
    $effect(() => {
        meet_date = new Date(date)
    });
    let end_date_sub = $derived(new Date(end_date))

    const min_date = new Date().toLocaleString('sv').slice(0, 10) + "T00:00"
    const max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleString('sv').slice(0, 10) + "T23:59";
    
    //Kinda wondering why I didn't just use form actions for this...

    async function create_meet() {
        if(description) {
            let sluggy = `${slugify(event_name)}-${self.crypto.randomUUID().substring(0, 8)}`
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let actualDate = new Date(date).toUTCString();

            await fetch('/api/meets/create_meet', {
                method: "POST",
                body: JSON.stringify({meets: [{host: $page.data.session.user.displayname, location, event_name, slug: sluggy, event_date: actualDate, timezone: tz, description}]})
            })
            .then(meet_data => meet_data.json())
            .then(data => {
                meet_slug = data[0].slug;
                meet_slug = meet_slug;
            })
            
            const form_data = new FormData();
            form_data.append('bg', bg_img)
            form_data.append('slug', meet_slug);

            await fetch('/api/meets/create_meet/add_bg_img', {
                method: "POST",
                body: form_data,
            });

            let split_date = date.split('-')
            goto(`/meets/${split_date[1]}/${split_date[0]}`)
        }
    }

    const upload_background = (e) => {
        let img = e.target.files[0];
        bg_img = img;
    }
</script>

<svelte:head>
    <title>creating {$page.data.session.user.displayname}'s meet</title>
</svelte:head>

<div class="mt-10">
    <h1 class="text-2xl font-bold text-center italic underline">create your meet</h1>
    <form class="flex flex-col justify-center items-center gap-1 border border-black rounded-xl w-fit mx-auto p-2 offset-box" onsubmit={() => { create_meet() }}>
        <label for="event_name">meet name</label>
        <input name="event_name" type="text" bind:value={event_name} maxlength="255" required class="text-black p-1 border border-black rounded-md shadow" placeholder="ur cool meet here">
        <label for="location" >location</label>
        <input name="location" type="text" bind:value={location} required class="text-black p-1 border border-black rounded-md shadow" placeholder="where's it at?">
        <label for="date" class="">date</label>
        <input name="date" type="datetime-local" bind:value={date} required class="text-black p-1 border border-black rounded-md shadow" max={max_date}>
        <label for="bg_image">(optional) background</label>
        <input 
        type="file"
        name="bg_image"
        accept="image/*" 
        class="file:cursor-pointer"
        bind:value={bg_img} 
        onchange={(e) => upload_background(e)}
        >
        <!--
        <label>
            repeat?
            <input type="checkbox" bind:checked={checked}>
        </label>
        need to look over the logic for this shit again
        -->
        {#if checked}
            <!-- repeat every week -->
            <label for="end-date" class="">end date</label>
            <input type="datetime-local" class="text-black" name="end-date" min={min_date} max={max_date} bind:value={end_date} required>
            <div class="flex flex-rows gap-4">
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
        <label for="desc">description</label>
        <textarea name="desc" class="text-black p-1 w-96 h-48 border border-black rounded-lg shadow" bind:value={description} placeholder="write your descriptive description here" required></textarea>
        <input type="submit" class="border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 cursor-pointer" value="create">
    </form>
</div>