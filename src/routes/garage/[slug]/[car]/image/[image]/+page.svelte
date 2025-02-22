<script>
    import { page } from "$app/state";

    let { data } = $props();

    let stats = $state(data.stats[0]);
    let image_urls = $state(data.image_urls[0]);

    $effect(() => {
        stats = data.stats[0];
        image_urls = data.image_urls[0];
    });

    let index = $derived(image_urls.image_urls.indexOf(stats.image_url))

    async function delete_image() {
        const BYE_BYE = stats.image_url;
        await fetch('/api/garage/remove_image', {
            method: "DELETE",
            body: JSON.stringify({
                id: image_urls.id,
                url: BYE_BYE,
                images: image_urls.image_urls
            })
        });
    }
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

<div class="flex flex-col justify-center items-center h-auto my-4 lg:w-96 w-72 mx-auto">
    <div class="flex justify-between w-full">
        <form method="post" action="?/setMain">
            <input type="submit" value="set main" />
        </form>
        <button onclick={() => delete_image()}>delete</button>
    </div>
    <div class="flex flex-col justify-center border border-black rounded-lg bg-cover w-full h-96 bg-no-repeat overflow-clip" style="background-image: url('{stats.image_url}')">
        <img src={stats.image_url} alt="car" class="max-h-96 backdrop-blur-md overflow-clip object-scale-down w-full h-full rounded-lg" />
    </div>
    <div class="flex flex-col w-full">
        <p>{stats.caption}</p>
        <p class="text-sm text-gray-400">{stats.created_at}</p>
        <div class="flex justify-between"> 
            {#if index == 0} <!-- if start of image array-->
                <span class="text-gray-300">← next</span>
                <a href="{ previous_image_linker() }" class="text-end">prev →</a>
            {:else if index == image_urls.image_urls.length - 1} <!-- if end of image array -->
                <a href="{ next_image_linker() }" class="text-start">← next</a>
                <span class="text-gray-300">prev →</span>
            {:else} <!-- between start and end-->
                <a href="{ next_image_linker() }">← next</a>
                <a href="{ previous_image_linker() }">prev →</a>
            {/if}
        </div>
        <hr class="border border-gray-400 mt-2 w-full"/>
    </div>
</div>