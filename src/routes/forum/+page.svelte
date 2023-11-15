<script>
    import PostCard from '$lib/forum/PostCard.svelte';
    export let data;
</script>

<svelte:head>
    <title>carcult forum</title>
</svelte:head>

<div class="flex flex-col mt-10">
    <div>
        <!-- think I might take some inspo from how 4chan does new posts -->
        <a href="" class="p-2">create new thread</a>
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