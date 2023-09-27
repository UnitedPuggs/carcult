<script>
    import { invalidateAll } from '$app/navigation';
    export let main_image;
    export let vehicle_name;
    export let desc;
    export let info_id;
    let edit_mode = false;

    async function toggle_edit() {
        edit_mode = !edit_mode
    }

    async function delete_vehicle(id) {
        await fetch('/api/garage/delete_vehicle', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
        edit_mode = false;
        invalidateAll();
    }

    if(main_image.includes("undefined"))
        main_image = "https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/garage_photos/Hulk_Hogan.jpg"
</script>

<div class="flex flex-row flex-wrap border-2 border-white" id={info_id}>
    <img src={main_image} alt="cars" class="border-2 border-white w-[32rem] sm:h-52 md:h-auto md:max-h-[296px] object-cover">
    <div class="grow"> <!-- Not too sure why, but removing this grow breaks the grow on the grandchild div -->
        <div class="flex flex-row">
            <span class="text-2xl font-bold md:pr-32 md:pl-4">{vehicle_name}</span>
            <div class="flex flex-col grow"> 
                <button class="flex-row-reverse justify-end mr-2 mt-2 ml-auto hover:opacity-75" on:click={toggle_edit}>edit</button>
                {#if edit_mode}
                    <button class="flex-row-reverse justify-end mr-2 ml-auto hover:opacity-75">save</button>
                    <button class="flex-row-reverse justify-end mr-2 ml-auto hover:opacity-75 -mb-12" on:click={() => delete_vehicle(info_id)}>delete</button>
                {/if}
            </div>
        </div>
        {#if desc} 
            <p class="md:pl-4">{desc}</p>
        {/if}
    </div>
</div>