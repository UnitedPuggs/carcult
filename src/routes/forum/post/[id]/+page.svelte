<script>
    import ReplyCard from '$lib/forum/ReplyCard.svelte';
    import { invalidateAll } from '$app/navigation'
    import { page } from '$app/stores'
    export let data;

    let reply_maker = false;
    let content;

    function toggle_reply_maker() {
        reply_maker = true;
    }

    async function create_reply() {
        await fetch('/api/forum/create_reply', {
            method: "POST",
            body: JSON.stringify({ id: data.forum_replies[0].post_id, content: content })
        })
        content = null;
        reply_maker = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>carcult forum | {data.forum_posts[0].post_title}</title>
</svelte:head>

<a href="/forum" class="text-xl">&lt-</a>

<div class="p-4">
    <h1 class="text-2xl font-bold">{data.forum_posts[0].post_title}</h1>
    {#if $page.data.session?.user}
        {#if !reply_maker}
            <button on:click={toggle_reply_maker} class="my-1 text-lg">reply</button>
        {:else}
            <div class="border border-white w-full lg:w-fit mx-auto my-2">
                <form class="flex flex-col gap-2 justify-center items-center p-2 text-black lg:w-96" on:submit={create_reply}>
                    <textarea placeholder="content" required class="w-full h-48 p-1" bind:value={content}></textarea>
                    <!-- might also allow for attachments here -->
                    <input type="submit" class="text-white" value="send reply"/>
                </form>
            </div>
        {/if}
    {/if}
    <div>
        {#each data.forum_replies as reply}
            <ReplyCard 
            created_at={reply.created_at} 
            poster={reply.poster} 
            reply={reply.reply_content}
            />
        {/each}
    </div>
</div>