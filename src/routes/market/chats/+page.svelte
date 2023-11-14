<script>
    import { page } from '$app/stores'
    export let data;
    
    //let chats = [...new Set(data.grouped_messages.map(i => JSON.stringify(i)))].map(i => JSON.parse(i))
</script>

<svelte:head>
    <title>marketplace | {$page.data.session.user.displayname}'s chats</title>
</svelte:head>

<div class="flex flex-col mt-10 text justify-center text-center">
    <h1 class="text-2xl font-bold py-1">your chats</h1>
    {#each data.combined as chat}
        <a href="/market/chats/{chat.chat_id[0].chat_id}" class="hover:opacity-75 w-fit mx-auto active:scale-90">
            <div class="flex flex-col gap-2 justify-center items-center my-1 border-white border w-96 rounded-md bg-gray-800">
                <div class="p-2">
                    <img src={chat.listing_pics[0]} alt="" class="w-24 h-24 object-cover rounded-full border-white border-2"/>
                </div>
                <span class="my-1 text-lg font-bold">{chat.buyer[0].buyer} ● {chat.item_name}</span>
            </div>
        </a>
    {/each}
</div>