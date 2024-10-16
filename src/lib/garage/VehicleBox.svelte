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

<a href="{$page.url.pathname}/{vehicle_slug}" class="transition-all active:scale-90">
    <div class="group flex flex-row flex-wrap hover:opacity-80 border border-black rounded-lg pb-3 pt-2 px-1" id={info_id}>
        <div class="border-2 border-black rounded-xl overflow-clip less-offset-box transition-all hover:no-box hover:translate-x-1 hover:translate-y-1 bg-cover bg-no-repeat" style="background-image: url('{main_image}')">
            <img src={main_image} alt="cars" class="w-[32rem] h-52 lg:h-auto lg:max-h-[296px] object-scale-down backdrop-blur" loading="lazy">
        </div>
        <div class="grow"> <!-- Not too sure why, but removing this grow breaks the grow on the grandchild div -->
            <div class="flex flex-row">
                <span class="text-2xl font-bold md:pr-32 md:pl-4 group-hover:underline">{vehicle_name}</span>
            </div>
            <p class="md:pl-4 whitespace-pre-wrap text-wrap">{desc ? desc : undefined}</p>
        </div>
    </div>
</a>