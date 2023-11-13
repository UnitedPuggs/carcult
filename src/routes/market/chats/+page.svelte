<script>
    export let data;
    
    let chats = [...new Set(data.group_messages.map(i => JSON.stringify(i)))].map(i => JSON.parse(i))
    console.log(chats)
</script>

<div class="flex flex-col">
    {#each chats as chat}
        <a href="/market/chats/{chat.chat_id}">{chat.listing_id}</a>
    {/each}
</div>