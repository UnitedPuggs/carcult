<script>
    import { client } from '$lib/public_supabase'
    import { page } from '$app/stores'
    import { onDestroy, onMount } from 'svelte';
    import ChatMessage from '$lib/market/ChatMessage.svelte';

    let { data } = $props();
    let channel;
    let message = $state();
    let input_ref = $state();

    let listing_data = $derived(data.marketplace_listings[0])

    let chat_data = $derived(data.marketplace_messages[0])

    //Can map this so an object with chat_data, then maybe push some stuff on the subscription thing to differentiate chats
    let chat_messages = $state(data.marketplace_messages.reverse().map(message => {
        return { send_user: message.send_user, message_content: message.message_content }
    }));
    
    onMount(async() => {   
        const supabase = await client(data.session)
        channel = supabase
        .channel($page.params.chatid)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'marketplace_messages', filter: `chat_id=eq.${$page.params.chatid}` },
            (payload) => {
                chat_messages.push(Object({send_user: payload.new.send_user, message_content: payload.new.message_content}))
                chat_messages = chat_messages
                console.log(chat_messages)
            }
        )
        .subscribe()
    })

    onDestroy(async() => {
        const supabase = await client(data.session)
        supabase.channel($page.params.chatid).unsubscribe()
    })

    async function send_message() {
        if(message) {
            await fetch('/api/market/send_message', {
                method: "POST",
                body: JSON.stringify({
                    chat_id: chat_data.chat_id,
                    listing_id: chat_data.listing_id, 
                    send_user: $page.data.session.user.displayname, 
                    receive_user: chat_data.receive_user,
                    message_content: message
                })
            })
            message = null;
            input_ref.focus()
        }
    }

    const scrollToBottom = node => {
		const scroll = () => node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth',
		});
		scroll();

		return { update: scroll }
	};
</script>

<svelte:head>
    <title>marketplace | {listing_data.item_name} from {listing_data.seller}</title>
</svelte:head>

<div class="flex flex-col justify-center items-center border border-white w-full lg:w-fit mx-auto p-4 rounded-lg mt-14">
    <section class="ml-0 mr-auto">
        <a href="/market/chats" class="text-xl hover:opacity-75">&lt;--</a>
    </section>
    <h1 class="font-bold text-2xl">{listing_data.item_name}</h1>
    <h2 class="font-bold text-xl">${listing_data.price}</h2>
    <h3 class="text-gray-400">sold by {listing_data.seller}</h3>
    <div class="flex flex-col h-120 w-full lg:w-160 gap-2 border-2 border-white overflow-y-auto p-2 rounded-sm mt-2" use:scrollToBottom={chat_messages}>
        {#each chat_messages as chat}
            {#if chat.send_user == $page.data.session.user.displayname}
                <ChatMessage message_content={chat.message_content} send_user={chat.send_user} chat_style="bg-gray-800 border-gray-400" div_style="ml-auto mr-0" />
            {:else}
                <ChatMessage message_content={chat.message_content} send_user={chat.send_user} chat_style="bg-red-800 border-red-600" div_style="" />
            {/if}
        {/each}
    </div>
    <form onsubmit={send_message} class="flex flex-col mt-4">
        <input class="p-2 lg:w-160 w-full bg-gray-800" bind:value={message} placeholder="message here" bind:this={input_ref} />
        <input type="submit" value="send" class="hover:opacity-75 hover:cursor-pointer" />
    </form> 
</div>
