<script>
    //export let cover_pic;
    export let item_name;
    export let price;
    //export let slug;
</script>

<!-- need to wrap this in an anchor once I've got slug pages -->
<div class="w-72 h-72 border-4 border-white">
    <section class="w-full h-48 border-2 border-b-gray-400 bg-gradient-to-r from-purple-500 to-pink-500">
        image here
    </section>
    <section class="flex flex-col text-center">
        <span class="font-bold text-xl">${price}</span>
        <span class="text-lg">{item_name}</span>
    </section>
</div>