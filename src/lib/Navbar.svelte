<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";

    let prev_scroll = 0;
    let show = "top-0";

    onMount(() => {
        window.onscroll = () => {
            if(window.scrollY > prev_scroll) {
                show = "-top-96";
            } else {
                show = "top-0";
            }
            prev_scroll = window.scrollY
        }
    })

    let date = new Date();
</script>

<nav class="sticky {show} bg-black z-[100] max-w-full transition-all ease-in-out duration-300">
    <div 
    class="border border-white text-mono text-white text-lg lg:py-0 py-4 px-4 gap-4 flex grow flex-col lg:flex-row flex-wrap lg:h-24 bg-black lg:justify-normal justify-center items-center text-center"
    >
        <div>
            <a href="/" class="text-xl hover:opacity-75"><img src="/assets/logo-tester.png" alt="click me" class="w-16 h-12 rounded-sm active:scale-95"></a>
        </div>
        <div class="flex gap-2">
            <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">meets</a>
            <!-- <a href="/market" class="hover:opacity-75">market</a> -->
            <!-- <a href="/forum" class="hover:opacity-75">forum</a> -->
            <a href="/users" class="hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">users</a>
        </div>
        <div class="flex items-center gap-4 lg:mr-1 lg:ml-auto h-full lg:border-l-2 lg:pl-4">
            {#if $page.data.session?.user}
                <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-75 w-8 active:scale-95"><img src="/assets/garage.png" alt="garage"></a>
                {#if $page.url.pathname.indexOf("garage") != -1 && !$page.url.pathname.includes(`/garage/${$page.data.session.user.displayname}/my-meets`)}
                    <a href="/garage/{$page.data.session.user.displayname}/add-car" class="hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">add vehicle</a>
                {/if}
            {#if $page.data.session.user.role > 0 && $page.url.pathname.indexOf("meets") != -1}
                <a href="/garage/{$page.data.session.user.displayname}/my-meets" class=" hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">my meets</a>
            {/if}
                <button on:click={() => signOut()} class="hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">log out</button>
            {:else}
                <a href="/login" class="hover:opacity-75 border border-white p-1 rounded-sm active:scale-95">log in</a>
            {/if}
        </div>
    </div>
</nav>