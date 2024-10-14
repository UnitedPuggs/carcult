<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import slugify from 'slugify';

    let date;
    let end_date;
    let description;
    let event_name;
    let location;
    
    let bg_img;
    let meet_slug;

    let checked = false;
    let repeat_week = false;
    let repeat_month = false;
    let repeat_year = false;

    $: meet_date = new Date(date)
    $: end_date_sub = new Date(end_date)

    const min_date = new Date().toLocaleString('sv').slice(0, 10) + "T00:00"
    const max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleString('sv').slice(0, 10) + "T23:59";
    
    //Kinda wondering why I didn't just use form actions for this...

    async function create_meet() {
        if(description) {
            let sluggy = `${slugify(event_name)}-${self.crypto.randomUUID().substring(0, 8)}`
            await fetch('/api/meets/create_meet', {
                method: "POST",
                body: JSON.stringify({meets: [{host: $page.data.session.user.displayname, location, event_name, slug: sluggy, event_date: date, description}]})
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

    const replace_str = (index, replacement, string) => {
        return string.substring(0, index) + replacement + string.substring(index + 1, 16)
    }

    async function create_repeated_meet() {
        //yeah, this is pretty fucking horrid. there's probably a better way of doing this, I would think.
        if(description) {        
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
            meet_date = new Date(date);
            await fetch('/api/meets/create_meet', {
                method: "POST",
                body: JSON.stringify({meets: meets})
            })
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
    <title>creating {$page.data.session.user.displayname}'s event</title>
</svelte:head>

<div class="mt-10">
    <h1 class="text-2xl font-bold text-center">create your event</h1>
    <form class="flex flex-col justify-center items-center gap-2" on:submit={() => {
        if(repeat_week || repeat_month || repeat_year)
            create_repeated_meet();
        else
            create_meet();
        }}>
        <label for="event_name">event name</label>
        <input name="event_name" type="text" bind:value={event_name} maxlength="255" required class="text-black px-0.5 py-1" placeholder="event name here">
        <label for="location" >location</label>
        <input name="location" type="text" bind:value={location} required class="text-black px-0.5 py-1" placeholder="location here">
        <label for="date" class="">date</label>
        <input name="date" type="datetime-local" bind:value={date} required class="text-black" max={max_date}>
        <input 
        type="file" 
        accept="image/*" 
        class="file:border-white file:bg-transparent file:border-2 file:rounded-full file:p-2 file:hover:opacity-75 file:hover:cursor-pointer file:font-bold p-1" 
        bind:value={bg_img} 
        on:change={(e) => upload_background(e)}
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
        <label for="desc" class="pt-2">description</label>
        <textarea name="desc" class="text-black p-1 w-96 h-48" bind:value={description} placeholder="description here" required></textarea>
        <input type="submit" class="p-2 m-2 rounded-md hover:opacity-75 active:scale-95 border border-white cursor-pointer" value="create">
    </form>
</div>