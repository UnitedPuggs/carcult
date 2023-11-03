<script>

</script>

<svelte:head>
    <title>carcult marketplace</title>
</svelte:head>

<div class="flex flex-row">
    <div class="flex flex-col border-2 border-white min-h-[calc(100vh_-_6rem)] w-64 p-2">
        <h1 class="font-bold text-2xl">Marketplace</h1>
        <form>
            <input type="input" class="bg-gray-800 border border-white px-0.5 py-1 mb-4" placeholder="search marketplace">
        </form>
        
        <label for="make-opts" class="font-bold text-xl">make</label>
        <select class="bg-gray-800" id="make-opts">
            <option>matsuda</option>
        </select>
        <label for="model-opts" class="font-bold text-xl">model</label>
        <select class="bg-gray-800" id="model-opts">
            <option>miaba</option>
        </select>

        <label class="font-bold text-xl">price</label>
        <div class="flex gap-2">
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="min" min=0>
            <span>to</span>
            <input type="number" step=100 class="bg-gray-800 w-24 px-1" placeholder="max" min=0>
        </div>
    </div>
</div>