<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import { invalidateAll } from '$app/navigation'

    export let post_id;
    export let reply_id;
    export let created_at;
    export let poster;
    export let reply;
    export let reply_num;

    let edit_mode = false;

    function linkify(text) {
        return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
            return `<a href="${url}" class='underline' target='_blank'>${url}</a>`;
        });
    }

    async function delete_reply() {
        await fetch('/api/forum/delete_reply', {
            method: "DELETE",
            body: JSON.stringify({ reply_id: reply_id, post_id: post_id })
        })
        invalidateAll()
    }

    async function edit_reply() {
        await fetch('/api/forum/edit_reply', {
            method: "PATCH",
            body: JSON.stringify({ reply_id: reply_id, reply_content: reply })
        })
        toggle_edit_mode();
        invalidateAll();
    }

    onMount(() => {
        reply = linkify(reply)
        reply = reply

    })

    function toggle_edit_mode() {
        edit_mode = !edit_mode;
    }

    let test;

    $: if (test) {
        test.style.height = `${test.scrollHeight}px`
    }
</script>

<div class="flex flex-col h-fit">
    <section class="flex p-1 border bg-white">
        <span class="text-black">{created_at.substring(0, 10)} {created_at.substring(11, 16)}</span>
        <span class="text-black ml-auto mr-2 font-bold">#{reply_num}</span>
    </section>
    <div class="flex lg:flex-row flex-col">
        <section class="flex h-10 lg:h-auto lg:w-48 border lg:justify-center lg:items-center">
            <span class="text-lg font-bold">{poster}</span>
        </section>
        <section class="border w-full p-2 bg-gray-800">
            <div class="w-full h-fit">
                {#if !edit_mode}
                    <span class="whitespace-pre-wrap w-full h-full">{@html reply}</span>
                {:else}
                    <textarea id="reply" class="w-full h-full text-black" bind:value={reply} bind:this={test}></textarea>
                {/if}
            </div>
            {#if $page.data.session?.user.displayname == poster}
                <hr class="p-1 mt-2">
                <div class="flex gap-2">
                    <button class="border p-1 border-white rounded-sm hover:opacity-75" on:click={toggle_edit_mode}>edit</button>
                    <button class="border p-1 border-white rounded-sm hover:opacity-75" on:click={delete_reply}>delete</button>
                    {#if edit_mode}
                        <button class="border p-1 border-white bg-white text-gray-800 rounded-sm hover:opacity-75" on:click={edit_reply}>save</button>
                    {/if}
                </div>
            {/if}
        </section>
    </div>
</div>