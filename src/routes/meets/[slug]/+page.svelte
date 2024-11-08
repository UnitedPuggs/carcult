<script>
    import { page } from '$app/stores'
    import { goto, invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';
    let { data } = $props();

    let edit_mode = $state(false);
    
    let description = $state(data.events[0].description);
    let event_name = $state(data.events[0].event_name);

    let event_date = $state(new Date(data.events[0].event_date));
    let dateToday;

    $effect(() => {
        dateToday = new Date(event_date);
    });

    const MEET_TIME = new Date(data.events[0].event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
    const MEET_DATE = new Date(data.events[0].event_date).toLocaleDateString('en-US');

    let event_location = $state(data.events[0].location);

    let meets = $derived(data.events[0]);

    let textarea = $state();
    $effect(() => {
        if(textarea) {
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    });

    let date = new Date();

    function toggle_edit_mode() {
        edit_mode = !edit_mode
    }

    function back() {
        if(browser)
            window.history.back();
    }

    async function delete_meet() {
        await fetch('/api/meets/delete_meet', {
            method: "DELETE",
            body: JSON.stringify({ id: meets.id, slug: meets.slug })
        })
        goto(`/meets/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    async function update_meet() {
        const ACTUAL_DATE = new Date(event_date).toUTCString();
        await fetch('/api/meets/update_meet', {
            method: "PATCH",
            body: JSON.stringify({ 
                id: meets.id, 
                event_name, 
                description, 
                event_date: ACTUAL_DATE, 
                location: event_location 
            })
        });
        edit_mode = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>carcult | {meets.event_name} by {meets.host}</title>
    <meta name="description" content="{meets.description} on carcult">
    <meta name="keywords" content="car meets, automotive events, car enthusiasts, carcult, {meets.event_name}">
    
    <meta property="og:image" content="{meets.bg_img}">
    <meta property="og:image:secure_url" content="{meets.bg_img}">
    <meta property="og:image:alt" content="Background for {meets.event_name}">
</svelte:head>

<div class="flex flex-col">
    <div class="bg-no-repeat bg-center bg-cover bg-scroll border-b border-black h-[40rem]" style="background-image: url('{meets.bg_img}')">
        <div class="flex flex-col backdrop-blur py-4 h-full">
            <button class="text-white text-xl text-left ml-2" onclick={back}>&lt;--</button>
            <!-- would it be better to essentially just copy-paste this all into one big if/else instead of littering this with if/else statements? -->
            {#if $page.data.session?.user.displayname == meets.host}
                <div class="flex flex-row gap-1 m-2 justify-center lg:justify-normal h-auto">
                    <button 
                    class="border border-black box p-1 inline-block rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 bg-white" 
                    onclick={ toggle_edit_mode }
                    >
                    {!edit_mode ? "edit" : "close edit"}
                    </button>
                    {#if edit_mode}
                        <button 
                        class="border border-black box p-1 inline-block rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 bg-white" 
                        onclick={ update_meet }
                        >
                        save
                        </button>
                    {/if}
                    <!-- probably a good idea to have a double-checker -->
                    <button 
                    class="border border-black box p-1 inline-block rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 bg-white" 
                    onclick={ delete_meet }
                    >
                    delete meet
                    </button>
                </div>
            {/if}
            <div class="flex grow flex-col justify-center items-center my-auto text-white overflow-auto">
                {#if !edit_mode}
                    <h1 class="text-3xl font-bold text-center text-stroke">{meets.event_name}</h1>
                    <p class="text-lg text-stroke">hosted by <strong><a href="/garage/{meets.host}" class="underline hover:no-underline">{meets.host}</a></strong></p>
                    {#if meets.location} <!-- just so we don't have to remove meets without locations -->
                        <a href="https://www.google.com/maps?q={meets.location}" class="text-stroke">{meets.location}</a>
                    {/if}
                    <p class="text-stroke">on {MEET_DATE} @ {MEET_TIME}</p>
                    <!-- kinda drunk, but this bind shit is kinda based <-- wtf was I talking about here -->
                    <p class="p-1 whitespace-pre-wrap lg:max-w-xl overflow-y-auto text-stroke">{meets.description}</p>
                {:else} <!-- referring to that first comment, yes it's much cleaner -->
                    <input type="text" placeholder={event_name} class="text-3xl font-bold text-black border border-black rounded-lg p-1" bind:value={event_name} />
                    <input type="text" placeholder={event_location} class="w-auto font-bold text-black border border-black rounded-lg p-1" bind:value={event_location} />
                    <p class="text-lg text-stroke">hosted by <strong><a href="/garage/{meets.host}" class="underline hover:no-underline">{meets.host}</a></strong></p>
                    <div class="flex text-stroke">
                    on&nbsp;<input type="datetime-local" bind:value={event_date} class="text-black">
                    </div>
                    <textarea id="test" class="text-black w-[36rem] border border-black rounded-lg p-1" bind:value={description} bind:this={textarea}></textarea>
                {/if}
            </div>
        </div>
    </div>
    <div>
        <!-- svelte-ignore a11y_missing_attribute -->
        {#if meets.location}
        <iframe src="https://maps.google.com/maps?q={meets.location}&output=embed" height="400" frameborder="0" class="w-full border-0" allowfullscreen></iframe>
        {/if}
    </div>
</div>