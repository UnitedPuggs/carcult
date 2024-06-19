<script>
    import { page } from '$app/stores'
    import { goto, invalidateAll } from '$app/navigation';
    export let data;

    let edit_mode = false;
    
    let description = data.events[0].description;
    let event_name = data.events[0].event_name;
    let event_date = data.events[0].event_date;
    let event_location = data.events[0].location;

    $: meets = data.events[0];

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
            body: JSON.stringify({ id: meets.id, slug: meets.slug })
        })
        goto(`/meets/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    async function update_meet() {
        await fetch('/api/meets/update_meet', {
            method: "PATCH",
            body: JSON.stringify({ id: meets.id, event_name, description, event_date, location: event_location })
        })
        edit_mode = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>{meets.event_name} by {meets.host}</title>
    <meta name="description" content="{meets.description} on carcult">
    <meta name="keywords" content="car meets, automotive events, car enthusiasts, carcult, {meets.event_name}">
    
    <meta property="og:image" content="{meets.bg_img}">
    <meta property="og:image:secure_url" content="{meets.bg_img}">
    <meta property="og:image:alt" content="Background for {meets.event_name}">
</svelte:head>

<div class="bg-no-repeat bg-center bg-cover bg-scroll border-b border-white" style="background-image: url('{meets.bg_img}')">
    <div class="flex flex-col backdrop-blur py-10 lg:min-h-[40rem]">
        <!-- would it be better to essentially just copy-paste this all into one big if/else instead of littering this with if/else statements? -->
        {#if $page.data.session?.user.displayname == meets.host}
            <div class="flex flex-row gap-2 mx-4 my-2 justify-center lg:justify-normal">
                <button 
                class="hover:opacity-75 border-2 border-white p-2 rounded-md active:scale-95" 
                on:click={ toggle_edit_mode }
                >
                {!edit_mode ? "edit" : "close edit"}
                </button>
                {#if edit_mode}
                    <button 
                    class="hover:opacity-75  border-2 border-white p-2 rounded-md active:scale-95" 
                    on:click={ update_meet }
                    >
                    save
                    </button>
                {/if}
                <!-- probably a good idea to have a double-checker -->
                <button class="hover:opacity-75 border-2 border-white p-2 rounded-md active:scale-95" on:click={ delete_meet }>delete meet</button>
            </div>
        {/if}
        <div class="flex flex-col justify-center items-center h-auto my-auto">
            {#if !edit_mode}
                <h1 class="text-3xl font-bold text-stroke text-center">{meets.event_name}</h1>
                <p class="text-lg text-stroke">hosted by <strong><a href="/garage/{meets.host}" class="underline hover:no-underline">{meets.host}</a></strong></p>
                {#if meets.location} <!-- just so we don't have to remove meets without locations -->
                    <a href="https://www.google.com/maps?q={meets.location}" class="text-stroke">{meets.location}</a>
                {/if}
                <p class="text-stroke">on {meets.event_date.substring(5, 7)}/{meets.event_date.substring(8, 10)}/{meets.event_date.substring(0, 4)} @ {meets.event_date.substring(11, 16)}</p>
                <!-- kinda drunk, but this bind shit is kinda based <-- wtf was I talking about here -->
                <p class="p-1 whitespace-pre-wrap md:max-w-xl text-stroke">{meets.description}</p>
            {:else} <!-- referring to that first comment, yes it's much cleaner -->
                <input type="text" placeholder={event_name} class="text-3xl font-bold text-black" bind:value={event_name} />
                <input type="text" placeholder={event_location} class="w-auto font-bold text-black" bind:value={event_location} />
                <p class="text-lg">hosted by <strong><a href="/garage/{meets.host}" class="underline hover:no-underline">{meets.host}</a></strong></p>
                <div class="flex">
                on&nbsp;<input type="datetime-local" bind:value={event_date} class="text-black">
                </div>
                <textarea id="test" class="text-black w-[36rem]" bind:value={description} bind:this={textarea}></textarea>
            {/if}
        </div>
    </div>
</div>
<!-- svelte-ignore a11y-missing-attribute -->
{#if meets.location}
    <iframe src="https://maps.google.com/maps?q={meets.location}&output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
{/if}