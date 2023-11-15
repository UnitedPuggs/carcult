<script>
  import { onMount } from "svelte";

    export let created_at;
    export let poster;
    export let reply;

    function linkify(text) {
    return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
        return `<a href="${url}" class='underline' target='_blank'>${url}</a>`;
    });
    }

    onMount(() => {
        reply = linkify(reply)
        reply = reply
    })
</script>

<div class="flex flex-col h-fit">
    <section class="p-1 border">
        <span>{created_at.substring(0, 10)} {created_at.substring(11, 16)}</span>
    </section>
    <div class="flex">
        <section class="flex w-48 border justify-center items-center">
            <span>{poster}</span>
        </section>
        <section class="border w-full p-2">
            <span class="whitespace-pre-wrap">{@html reply}</span>
        </section>
    </div>
</div>