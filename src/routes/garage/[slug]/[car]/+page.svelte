<script>
    import { page } from '$app/stores'
    import { invalidateAll } from '$app/navigation';
    export let data;
    let file;
    let jank_file;

    $: short = data.garage_info[0];

    async function delete_vehicle(id) {
        await fetch('/api/garage/delete_vehicle', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
    }

    async function open_modal() {
        document.getElementById("upload-photo").showModal();
    }

    async function close_modal() {
        document.getElementById("upload-photo").close();
    }

    async function upload_image() {
        const form_data = new FormData();
        form_data.append("id", data.garage_info[0].id)
        form_data.append("vehc_short", data.garage_info[0].short_vehicle_name)
        form_data.append("file", jank_file);

        const res = await fetch("/api/garage/upload_image", {
            method: "post",
            body: form_data,
        });

        jank_file = null;
        file = null;
        close_modal();
        invalidateAll();
    }

    const uploaded_file = (e) => {
        let img = e.target.files[0];
        jank_file = img;
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = e => {
            file = e.target.result;
        }
    }
</script>

<div class="flex flex-col mt-10 justify-center items-center">

    <h1 class="text-2xl font-bold">{short.vehicle_name}</h1>
    <img src={short.image_urls[0]} alt="your cool car" class="w-[512px] h-auto max-h-[296px] object-cover border-2 border-white"/>
    <h2 class="font-bold text-xl">description</h2>
    <p class="p-1">{short.description}</p>
    <h2 class="font-bold text-xl p-1">gallery</h2>

    <section class="border-4 border-white p-2 grid grid-cols-4 gap-4">
        {#each short.image_urls as pics}
            <img src={pics} alt="gallery" class="w-[300px] h-[170px] object-cover border border-white"/>
        {/each}
    </section>
    
    {#if $page.data.session?.user.displayname == short.username}
        <dialog id="upload-photo" class="bg-black text-white text-center">
            <div class="justify-start text-left">
                <button class="text-2xl hover:opacity-75" on:click={close_modal}>x</button>
            </div>
            <label class="my-2">
                <input type="file" id="file" name="file" bind:value={file} class="hidden" on:change={(e) => uploaded_file(e)} /> <!-- Might need some styling on this bad boy -->            
                {#if file}
                    <img src={file} alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-cover cursor-pointer"/>
                {:else}
                    <img src="/assets/image_upload.png" alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-none cursor-pointer"/>
                {/if}
            </label>
            <button class="text-xl hover:opacity-75" on:click={upload_image}>upload</button>
        </dialog>
        <div class="flex">
            <button class="mt-2 mx-2 hover:opacity-75" on:click={open_modal}>add image</button>
            <button class="mt-2 mx-2 hover:opacity-75" on:click={() => delete_vehicle(short.id)}>delete</button>
        </div>
    {/if}
</div>