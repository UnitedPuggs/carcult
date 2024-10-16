<script>
    import { page } from '$app/stores'
    import { invalidateAll, goto } from '$app/navigation';
    import { swipe } from "svelte-gestures";

    export let data;

    let file;
    let jank_file;
    let edit_mode = false;

    let width = 0;
    let desc = data.garage_info[0].description;

    let curr_gallery_img = "";
    $: curr_gallery_idx = short.image_urls.indexOf(curr_gallery_img);

    let show_gallery_modal = false;
    $: short = data.garage_info[0];

    let textarea;
    $: if(textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

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
        show_gallery_modal = true;
        show_gallery_modal = show_gallery_modal;
    }

    async function close_gallery() {
        document.getElementById("gallery").close();
        show_gallery_modal = false;
        show_gallery_modal = show_gallery_modal;
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
        console.log(short.image_urls)
        await fetch('/api/garage/update_main_img', {
            method: "PATCH",
            body: JSON.stringify({id: short.id, img_urls: short.image_urls})
        });
    }

    async function save_desc() {
        await fetch('/api/garage/update_vehc_desc', {
            method: "PATCH",
            body: JSON.stringify({id: short.id, desc: desc})
        })
        edit_mode = false;
        invalidateAll();
    }

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent('outclick'));
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
	    };
    }
    
    async function handler() {
        if(event.detail.direction == "left") {
            await next_image();
        } else if (event.detail.direction == "right") {
            await prev_image();
        }
    }
</script>

<svelte:head>
    <title>{$page.params.slug}'s {short.vehicle_name}</title>
</svelte:head>

