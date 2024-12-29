<script>
    import { run } from 'svelte/legacy';

    import { page } from '$app/stores'
    import { invalidateAll, goto } from '$app/navigation';
    import { swipe } from "svelte-gestures";
    import { enhance } from '$app/forms';

    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";

    let { data } = $props();

    let file = $state();
    let jank_file;
    let edit_mode = $state(false);

    let width = $state(0);
    let desc = $state(data.garage_info[0].description);

    let curr_gallery_img = $state("");

    let show_gallery_modal = $state(false);

    let textarea = $state();

    async function delete_vehicle(id) {
        await fetch('/api/garage/delete_vehicle', {
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
        goto(`/garage/${short.username}`)
    }

    async function remove_image(index) {
        const REMOVE_IMG = short.image_urls[index];
        await fetch('/api/garage/remove_image', {
            method: "DELETE",
            body: JSON.stringify({id: short.id, url: REMOVE_IMG, imgs: short.image_urls})
        });
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

    async function set_main_img(index) {
        const GARAGE_INFO = data.garage_info[0];
        let temp = GARAGE_INFO.image_urls[0]; //why did I not use short here?
        GARAGE_INFO.image_urls[0] = GARAGE_INFO.image_urls[index];
        GARAGE_INFO.image_urls[index] = temp;
        console.log(`ur urls ${GARAGE_INFO.image_urls}`)
        await fetch('/api/garage/update_main_img', {
            method: "PATCH",
            body: JSON.stringify({id: short.id, img_urls: GARAGE_INFO.image_urls})
        });
        invalidateAll();
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
    let short = $derived(data.garage_info[0]);
    let curr_gallery_idx = $derived(short.image_urls.indexOf(curr_gallery_img));
    run(() => {
        if(textarea) {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    });
</script>

<svelte:head>
    <title>{$page.params.slug}'s {short.vehicle_name}</title>
</svelte:head>

<a href="/garage/{$page.params.slug}" class="text-3xl hover:opacity-80">&lt;-</a>
<div class="flex flex-col justify-center items-center">
    <!-- Modal for removing vehicle -->
    <dialog id="delete-prompt" class=" text-center border-2 border-black rounded-lg">
        <div class="p-10">
            <h1 class="text-xl font-bold">this COMPLETELY removes your vehicle. are you sure?</h1>
            <div class="flex justify-center gap-2 text-lg mt-4">
                <button class="border border-red-500 warning-box py-1 px-4 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" onclick={() => delete_vehicle(short.id)}>yes</button>
                <button class="border border-gray-400 box py-1 px-4 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" onclick={ close_delete_prompt }>no</button>
            </div>
        </div>
    </dialog>
    <!----------------------------->
    <h1 class="text-2xl font-bold italic">{short.vehicle_name}</h1>
    <div class="bg-cover bg-no-repeat overflow-clip border-2 border-black rounded-lg less-offset-box w-72 h-72 lg:h-[30rem] lg:w-[30rem]" style="background-image: url('{short.image_urls[0]}')">
        <img src={short.image_urls[0]} alt="your cool car" class="overflow-clip object-scale-down backdrop-blur-md h-full w-full"/>
    </div>
    <div class="flex flex-col justify-center items-center text-"> <!-- description stuff -->
        <h2 class="font-bold text-xl mt-2">description</h2>
        {#if !edit_mode}
            <p class="p-1 whitespace-pre-wrap max-w-sm lg:max-w-md">{short.description}</p> <!-- Had a contenteditable here. Don't think I need it? -->
        {:else}
            <textarea 
            bind:value={ desc } 
            class="text-black p-1 max-h-60 w-72 lg:w-96 {edit_mode ? "border border-red-500 rounded-lg" : ""}" 
            bind:this={ textarea }></textarea>
        {/if}
    </div>
    {#if $page.data.session?.user.displayname == short.username}
        <!-- Modal to upload new photos -->
        <dialog id="upload-photo" class="bg-transparent text-center backdrop:backdrop-blur-sm">
            <div class="flex flex-col m-20">
                <div class="mr-auto ml-0 border-2 border-black box-shadow mb-2 p-1 h-fit w-8 bg-white dark:bg-[#272933] active:scale-90 transition-all hover:opacity-80 hover:translate-x-1 hover:translate-y-1 hover:no-box rounded-sm">
                    <button class="text-2xl hover:opacity-80 dark:text-white" onclick={ close_modal }>x</button>
                </div>
                <form method="post" action="?/addImage" enctype="multipart/form-data" use:enhance class="dark:text-white">
                    <label>
                        <input type="file" name="image" id="file" accept="image/*" bind:value={file} class="hidden" onchange={(e) => uploaded_file(e)} multiple /> <!-- Might need some styling on this bad boy -->            
                        <div 
                        class="flex justify-center items-center bg-cover bg-no-repeat border-2 border-black rounded-lg offset-box overflow-clip w-96 h-96 bg-white dark:bg-[#272933]" 
                        style={file ? `background-image: url('${file}')` : ""}
                        >
                        {#if file}
                            <img src={file} alt="uploaded car" class="backdrop-blur-md w-96 h-96 cursor-pointer object-scale-down {file ? "bg-none" : "bg-white"}"/>
                        {:else}
                            <svg fill="currentColor" version="1.1" viewBox="0 0 487 487" class="backdrop-blur-md w-72 h-72 cursor-pointer object-scale-down p-4">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <g> <g> 
                                <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9 v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"></path> 
                                    </g> </g> 
                                </g>
                            </svg>
                        {/if}
                        </div>
                    </label>
                    <input
                    type="submit" 
                    class="text-xl font-semibold btn bg-white dark:bg-[#272933] mt-4 cursor-pointer" 
                    value="upload"
                    onclick={ close_modal }
                    >
                </form>
            </div>
        </dialog>
        <!------------------------------>
        <div class="flex flex-col gap-2 py-1">
            <div class="flex gap-1 justify-center items-center">
                <button 
                class="btn" 
                onclick={ open_modal }
                >
                add image
                </button>
                <button 
                class="{!edit_mode ? "border-black box p-1 ": "border-red-500 warning-box px-4 py-1"} btn" 
                onclick={ toggle_edit }
                >
                {!edit_mode ? "edit": "x"}
                </button>
            </div>
            {#if edit_mode}
                <form class="flex gap-1 justify-center items-center">
                    <button 
                    class="border border-red-500 warning-box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80" 
                    onclick={ open_delete_prompt }
                    >
                    remove
                    </button>
                    <button 
                    class="btn cursor-pointer" 
                    onclick={ save_desc } 
                    >
                    save
                    </button>
                </form>
            {/if}
        </div>
    {/if}
    <!-- Photo gallery -->
    <h2 class="font-bold text-xl">gallery</h2>
    <section class="p-2 flex justify-center gap-4">
        {#each short.image_urls as pic}
            <button 
            onclick={() => { 
                open_gallery()
                curr_gallery_img = pic;
            }} 
            class=" bg-cover bg-no-repeat border border-black rounded-lg box transition-all hover:no-box hover:translate-y-1 overflow-clip"
            style="background-image: url('{pic}')"
            >
                <img src={pic} alt="gallery" class="w-48 h-32 lg:w-80 lg:h-68 object-scale-down backdrop-blur-md" />
            </button>
        {/each}
    </section>
    <!----------------->
    <!-- Modal for 'expanded' gallery photo-->
    <dialog id="gallery" class="bg-transparent text-center backdrop:backdrop-blur-sm">
        {#if show_gallery_modal}
            <div class="m-2" use:clickOutside onoutclick={() => close_gallery()}>
                <div class="justify-start text-left">
                    <button class="text-2xl hover:opacity-75" onclick={close_gallery}>x</button>
                </div>
                <Carousel.Root class="w-full max-w-6xl" opts={{ align: "start", loop: true }}>
                    <Carousel.Content>
                        {#each short.image_urls as pic, index}
                            <Carousel.Item>
                                <div class="p-1 max-h-full">
                                    <Card.Root>
                                        <Card.Content class="flex items-center justify-center p-6">
                                            <img src={pic} alt="gallery" class="lg:w-[1296px] h-72 lg:h-[732px] object-contain backdrop-blur-md">
                                        </Card.Content>
                                        <Card.Footer>
                                            {#if $page.data.session?.user.displayname == short.username}
                                            <section class="flex flex-row gap-2">
                                                <button 
                                                class="bg-white dark:bg-[#272933] border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 w-fit mx-auto" 
                                                onclick={() => set_main_img(index)}>
                                                set as main
                                                </button>
                                                <button 
                                                class="bg-white dark:bg-[#272933] border border-red-500 warning-box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 w-fit mx-auto" 
                                                onclick={() => remove_image(index)}
                                                >
                                                remove image
                                                </button>
                                            </section>
                                            {/if}
                                        </Card.Footer>
                                    </Card.Root>
                                </div>
                            </Carousel.Item>
                        {/each}
                        <Carousel.Previous />
                        <Carousel.Next />
                    </Carousel.Content>
                </Carousel.Root>
            </div>
        {/if}
    </dialog>
    <!------------------------------------->
</div>