<script>
    import SellingItem from '$lib/market/SellingItem.svelte'
    let { data } = $props();
</script>

<a href="/market" class="text-3xl hover:opacity-75 px-2">&lt;-</a>
<div>
    {#await data.streamed.marketplace_listings}
        <p>loading marketplace listings...</p>
    {:then result}
        <div class="flex flex-col justify-center items-center gap-4 my-8">
            {#each result as listing}
                <SellingItem 
                item_name={listing.item_name} 
                price={listing.price} 
                id={listing.id} 
                cover_pic={listing.listing_pics[0]} 
                is_live={listing.is_live}
                created_at={listing.created_at}
                />
            {/each}
        </div>
    {/await}
</div>