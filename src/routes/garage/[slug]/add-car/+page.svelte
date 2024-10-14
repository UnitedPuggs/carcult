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
<div class="flex flex-col lg:flex-row gap-4 justify-center items-center border border-black rounded-lg offset-box lg:w-fit mx-auto mt-4 p-4 w-full">
    <div class="border border-black rounded-xl shadow p-2 sticky top-0 w-full">
        <form class="flex flex-col gap-1" method="POST" enctype="multipart/form-data">
            <input type="text" class="text-black border border-black rounded-md p-1 w-74" placeholder="model here" id="car" name="car" required bind:value={model}>
            <input type="file" accept="image/*" id="file" name="file" class="file:cursor-pointer" bind:value={file} on:change={(e) => uploaded_file(e)} />
            <textarea class="text-black border border-black rounded-md p-1 w-74" id="desc" name="desc" placeholder="description here" bind:value={description}></textarea>
            <input type="submit" value="add wheels" class="bg-white text-lg w-28 p-1 mx-auto hover:opacity-80 border border-black rounded-xl box transition-all hover:no-box hover:translate-y-1 cursor-pointer active:scale-90">
        </form>
    </div>
    <div class="flex flex-col text-center gap-1">   
        <span class="text-xl font-bold break-all max-w-lg">{model ? model : "your vehicle"}</span>
        <div class="border-2 border-black rounded-md w-full lg:w-[296px] h-[296px] overflow-clip {file ? "p-0 transition-all less-offset-box -translate-x-1 -translate-y-1" : "p-2"}">
            <img src={file ? file : "/assets/question_marked.png"} alt="upload your car" class="w-full h-full object-cover select-none"/>
        </div>
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