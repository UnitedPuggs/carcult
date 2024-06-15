<script>
    import { page } from '$app/stores'
    let file;
    let model;
    let description;

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
<div class="flex flex-col lg:flex-row gap-4 justify-center items-center border lg:w-fit mx-auto mt-4 p-4 w-full">
    <div class="border-2 p-2 sticky top-0 w-full">
        <form class="flex flex-col gap-1" method="POST" enctype="multipart/form-data">
            <input type="text" class="text-black py-1 px-0.5 rounded-sm" placeholder="model here" id="car" name="car" required bind:value={model}>
            <input type="file" accept="image/*" id="file" name="file" class="file:bg-black file:border-2 file:border-white file:text-white file:cursor-pointer" bind:value={file} on:change={(e) => uploaded_file(e)} />
            <textarea class="text-black rounded-sm px-0.5 py-1" id="desc" name="desc" placeholder="description here" bind:value={description}></textarea>
            <input type="submit" value="add" class="hover:opacity-75 cursor-pointer text-white border border-white rounded-sm">
        </form>
    </div>
    <div class="flex flex-col text-center">   
        <span class="text-2xl font-bold break-all max-w-lg">{model ? model : "your vehicle"}</span>
        <img src={file ? file : "/assets/image_upload.png"} alt="upload your car" class="border-4 border-white w-full lg:w-[512px] h-[296px] object-cover select-none"/>
        <span class="text-lg font-bold">description</span>
        <p class="max-w-lg break-all">{description ? description : "your description"}</p>
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