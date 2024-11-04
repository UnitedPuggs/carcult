<script>
    let {
        message_content,
        send_user,
        chat_style,
        div_style
    } = $props();
</script>

<div class="flex flex-col {div_style}">
    <span class="border-2 rounded-md p-2 w-48 lg:w-80 {chat_style}">{message_content}</span>
    <span class="text-xs text-gray-300 {div_style}">{send_user}</span>
</div>