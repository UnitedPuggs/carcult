<script>
    import { page } from '$app/stores'
    import { invalidateAll, goto } from '$app/navigation';
    export let data;
    let file;
    let jank_file;
    let edit_mode = false;

    let desc = data.garage_info[0].description;

    let curr_gallery_img = "";
    $: curr_gallery_idx = short.image_urls.indexOf(curr_gallery_img);


    $: short = data.garage_info[0];

    async function delete_vehicle(id) {
        await fetch('/api/garage/delete_vehicle', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
        goto(`/garage/${short.username}`)
    }

    async function remove_image() {
        let img_to_remove = curr_gallery_img;
        await fetch('/api/garage/remove_image', {
            method: "DELETE",
            body: JSON.stringify({id: short.id, url: img_to_remove, imgs: short.image_urls})
        })
        close_gallery();
        invalidateAll();
    }

    async function toggle_edit() {
        edit_mode = !edit_mode;
    }

    async function open_modal() {
        document.getElementById("upload-photo").showModal();
    }

    async function close_modal() {
        document.getElementById("upload-photo").close();
    }

    async function open_gallery() {
        document.getElementById("gallery").showModal();
    }

    async function close_gallery() {
        document.getElementById("gallery").close();
    }

    async function open_delete_prompt() {
        document.getElementById("delete-prompt").showModal();
    }

    async function close_delete_prompt() {
        document.getElementById("delete-prompt").close();
    }


    async function upload_image() {
        const form_data = new FormData();
        form_data.append("id", data.garage_info[0].id)
        form_data.append("vehc_short", data.garage_info[0].short_vehicle_name)
        form_data.append("file", jank_file);

        await fetch("/api/garage/upload_image", {
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

    async function prev_image() {
        if(curr_gallery_idx - 1 >= 0) {
            curr_gallery_img = short.image_urls[curr_gallery_idx - 1];
            curr_gallery_img = curr_gallery_img;
        }
    }

    async function next_image() {
        if(curr_gallery_idx + 1 < short.image_urls.length) {
            curr_gallery_img = short.image_urls[curr_gallery_idx + 1];
            curr_gallery_img = curr_gallery_img;
        }
    }

    async function set_main_img() {
        let temp = data.garage_info[0].image_urls[0]; //why did I not use short here?
        short.image_urls[0] = short.image_urls[curr_gallery_idx];
        short.image_urls[curr_gallery_idx] = temp;
        await fetch('/api/garage/update_main_img', {
            method: "PATCH",
            body: JSON.stringify({id: short.id, img_urls: short.image_urls})
        })
    }

    async function save_desc() {
        await fetch('/api/garage/update_vehc_desc', {
            method: "PATCH",
            body: JSON.stringify({id: short.id, desc: desc})
        })
        edit_mode = false;
        invalidateAll();
    }
</script>

<svelte:head>
    <title>{$page.params.slug}'s {short.vehicle_name}</title>
</svelte:head>

<div class="flex flex-col mt-10 justify-center items-center">
    <dialog id="delete-prompt" class="bg-black text-white text-center border-2 border-white">
        <div class="p-10">
            <h1 class="text-xl font-bold">this COMPLETELY removes your vehicle. are you sure?</h1>
            <div class="flex justify-center gap-8 text-lg mt-4">
                <button class="hover:opacity-75 border-2 border-white px-2 py-1 rounded-sm" on:click={() => delete_vehicle(short.id)}>yes</button>
                <button class="hover:opacity-75 border-2 border-white px-3 py-1 rounded-sm" on:click={close_delete_prompt}>no</button>
            </div>
        </div>
    </dialog>

    
    <h1 class="text-2xl font-bold">{short.vehicle_name}</h1>
    <img src={short.image_urls[0]} alt="your cool car" class="w-[512px] h-auto max-h-[296px] object-cover border-2 border-white"/>
    <h2 class="font-bold text-xl">description</h2>
    {#if !edit_mode}
        <p class="p-1 whitespace-pre-wrap">{short.description}</p> <!-- Had a contenteditable here. Don't think I need it? -->
    {:else}
        <textarea bind:value={desc} class="text-black p-1 h-60 w-96"></textarea>
    {/if}

    {#if $page.data.session?.user.displayname == short.username}
        <dialog id="upload-photo" class="bg-black text-white text-center">
            <div class="justify-start text-left">
                <button class="text-2xl hover:opacity-75" on:click={close_modal}>x</button>
            </div>
            <label class="my-2">
                <input type="file" id="file" name="file" bind:value={file} class="hidden" on:change={(e) => uploaded_file(e)} multiple /> <!-- Might need some styling on this bad boy -->            
                {#if file}
                    <img src={file} alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-cover cursor-pointer"/>
                {:else}
                    <img src="/assets/image_upload.png" alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-none cursor-pointer"/>
                {/if}
            </label>
            <button class="text-xl hover:opacity-75" on:click={upload_image}>upload</button>
        </dialog>
        <div class="flex">
            <button class="mt-2 mx-2 px-1 hover:opacity-75 justify-start" on:click={open_modal}>add image</button>
            <button class="mt-2 mx-2 px-1 hover:opacity-75" on:click={toggle_edit}>edit</button>
            {#if edit_mode}
                <button class="mt-2 mx-2 px-1 hover:opacity-75" on:click={open_delete_prompt}>remove</button>
                <button class="mt-2 mx-2 px-1 hover:opacity-75" on:click={save_desc}>save</button>
            {/if}
        </div>
    {/if}

    <h2 class="font-bold text-xl p-1">gallery</h2>

    <section class="border-4 border-white p-2 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
        {#each short.image_urls as pics}
        <button 
        on:click={() => { 
            open_gallery()
            curr_gallery_img = pics;
        }
        } 
        class="border border-white"
        >
            <img src={pics} alt="gallery" class="w-[300px] h-[170px] object-cover border border-white" />
        </button>
        {/each}
    </section>
    
    <dialog id="gallery" class="bg-black text-white text-center backdrop:backdrop-blur-sm">
        <div class="justify-start text-left">
            <button class="text-2xl hover:opacity-75" on:click={close_gallery}>x</button>
        </div>
        <div class="flex">
        {#if curr_gallery_idx > 0}
            <button class="text-2xl px-4 hover:opacity-75 select-none" on:click={prev_image}>&lt;</button>
        {:else}
            <span class="invisible text-2xl px-4">!</span>
        {/if}
        <div style="background-image: url('{curr_gallery_img}');" class="bg-cover bg-no-repeat border-2 border-white select-none">
            <img src={curr_gallery_img} alt="" class="w-[1296px] h-[400px] md:h-[732px] object-contain backdrop-blur-md"/>
        </div>
        {#if curr_gallery_idx < short.image_urls.length - 1}
            <button class="text-2xl px-4 hover:opacity-75 select-none" on:click={next_image}>&gt;</button>
        {:else}
            <span class="invisible text-2xl px-4">!</span>
        {/if}
        </div>
        {#if $page.data.session?.user.displayname == short.username}
        <section class="flex flex-col">
            <button class="hover:opacity-75 md:w-fit mx-auto" on:click={set_main_img}>set as main</button>
            <button class="hover:opacity-75 md:w-fit mx-auto" on:click={remove_image}>remove image</button>
        </section>
        {/if}
    </dialog>
    
</div>