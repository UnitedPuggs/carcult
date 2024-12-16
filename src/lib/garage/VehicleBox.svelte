<script>
    import { page } from '$app/stores'
    let {
        main_image = $bindable(),
        vehicle_name,
        desc,
        info_id,
        vehicle_slug
    } = $props();

    if(typeof main_image == 'undefined')
        main_image = "https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/garage_photos/Hulk_Hogan.jpg"
</script>

<a href="{$page.url.pathname}/{vehicle_slug}" class="transition-all active:scale-90">
    <div class="group flex flex-col lg:justify-normal lg:items-start justify-center items-center lg:flex-row flex-wrap hover:opacity-80 border border-black rounded-lg pb-3 pt-2 px-1" id={info_id}>
        <div class="border-2 border-black rounded-md overflow-clip less-offset-box transition-all hover:no-box hover:translate-x-1 hover:translate-y-1 bg-cover bg-no-repeat -translate-y-1 lg:-translate-y-0 w-fit" style="background-image: url('{main_image}')">
            <img src={main_image} alt="cars" class="w-72 h-72 lg:w-80 lg:h-80 object-scale-down backdrop-blur" loading="lazy">
        </div>
        <div>
            <div class="flex flex-col lg:flex-row flex-wrap">
                <span class="text-2xl font-bold lg:pl-4 group-hover:underline lg:text-start text-center">{vehicle_name}</span>
            </div>
            <p class="md:pl-4 whitespace-pre-wrap text-wrap">{desc ? desc : undefined}</p>
        </div>
    </div>
</a>