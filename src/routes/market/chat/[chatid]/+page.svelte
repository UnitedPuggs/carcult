<script>
    import { supabase } from '$lib/public_supabase'
    import { page } from '$app/stores'
    import { onDestroy, onMount } from 'svelte';

    export let data;
    let channel;
    let message;
    let input_ref;

    $: chat_data = data.marketplace_messages[0]

    //Can map this so an object with chat_data, then maybe push some stuff on the subscription thing to differentiate chats
    let chat_messages = data.marketplace_messages.map(message => message.message_content);
    
    onMount(() => {   
        channel = supabase
        .channel($page.params.chatid)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'marketplace_messages', filter: `chat_id=eq.${$page.params.chatid}` },
            (payload) => {
                chat_messages.push(payload.new.message_content)
                chat_messages = chat_messages
                console.log(payload.new.message_content)
            }
        )
        .subscribe()
    })

    onDestroy(() => {
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

<div class="flex flex-col justify-center items-center">
    <div class="flex flex-col h-96 w-96 gap-2 border-2 border-white overflow-y-auto p-2" use:scrollToBottom={chat_messages}>
        {#each chat_messages as chat}
            <span class="border border-red-500 rounded-md p-2">{chat}</span>
        {/each}
    </div>
    <form on:submit={send_message} class="flex flex-col mt-4">
        <input class="text-black" bind:value={message} placeholder="message here" bind:this={input_ref} />
        <input type="submit" value="submit" class="hover:opacity-75 hover:cursor-pointer" />
    </form> 
</div>