<a href="/garage/{$page.params.slug}" class="text-3xl hover:opacity-80">&lt;-</a>
<div class="flex flex-col justify-center items-center">
    <!-- Modal for removing vehicle -->
    <dialog id="delete-prompt" class=" text-center border-2 border-black rounded-lg offset-box">
        <div class="p-10">
            <h1 class="text-xl font-bold">this COMPLETELY removes your vehicle. are you sure?</h1>
            <div class="flex justify-center gap-2 text-lg mt-4">
                <button class="border border-red-500 warning-box py-1 px-4 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" on:click={() => delete_vehicle(short.id)}>yes</button>
                <button class="border border-gray-400 box py-1 px-4 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" on:click={close_delete_prompt}>no</button>
            </div>
        </div>
    </dialog>
    <!----------------------------->
    <h1 class="text-2xl font-bold italic">{short.vehicle_name}</h1>
    <div class="bg-cover bg-no-repeat overflow-clip border-2 border-black rounded-lg less-offset-box w-72 h-72 lg:h-[30rem] lg:w-[30rem]" style="background-image: url('{short.image_urls[0]}')">
        <img src={short.image_urls[0]} alt="your cool car" class="overflow-clip object-scale-down backdrop-blur-md h-full w-full"/>
    </div>
    <h2 class="font-bold text-xl mt-2">description</h2>
    {#if !edit_mode}
        <p class="p-1 whitespace-pre-wrap w-72 lg:w-96">{short.description}</p> <!-- Had a contenteditable here. Don't think I need it? -->
    {:else}
        <textarea 
        bind:value={ desc } 
        class="text-black p-1 max-h-60 w-72 lg:w-96 {edit_mode ? "border border-red-500 rounded-lg" : ""}" 
        bind:this={ textarea }></textarea>
    {/if}

    {#if $page.data.session?.user.displayname == short.username}
        <!-- Modal to upload new photos -->
        <dialog id="upload-photo" class="bg-transparent text-center backdrop:backdrop-blur-sm">
            <div class="flex flex-col m-20">
                <div class="mr-auto ml-0">
                    <button class="text-2xl text-white hover:opacity-80" on:click={ close_modal }>x</button>
                </div>
                <div>
                    <label>
                        <input type="file" id="file" accept="image/*" name="file" bind:value={file} class="hidden" on:change={(e) => uploaded_file(e)} multiple /> <!-- Might need some styling on this bad boy -->            
                        <div 
                        class="bg-cover bg-no-repeat border-2 border-black rounded-lg offset-box overflow-clip" 
                        style={file ? `background-image: url('${file}')` : ""}
                        >
                            <img 
                            src={file ? file : "/assets/image_upload.png"} 
                            alt="upload your car" 
                            class="backdrop-blur-md w-96 h-96 cursor-pointer object-scale-down {file ? "bg-none" : "bg-white"}"
                            />
                        </div>
                    </label>
                    <button 
                    class="text-xl font-semibold border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 bg-white mt-4" 
                    on:click={ upload_image }>
                    upload
                    </button>
                </div>
            </div>
        </dialog>
        <!------------------------------>
        <div class="flex flex-col gap-2 py-1">
            <div class="flex gap-1 justify-center items-center">
                <button 
                class="border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" 
                on:click={ open_modal }
                >
                add image
                </button>
                <button 
                class="{!edit_mode ? "border-black box p-1 ": "border-red-500 warning-box px-4 py-1"} border rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" 
                on:click={ toggle_edit }
                >
                {!edit_mode ? "edit": "x"}
                </button>
            </div>
            {#if edit_mode}
                <div class="flex gap-1 justify-center items-center">
                    <button 
                    class="border border-red-500 warning-box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" 
                    on:click={ open_delete_prompt }
                    >
                    remove
                    </button>
                    <button 
                    class="border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" 
                    on:click={ save_desc }
                    >
                    save
                    </button>
                </div>
            {/if}
        </div>
    {/if}
    <!-- Photo gallery -->
    <h2 class="font-bold text-xl">gallery</h2>
    <section class="border-4 border-white p-2 flex justify-center gap-4">
        {#each short.image_urls as pic}
            <button 
            on:click={() => { 
                open_gallery()
                curr_gallery_img = pic;
            }
            } 
            class=" bg-cover bg-no-repeat border border-black rounded-lg box transition-all hover:no-box hover:translate-y-1 overflow-clip"
            style="background-image: url('{pic}')"
            >
                <img src={pic} alt="gallery" class="w-48 h-32 lg:w-80 lg:h-68 object-scale-down backdrop-blur-md" />
            </button>
        {/each}
    </section>
    <!----------------->
    <!-- Modal for 'expanded' gallery photo-->
    <dialog id="gallery" class="bg-transparent text-center backdrop:backdrop-blur-sm" bind:clientWidth={width} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y'}} on:swipe={handler}>
        {#if show_gallery_modal}
            <div class="m-2" use:clickOutside on:outclick={() => close_gallery()} bind:clientWidth={width} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y'}} on:swipe={handler}>
                <div class="justify-start text-left">
                    <button class="text-2xl hover:opacity-75" on:click={close_gallery}>x</button>
                </div>
                <div class="flex">
                {#if curr_gallery_idx > 0}
                    <button class="text-2xl px-4 hover:opacity-80" on:click={prev_image}>&lt;</button>
                {:else}
                    <span class="invisible text-2xl px-4">!</span>
                {/if} <!-- I think there's an issue with the swipe library and select-none lol -->
                <div style="background-image: url('{curr_gallery_img}');" class="bg-cover bg-no-repeat border-2 border-black rounded-lg select-none overflow-clip">
                    <img src={curr_gallery_img} alt="" class="lg:w-[1296px] h-72 lg:h-[732px] object-contain backdrop-blur-md"/>
                </div>
                {#if curr_gallery_idx < short.image_urls.length - 1}
                    <button class="text-2xl px-4 hover:opacity-80" on:click={next_image}>&gt;</button>
                {:else}
                    <span class="invisible text-2xl px-4">!</span>
                {/if}
                </div>
                {#if $page.data.session?.user.displayname == short.username}
                <section class="flex flex-col gap-2 mt-1">
                    <button 
                    class="bg-white border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 w-fit mx-auto" 
                    on:click={set_main_img}>
                    set as main
                    </button>
                    <button 
                    class="bg-white border border-red-500 warning-box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 w-fit mx-auto" 
                    on:click={remove_image}
                    >
                    remove image
                    </button>
                </section>
                {/if}
            </div>
        {/if}
    </dialog>
    <!------------------------------------->
</div>