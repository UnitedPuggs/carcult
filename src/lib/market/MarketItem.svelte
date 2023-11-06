<script>
    export let cover_pic;
    export let item_name;
    export let price;
    export let slug;
</script>

<!-- need to wrap this in an anchor once I've got slug pages -->
<a href="/market/{slug}" class="hover:opacity-75">
    <div class="w-40 lg:w-72 h-48 lg:h-72 border-2 border-white">
        <section class="w-full h-32 lg:h-48 border-2 border-b-gray-400 flex items-center ">
            <img src={cover_pic} alt="cover" class="w-full h-full object-cover">
        </section>
        <section class="flex flex-col text-center">
            <span class="font-bold text-xl">${price}</span>
            <span class="text-lg">{item_name}</span>
        </section>
    </div>
</a>