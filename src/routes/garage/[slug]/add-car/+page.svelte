<script>
    let car;
</script>


<div>
    <div class="flex justify-center items-center mt-4">
        <form class="flex flex-col">
            <input type="text" class="text-black py-1 px-0.5" bind:value={car} placeholder="car here">
            <input type="submit" value="add" class="hover:opacity-75 cursor-pointer">
        </form>
    </div>
</div>