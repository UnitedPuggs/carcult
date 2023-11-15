<script>
    export let cover_pic;
    export let item_name;
    export let price;
    export let slug;
</script>

<!-- need to wrap this in an anchor once I've got slug pages -->
<a href="/market/{slug}" class="hover:opacity-75 w-full">
    <div class="w-full lg:w-full h-60 lg:h-72 border-2 border-white max-h-72">
        <section class="w-full h-32 lg:h-48 border-b-2 border-gray-500 flex items-center">
            <img src={cover_pic} alt="cover" class="w-full h-full object-cover">
        </section>
        <!-- super weird behavior when using h-full on this section for some reason -->
        <section class="flex flex-col text-center text-ellipsis overflow-x-hidden h-[108px] lg:h-[92px]">
            <span class="font-bold text-xl top-0 sticky bg-black z-50">${price}</span>
            <span class="text-lg break-all">{item_name}</span>
        </section>
    </div>
</a>