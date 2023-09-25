<script>
    let car;
    let file;

   
</script>

<svelte:head>
    <title>adding to your garage!</title>
</svelte:head>

<div>
    <div class="flex flex-col justify-center items-center mt-4">
        <form class="flex flex-col" method="POST" enctype="multipart/form-data">
            <input type="text" class="text-black py-1 px-0.5" placeholder="car here" id="car" name="car" required>
            <input type="file" id="file" name="file" bind:value={file}>
            <textarea class="text-black" id="desc" name="desc" placeholder="description here"></textarea>
            <input type="submit" value="add" class="hover:opacity-75 cursor-pointer">
        </form>
    </div>
</div>