<script>
    import PostCard from '$lib/forum/PostCard.svelte';
    import { invalidateAll } from '$app/navigation'
    import { page } from '$app/stores'

    export let data;
    let thread_maker = false;
    let title;
    let content;

    function toggle_thread_maker() {
        thread_maker = true;
    }

    async function create_thread() {
        await fetch('/api/forum/create_thread', {
            method: "POST",
            body: JSON.stringify({ title, content })
        })
        title = null;
        content = null;
        thread_maker = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>carcult forum</title>
</svelte:head>

<div class="flex flex-col mt-10">
    <div>
        <!-- think I might take some inspo from how 4chan does new posts -->
        {#if $page.data.session?.user}
            {#if !thread_maker}
                <button class="p-2" on:click={toggle_thread_maker}>create new thread</button>
            {:else} 
                <div class="border border-white lg:w-fit mx-auto w-full">
                    <form class="flex flex-col gap-2 justify-center items-center p-2 text-black lg:w-96 w-full" on:submit={create_thread}>
                        <input type="text" placeholder="title" required class="w-full p-1" bind:value={title} />
                        <textarea placeholder="content" required class="w-full h-48 p-1" bind:value={content}></textarea>
                        <!-- might also allow for attachments here -->
                        <input type="submit" class="text-white cursor-pointer" value="create thread"/>
                    </form>
                </div>
            {/if}
        {/if}
    </div>
    <section class="border-2 bg-white text-black m-2">
        <h1 class="p-2 underline text-2xl font-bold">threads</h1>
        <div class="border-0 bg-black text-white font-normal">
            {#each data.forum_posts as post}
                <PostCard 
                id={post.id} 
                content={post.post_content} 
                title={post.post_title} 
                reply_count={post.reply_count} 
                poster={post.poster}
                />
            {/each}
        </div>
    </section>
</div>