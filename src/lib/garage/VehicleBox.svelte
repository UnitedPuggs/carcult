<script>
    export let main_image;
    export let vehicle_name;
    export let desc;
</script>

<div class="flex flex-row border-2 border-white min-h-[300px] max-h-[300px]">
    <img src={main_image} alt="" class="border-r-2 border-white w-[32rem] max-h-[296px] object-cover">
    <div>
        <span class="text-2xl font-bold md:pr-32 md:pl-4">{vehicle_name}</span>
        {#if desc} 
            <p class="md:pl-4">{desc}</p>
        {/if}
    </div>
</div>