<script>
    export let main_image;
    export let vehicle_name;
    export let desc;
</script>

<div class="flex flex-row border-2 border-white min-w-full max-w-full min-h-[224px] max-h-[224px] w-[calc(100vw_-_200px)] md:w-[calc(100vw_-_320px)]">
    <img src={main_image} alt="" class="border-r-2 border-white w-60 h-auto max-h-[220px]">
    <div>
        <span class="text-2xl font-bold md:pr-32 md:pl-4">{vehicle_name}</span>
        {#if desc} 
            <p class="md:pl-4">{desc}</p>
        {/if}
    </div>
</div>