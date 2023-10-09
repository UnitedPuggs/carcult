<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";

    let date = new Date();
</script>

<nav class="sticky top-0 bg-black z-50">
    <div class="border border-white text-mono text-white p-4 gap-2 flex flex-col md:flex-row flex-wrap md:h-14 bg-black">
        <a href="/" class="text-xl hover:opacity-75 transition ease-in-out hover:scale-90">carcult</a>
        <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="hover:opacity-75">meets</a>
        <a href="/market" class="hover:opacity-75">market</a>
        <a href="/forum" class="hover:opacity-75">forum</a>
        <div class="flex flex-row-reverse justify-end md:mr-5 ml-auto">
            {#if $page.data.session?.user}
                <button on:click={() => signOut()} class="hover:opacity-75 mb-1">log out</button>
                <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-75 mr-4">garage</a>
            {:else}
                <a href="/login" class="hover:opacity-75">log in</a>
            {/if}
        </div>
    </div>
</nav>