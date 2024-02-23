<script>
    import { page } from '$app/stores'
    /* seller - item_name - price - listing_pics */
    export let data;
    
    let width;

    let title = data.marketplace_listings[0].item_name;
    let price = data.marketplace_listings[0].price;
    let description = data.marketplace_listings[0].item_description;
    let zip = data.marketplace_listings[0].zip;
    let title_status = data.marketplace_listings[0].title_status;
    let transmission = data.marketplace_listings[0].transmission;
    let mileage = data.marketplace_listings[0].mileage;

    let files = [];
    let preview_files = Array.from(data.marketplace_listings[0].listing_pics);
    let filtering_files = data.marketplace_listings[0].listing_pics;
    //don't wanna reupload images that already exist on the listing, but we do wanna display them

    const upload_images = (e) => {
        let images = e.target.files;
        files = images;
        Object.keys(images).forEach(i => {
            const file = images[i];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = e => {
                preview_files.unshift(e.target.result)
                preview_files = preview_files
            }
        })
        preview_files = preview_files
    }

    async function update_listing() {
        const form_data = new FormData();

        form_data.append('id', $page.params.id);
        form_data.append('title', title);
        form_data.append('price', price);
        form_data.append('description', description);
        form_data.append('mileage', mileage ? mileage : 0);
        form_data.append('title_status', title_status ? title_status : '');
        form_data.append('transmission', transmission ? transmission : '');
        form_data.append('zip', zip);

        //this is kinda jank since the preview images are gonna differ from the actual uploaded images, but whatever this needs to be fixed
        //just don't have the time :)
        for(let i = 0; i < files.length; ++i) {
            form_data.append('images', files[i]);
        }

        for(let i = 0; i < filtering_files.length; ++i) {
            form_data.append('img_arr', filtering_files[i]);
        }

        await fetch('/api/market/update_listing', {
            method: "PATCH",
            body: form_data
        }).then((res) => {
            if(res.ok) {
                alert("listing updated!")
            }
        });
    }
</script>

<svelte:head>
    <title>carcult marketplace | udpating your listing</title>
</svelte:head>

<div class="flex" bind:clientWidth={width}>
    <div class="border-2 border-white w-full lg:w-72 min-h-[calc(100vh_-_6rem)] p-2" id="seller-controls">
        <a href="/market/selling" class="text-xl font-bold">&lt;-</a>
        <h1 class="font-bold text-xl mt-2">item for sale</h1>
        <form class="flex flex-col gap-2" on:submit={update_listing}>
            <input bind:value={title} class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="item name" required>
            <input bind:value={price} type="number" class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="price" required min=0>
            <input bind:value={mileage} type="number" class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="mileage" min=1 max=999999>
            <select class="bg-gray-800 border border-white p-2 rounded-sm" bind:value={title_status}>
                <option value="" disabled selected hidden>title status</option>
                <option value="clean">clean</option>
                <option value="salvage">salvage</option>
                <option value="rebuilt">rebuilt</option>
            </select>
            <select class="bg-gray-800 border border-white p-2 rounded-sm" bind:value={transmission}>
                <option value="" disabled selected hidden>transmission type</option>
                <option value="manual">manual</option>
                <option value="automatic">automatic</option>
            </select>
            <input type="number" class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="zip code" bind:value={zip}/>
            <textarea bind:value={description} class="bg-gray-800 border border-white p-2 rounded-sm h-64" placeholder="description" required></textarea>
            <input 
                type="file" 
                multiple 
                accept="image/*" 
                on:change={upload_images} 
                class="file:bg-gray-800 file:text-white file:border-0  file:rounded-full file:p-2 file:hover:opacity-75 file:hover:cursor-pointer file:font-bold"
            >
            <input type="submit" value="update listing" class="bg-gray-700 border border-white p-2 rounded-sm hover:opacity-80 hover:cursor-pointer">
        </form>
    </div>
    {#if width > 640}
        <div class="flex justify-center items-center mx-auto" id="seller-preview">
            <div class="border-2 border-white w-[46rem] lg:h-[45rem] p-4">
                <h1 class="font-bold text-lg pb-2">preview</h1>
                <div class="flex border-2 border-white rounded-md">
                    <section class="border-r border-gray-400 w-[24rem] h-[40rem] rounded-l-md bg-gray-800 text-center flex flex-col items-center justify-center">
                        {#if preview_files.length > 0}
                            <div class="flex justify-center items-center h-full">
                                <img src={preview_files[0]} alt="" />
                            </div>
                            <div class="flex gap-4 max-w-[24rem] p-4 flex-wrap items-center justify-center mt-auto mb-0">
                                {#each preview_files as preview}
                                        <img src={preview} alt="meow" class="object-cover w-10 h-10 lg:w-16 lg:h-16 rounded-md"/>
                                {/each}
                            </div>
                        
                        {/if}
                    </section>
                    <section class="flex flex-col p-2 break-words rounded-md">
                        <h2 class="text-lg font-bold w-[254px] max-h-20 overflow-y-auto">{title ? title : 'item name'}</h2>
                        <h3 class="text-sm font-bold">{price ? `$${price}` : 'price'}</h3>
                        <h2 class="font-bold pt-8 text-lg">description</h2>
                        <span class="w-[254px] max-h-80 overflow-y-auto">{description ? description : 'description appears here'}</span>
                        <div class="mt-auto mb-2 flex flex-col gap-4">
                            <h2 class="font-bold text-lg">seller info</h2>
                            <section class="flex justify-start items-center gap-4">
                                <img src={data.garage[0].pfp_url} alt="" class="rounded-full w-16"/>
                                <span class="text-xl font-bold">{$page.data.session.user.displayname}</span>
                            </section>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <iframe src="https://maps.google.com/maps?q={zip}&output=embed&z=11" width="100%" height="150" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    {/if}
</div>