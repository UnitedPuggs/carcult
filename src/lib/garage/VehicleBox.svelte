<script>
    import { page } from '$app/stores'
    export let main_image;
    export let vehicle_name;
    export let desc;
    export let info_id;
    export let vehicle_slug;

    if(typeof main_image == 'undefined')
        main_image = "https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/garage_photos/Hulk_Hogan.jpg"
</script>

<a href="{$page.url.pathname}/{vehicle_slug}">
    <div class="flex flex-row flex-wrap border-2 border-white hover:opacity-75" id={info_id}>
        <img src={main_image} alt="cars" class="border-2 border-white w-[32rem] sm:h-52 md:h-auto md:max-h-[296px] object-cover">
        <div class="grow"> <!-- Not too sure why, but removing this grow breaks the grow on the grandchild div -->
            <div class="flex flex-row">
                <span class="text-2xl font-bold md:pr-32 md:pl-4">{vehicle_name}</span>
            </div>
            {#if desc} 
                <p class="md:pl-4">{desc}</p>
            {/if}
        </div>
    </div>
</a>