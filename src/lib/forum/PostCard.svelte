<script>
    export let id;
    export let content;
    export let title;
    export let reply_count;
    export let poster;
</script>

<a href="/forum/post/{id}">
    <div class="flex flex-col p-2 border h-34 bg-gray-700 hover:opacity-75">
        <h1 class="text-2xl font-bold">{title}</h1>
        <span class="h-32 w-full lg:w-96 overflow-y-clip">{content}</span>
        <section class="flex mt-auto mb-0">
            <h2 class="text-sm text-gray-400">posted by {poster}</h2>
            <span class="ml-auto mr-4">r: {reply_count}</span>
        </section>
    </div>
</a>