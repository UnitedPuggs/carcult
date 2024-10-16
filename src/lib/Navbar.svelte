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

<nav class="sticky {show} z-[100] max-w-full transition-all ease-in-out duration-300 border border-b-black shadow bg-white">
    <div 
    class="text-lg lg:py-0 py-4 px-4 gap-4 flex grow flex-col lg:flex-row flex-wrap lg:h-24  lg:justify-normal justify-center items-center text-center"
    >
        <div>
            <a href="/" class="text-xl hover:opacity-80"><img src="/assets/logo-tester.png" alt="click me" class="w-16 h-12 rounded-sm active:scale-95"></a>
        </div>
        <div class="flex gap-2">
            <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="hover:opacity-80 border border-black p-1 rounded-lg box active:scale-90 transition-all hover:no-box hover:translate-y-1">meets</a>
            <!-- <a href="/market" class="hover:opacity-75">market</a> -->
            <!-- <a href="/forum" class="hover:opacity-75">forum</a> -->
            <a href="/users" class="hover:opacity-80 border border-black p-1 rounded-lg box active:scale-90 transition-all hover:no-box hover:translate-y-1">users</a>
        </div>
        <div class="flex items-center gap-4 lg:mr-1 lg:ml-auto h-full lg:pl-4">
            {#if $page.data.session?.user}
                <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-80 w-8 active:scale-90 shadow"><img src="/assets/garage.png" alt="garage"></a>
                {#if $page.url.pathname.indexOf("garage") != -1 && !$page.url.pathname.includes(`/garage/${$page.data.session.user.displayname}/my-meets`)}
                    <a href="/garage/{$page.data.session.user.displayname}/add-car" class="hover:opacity-75 border border-black box p-1 rounded-lg transition-all hover:no-box hover:translate-y-1">new wheels</a>
                {/if}
            {#if $page.data.session.user.role > 0 && $page.url.pathname.indexOf("meets") != -1}
                <a href="/garage/{$page.data.session.user.displayname}/my-meets" class=" hover:opacity-75 border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1">ur meets</a>
            {/if}
                <button on:click={() => signOut()} class="hover:opacity-75 border border-black box p-1 rounded-lg active:scale-90 transition-all hover:no-box hover:translate-y-1">log out</button>
            {:else}
                <a href="/login" class="hover:opacity-80 border border-black box rounded-lg p-1 active:scale-90 transition-all hover:no-box hover:translate-y-1">login</a>
            {/if}
        </div>
    </div>
</nav>