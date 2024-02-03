<script>
    import { page } from '$app/stores'
    import { goto, invalidateAll } from '$app/navigation';
    export let data;

    let edit_mode = false;
    
    let description = data.events[0].description;
    let event_name = data.events[0].event_name;
    let event_date = data.events[0].event_date;

    $: events = data.events[0];

    let textarea;

    $: if(textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    let date = new Date();

    function toggle_edit_mode() {
        edit_mode = !edit_mode
    }

    async function delete_meet() {
        await fetch('/api/meets/delete_meet', {
            method: "DELETE",
            body: JSON.stringify({ id: events.id, slug: events.slug })
        })
        goto(`/meets/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    async function update_meet() {
        await fetch('/api/meets/update_meet', {
            method: "PATCH",
            body: JSON.stringify({id: events.id, event_name, description, event_date})
        })
        edit_mode = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>{events.event_name} by {events.host}</title>
    <meta name="description" content="{events.description} on carcult">
    <meta name="keywords" content="car meets, automotive events, car enthusiasts, carcult, {events.event_name}">
    
    <meta property="og:image" content="{events.bg_img}">
    <meta property="og:image:secure_url" content="{events.bg_img}">
    <meta property="og:image:alt" content="Background for {events.event_name}">
</svelte:head>

<div class="bg-no-repeat bg-center bg-cover bg-scroll border-b border-white" style="background-image: url('{events.bg_img}')">
    <div class="flex flex-col justify-center items-center backdrop-blur py-10 lg:min-h-[40rem]">
        <!-- would it be better to essentially just copy-paste this all into one big if/else instead of littering this with if/else statements? -->
        {#if !edit_mode}
            <h1 class="text-3xl font-bold text-stroke">{events.event_name}</h1>
            <p class="text-lg text-stroke">hosted by <strong><a href="/garage/{events.host}" class="underline hover:no-underline">{events.host}</a></strong></p>
            {#if events.location} <!-- just so we don't have to remove meets without locations -->
                <a href="https://www.google.com/maps?q={events.location}" class="text-stroke">{events.location}</a>
            {/if}
            <p class="text-stroke">on {events.event_date.substring(0, 10)} @ {events.event_date.substring(11)}</p>
            <!-- kinda drunk, but this bind shit is kinda based <-- wtf was I talking about here -->
            <p class="p-1 whitespace-pre-wrap md:max-w-xl text-stroke">{events.description}</p>
        {:else} <!-- referring to that first comment, yes it's much cleaner -->
            <input type="text" placeholder={event_name} class="text-3xl font-bold text-black" bind:value={event_name}>
            <p class="text-lg">hosted by <strong><a href="/garage/{events.host}" class="underline hover:no-underline">{events.host}</a></strong></p>
            <div class="flex">
            on&nbsp;<input type="datetime-local" bind:value={event_date} class="text-black">
            </div>
            <textarea id="test" class="text-black w-[36rem]" bind:value={description} bind:this={textarea}></textarea>
        {/if}
    </div>
</div>
<!-- svelte-ignore a11y-missing-attribute -->
{#if events.location}
    <iframe src="https://maps.google.com/maps?q={events.location}&output=embed" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
{/if}
{#if $page.data.session?.user.displayname == events.host}
    <div class="flex flex-col mt-2 gap-2">
        <button class="hover:opacity-75 md:w-fit md:mx-auto" on:click={ toggle_edit_mode }>edit</button>
        {#if edit_mode}
            <button class="hover:opacity-75 md:w-fit md:mx-auto" on:click={ update_meet }>save</button>
        {/if}
        <!-- probably a good idea to have a double-checker -->
        <button class="hover:opacity-75 md:w-fit md:mx-auto" on:click={ delete_meet }>delete meet</button>
    </div>
{/if}