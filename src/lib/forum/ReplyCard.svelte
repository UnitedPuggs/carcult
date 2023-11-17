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
    <section class="p-1 border bg-white">
        <span class="text-black">{created_at.substring(0, 10)} {created_at.substring(11, 16)}</span>
    </section>
    <div class="flex lg:flex-row flex-col">
        <section class="flex h-10 lg:h-auto lg:w-48 border lg:justify-center lg:items-center bg-amber-100">
            <span class="text-black font-bold">{poster}</span>
        </section>
        <section class="border w-full p-2 bg-gray-800">
            <span class="whitespace-pre-wrap">{@html reply}</span>
        </section>
    </div>
</div>