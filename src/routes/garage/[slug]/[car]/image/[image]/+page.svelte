<script>
    let { data } = $props();

    let stats = $state(data.stats[0]);
    let image_urls = $state(data.image_urls[0]);

    $effect(() => {
        stats = data.stats[0];
        image_urls = data.image_urls[0];
    });

    let index = $derived(image_urls.image_urls.indexOf(stats.image_url))

    function next_image_linker() {
        let next = index - 1;
        let pic = image_urls.image_urls[next];
        return pic.substring(pic.lastIndexOf("/") + 1)
    }
    function previous_image_linker() {
        let prev = index + 1;
        let pic = image_urls.image_urls[prev];
        return pic.substring(pic.lastIndexOf("/") + 1)
    }
</script>

<div class="flex flex-col justify-center items-center h-auto my-4">
    <div class="flex flex-col justify-center border border-black rounded-lg w-96 h-96 bg-cover bg-no-repeat overflow-clip" style="background-image: url('{stats.image_url}')">
        <img src={stats.image_url} alt="car" class="max-h-96 backdrop-blur-md overflow-clip object-scale-down w-full h-full rounded-lg" />
    </div>
    <div class="flex flex-col">
        <p>{stats.caption}</p>
        <p class="text-sm text-gray-400">{stats.created_at}</p>
        <div class="flex justify-between"> 
            {#if index == 0} <!-- if start of image array-->
                <span class="text-gray-300">← next</span>
                <a href="{ previous_image_linker() }" class="text-end">prev →</a>
            {:else if index == image_urls.image_urls.length - 1} <!-- if end of image array -->
                <a href="{ next_image_linker() }" class="text-start">← next</a>
                <span class="text-gray-300">prev </span>
            {:else} <!-- between start and end-->
                <a href="{ next_image_linker() }">← next</a>
                <a href="{ previous_image_linker() }">prev →</a>
            {/if}
        </div>
        <hr class="border border-gray-400 mt-2 w-96"/>
    </div>
</div>