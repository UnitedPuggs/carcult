<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";

    let date = new Date();
</script>

<nav class="sticky top-0 bg-black z-[100]">
    <div class="border border-white text-mono text-white p-4 gap-4 flex flex-row lg:flex-row flex-wrap lg:h-24 bg-black lg:justify-center items-center">
        <a href="/" class="text-xl hover:opacity-75 transition ease-in-out hover:scale-110"><img src="/assets/logo.png" alt="click me" class="w-16 h-16 rounded-full"></a>
        <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="hover:opacity-75">meets</a>
        <a href="/market" class="hover:opacity-75">market</a>
        <a href="/forum" class="hover:opacity-75">forum</a>
        <a href="/users" class="hover:opacity-75">users</a>
        <div class="lg:mr-5 lg:ml-auto">
            {#if $page.data.session?.user}
                <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-75">garage</a>
                {#if $page.data.session.user.role > 0}
                <a href="/garage/{$page.data.session.user.displayname}/my-meets" class=" hover:opacity-75">my events</a>
                {/if}
                <button on:click={() => signOut()} class="hover:opacity-75 mb-1">log out</button>
            {:else}
                <a href="/login" class="hover:opacity-75">log in</a>
            {/if}
        </div>
    </div>
</nav>