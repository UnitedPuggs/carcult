<script>
    import { page } from '$app/stores'
    let car; //Do I need this variable? Kinda forgot
    let file;

    const uploaded_file = (e) => {
        let img = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = e => {
            file = e.target.result;
        }
    }
</script>

<svelte:head>
    <title>adding to your garage!</title>
</svelte:head>

{#if $page.data.session?.user.displayname == $page.params.slug}
<div>
    <div class="flex flex-col justify-center items-center mt-4">
        <form class="flex flex-col" method="POST" enctype="multipart/form-data">
            <input type="text" class="text-black py-1 px-0.5 rounded-sm" placeholder="car here" id="car" name="car" required>
            <label class="my-2">
                <input type="file" id="file" name="file" bind:value={file} class="hidden" on:change={(e) => uploaded_file(e)} /> <!-- Might need some styling on this bad boy -->            
                {#if file}
                    <img src={file} alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-cover cursor-pointer"/>
                {:else}
                    <img src="/assets/image_upload.png" alt="upload your car" class="border-4 border-white w-[512px] h-[296px] object-none cursor-pointer"/>
                {/if}
            </label>
            <textarea class="text-black rounded-sm px-0.5 py-1" id="desc" name="desc" placeholder="description here"></textarea>
            <input type="submit" value="add" class="hover:opacity-75 cursor-pointer">
        </form>
    </div>
</div>
{:else}
    {#if $page.data.session}
    <p class="text-2xl font-bold text-center">
        that's not you! you'll have to go 
    <a href='/garage/{$page.data.session?.user.displayname}/add-car' class="underline hover:no-underline">here</a> 
        to add to your own garage!
    </p>
    {:else}
    <p class="text-2xl font-bold text-center">you'll need to log in to add to your garage!</p>
    {/if}
{/if}