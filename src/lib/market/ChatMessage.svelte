<script>
    export let message_content;
    export let send_user;
    export let chat_style;
    export let div_style;
</script>

<div class="flex flex-col {div_style}">
    <span class="border-2 rounded-md p-2 w-48 lg:w-80 {chat_style}">{message_content}</span>
    <span class="text-xs text-gray-300 {div_style}">{send_user}</span>
</div>