<script>
    export let main_image;
    export let vehicle_name;
    export let desc;
    export let info_id;

    if(main_image.includes("undefined"))
        main_image = "https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/garage_photos/Hulk_Hogan.jpg"
</script>

<div class="flex flex-row flex-wrap border-2 border-white">
    <img src={main_image} alt="cars" class="border-2 border-white w-[32rem] h-auto md:max-h-[296px] object-cover">
    <div class="">
        <span class="text-2xl font-bold md:pr-32 md:pl-4">{vehicle_name}</span>
        {#if desc} 
            <p class="md:pl-4">{desc}</p>
        {/if}
    </div>
</div>