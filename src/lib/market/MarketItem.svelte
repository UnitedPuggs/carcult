<script>
    let {
        cover_pic,
        item_name,
        price,
        slug,
        transmission,
        title_status,
        mileage
    } = $props();
</script>

<!-- need to wrap this in an anchor once I've got slug pages -->
<a href="/market/{slug}" class="hover:opacity-75 w-full h-fit rounded-md bg-gray-800">
    <div class="w-full">
        <section class="w-full h-32 lg:h-48 flex items-center">
            <img src={cover_pic} alt="cover" class="w-full h-full object-cover rounded-md">
        </section>
        <!-- super weird behavior when using h-full on this section for some reason -->
        <section class="flex flex-col text-left ml-2 text-ellipsis overflow-x-hidden h-36">
            <span class="font-bold text-xl">${price}</span>
            <span class="lg:text-lg break-words">{item_name}</span>
            <div class="flex flex-col *:text-gray-400 *:text-sm">
                {#if mileage > 0}
                    <span>{mileage} miles</span>
                {/if}
                {#if title_status}
                    <span>{title_status} title</span>
                {/if}
                {#if transmission}
                    <span>{transmission} transmission</span>
                {/if}
            </div>
        </section>
    </div>
</a>