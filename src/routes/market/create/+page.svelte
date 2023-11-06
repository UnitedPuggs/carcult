<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
/* seller - item_name - price - lsting_pics */
    export let data;

    let title;
    let price;
    let description;

    let files;

    async function create_listing() {
        const form_data = new FormData()

        form_data.append('title', title)
        form_data.append('price', price)
        form_data.append('description', description)

        //mfw append can't add an entire list with append
        for(let i = 0; i < files.length; ++i) {
            form_data.append('images', files[i])
        }

        await fetch("/api/market/create_listing", {
            method: "POST",
            body: form_data
        })

        goto("/market")
    }

    const upload_images = (e) => {
        let images = e.target.files;
        files = images;
    }
</script>

<svelte:head>
    <title>creating your listing | carcult</title>
</svelte:head>

<div class="flex">
    <div class="border-2 border-white w-72 min-h-[calc(100vh_-_6rem)] p-2" id="seller-controls">
        <a href="/market" class="text-xl font-bold">&lt;-</a>
        <h1 class="font-bold text-xl mt-2">item for sale</h1>
        <form class="flex flex-col gap-2" on:submit={create_listing}>
            <input bind:value={title} class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="title" required>
            <input bind:value={price} type="number" class="bg-gray-800 border border-white p-2 rounded-sm" placeholder="price" required>
            <textarea bind:value={description} class="bg-gray-800 border border-white p-2 rounded-sm h-64" placeholder="description" required></textarea>
            <input type="file" multiple accept="image/*" on:change={upload_images} required>
            <input type="submit" value="create listing" class="bg-gray-700 border border-white p-2 rounded-sm hover:opacity-80 hover:cursor-pointer">
        </form>
    </div>
    <div class="flex justify-center items-center mx-auto" id="seller-preview">
        <div class="border-2 border-white w-[46rem] lg:h-[45rem] p-4">
            <h1 class="font-bold text-lg pb-2">preview</h1>
            <div class="flex border-2 border-white rounded-md">
                <section class="border-r border-gray-400 w-[24rem] h-[40rem] rounded-l-md bg-gray-800 text-center">
                    This is a preview
                </section>
                <section class="flex flex-col p-2 break-words rounded-md">
                    <h2 class="text-lg font-bold">{title ? title : 'title'}</h2>
                    <h3 class="text-sm font-bold">{price ? `$${price}` : 'price'}</h3>
                    <h2 class="font-bold pt-8 text-lg">description</h2>
                    <span class="w-[254px] max-h-80 overflow-y-auto">{description ? description : 'description appears here'}</span>
                    <div class="mt-auto mb-8 flex flex-col gap-4">
                        <h2 class="font-bold text-lg">seller info</h2>
                        <section class="flex justify-start items-center gap-4">
                            <img src={data.garage[0].pfp_url} alt="" class="rounded-full border-2 border-white w-16"/>
                            <span class="text-xl font-bold">{$page.data.session.user.displayname}</span>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>