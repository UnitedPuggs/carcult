<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";
    import * as Sheet from "$lib/components/ui/sheet/index.js"

    let prev_scroll = 0;
    let show = $state("top-0");
    let open = $state(false);

    let date = new Date();

    onMount(() => {
        window.onscroll = () => {
            if(window.scrollY > prev_scroll) {
                show = "-top-96";
            } else {
                show = "top-0";
            }
            prev_scroll = window.scrollY
        }
    });

    function close() {
        open = false;
    }
</script>

<nav class="sticky {show} z-[100] max-w-full border-b-2 border-b-black shadow bg-white dark:bg-[#272933]">
    <!--- MOBILE NAVBAR -->
    <Sheet.Root bind:open>
        <div class="flex flex-row justify-between lg:hidden p-1">
            <div>
                <a href="/" class="text-xl hover:opacity-80"><img src="/assets/logo-tester.png" alt="click me" class="w-16 h-12 rounded-sm active:scale-95"></a>
            </div>
            <Sheet.Trigger>
                <button aria-label="open menu" class="ml-auto mr-4 border-2 border-black w-fit h-fit m-auto box-shadow">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </button>
            </Sheet.Trigger>
        </div>
        <Sheet.Content side="right">
            <div class="flex flex-col text-3xl mr-4 mt-4 gap-2 dark:bg-[#272933] dark:text-white h-full">
                <div class="flex justify-between items-end">
                    <a href="/" class="underline" onclick={() => close()}>home</a>
                    {#if $page.data.session?.user} <!-- gayrage -->
                        <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-80 w-12 active:scale-90 border-2 border-black box-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:no-box" onclick={() => close()} aria-label="garage icon">
                            <svg fill="currentColor" version="1.1" class="p-1.5" viewBox="0 0 512 512">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <g> <g> 
                                    <path d="M500.379,137.725L267.652,3.128c-7.208-4.17-16.094-4.17-23.304,0L11.621,137.725C4.43,141.883,0,149.561,0,157.87 v330.858C0,501.58,10.42,512,23.273,512h93.091h279.273h93.091C501.58,512,512,501.58,512,488.727V157.87 C512,149.561,507.572,141.883,500.379,137.725z M372.364,465.455H139.636v-46.545h232.727V465.455z M372.364,372.364H139.636 v-46.545h232.727V372.364z M372.364,279.273H139.636v-46.545h232.727V279.273z M465.455,465.455h-46.545v-256 c0-12.853-10.42-23.273-23.273-23.273H116.364c-12.853,0-23.273,10.42-23.273,23.273v256H46.545V171.294L256,50.157 l209.455,121.136V465.455z"></path> 
                                </g> </g> 
                            </g>
                            </svg>
                        </a>
                    {/if}
                </div>
                <div class="flex">
                    {#if $page.data.session?.user}
                        {#if $page.url.pathname.indexOf("garage") != -1 && !$page.url.pathname.includes(`/garage/${$page.data.session.user.displayname}/my-meets`)}
                            <a href="/garage/{$page.data.session.user.displayname}/add-car" class="w-full btn text-center" onclick={() => close()}>new wheels</a>
                        {/if}
                        {#if $page.data.session.user.role > 0 && $page.url.pathname.indexOf("meets") != -1}
                            <a href="/garage/{$page.data.session.user.displayname}/my-meets" class="w-full btn text-center" onclick={() => close()}>ur meets</a>
                        {/if}
                    {/if}
                </div>
                <div class="flex flex-row w-full gap-1 text-center">
                    <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}"
                    onclick={() => close()}
                    class="hover:opacity-80 border-2 border-black p-1 rounded-md box active:scale-90 transition-all hover:no-box hover:translate-y-1 w-full"
                    >
                    meets
                    </a>
                    <a href="/users" 
                    onclick={() => close()}
                    class="hover:opacity-80 border-2 border-black p-1 rounded-md box active:scale-90 transition-all hover:no-box hover:translate-y-1 w-full"
                    >
                    users
                    </a>
                </div>
                <div class="flex {$page.data.session?.user ? "mt-auto mb-2" : ""} text-center">
                    {#if $page.data.session?.user}
                        <button onclick={() => signOut()} class="w-full btn">log out</button>
                    {:else}
                        <a href="/login" class="w-full btn" onclick={() => close()}>login</a>
                    {/if}
                </div>
            </div>
        </Sheet.Content>
    </Sheet.Root>
    <!------------------->

    <!-- DESKTOP NAVBAR -->
    <div 
    class="lg:py-0 py-4 px-4 gap-4 hidden lg:flex grow flex-col lg:flex-row flex-wrap lg:h-24  lg:justify-normal justify-center items-center text-center "
    >
        <div>
            <a href="/" class="text-xl hover:opacity-80"><img src="/assets/logo-tester.png" alt="click me" class="w-16 h-12 rounded-sm active:scale-95"></a>
        </div>
        <div class="flex gap-2">
            <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="btn text-lg">meets</a>
            <!-- <a href="/market" class="hover:opacity-75">market</a> -->
            <!-- <a href="/forum" class="hover:opacity-75">forum</a> -->
            <a href="/users" class="btn text-lg">users</a>
        </div>
        <div class="flex items-center gap-4 lg:mr-1 lg:ml-auto h-full lg:pl-4">
            {#if $page.data.session?.user}
                <a href="/garage/{$page.data.session.user.displayname}" 
                aria-label="garage icon"
                class="hover:opacity-80 w-12 active:scale-90 border-2 border-black box-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:no-box"
                >
                <svg fill="currentColor" version="1.1" class="p-1.5" viewBox="0 0 512 512">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <g> <g> 
                            <path d="M500.379,137.725L267.652,3.128c-7.208-4.17-16.094-4.17-23.304,0L11.621,137.725C4.43,141.883,0,149.561,0,157.87 v330.858C0,501.58,10.42,512,23.273,512h93.091h279.273h93.091C501.58,512,512,501.58,512,488.727V157.87 C512,149.561,507.572,141.883,500.379,137.725z M372.364,465.455H139.636v-46.545h232.727V465.455z M372.364,372.364H139.636 v-46.545h232.727V372.364z M372.364,279.273H139.636v-46.545h232.727V279.273z M465.455,465.455h-46.545v-256 c0-12.853-10.42-23.273-23.273-23.273H116.364c-12.853,0-23.273,10.42-23.273,23.273v256H46.545V171.294L256,50.157 l209.455,121.136V465.455z"></path> 
                        </g> </g> 
                    </g>
                </svg>
                </a>
                {#if $page.url.pathname.indexOf("garage") != -1 && !$page.url.pathname.includes(`/garage/${$page.data.session.user.displayname}/my-meets`)}
                    <a href="/garage/{$page.data.session.user.displayname}/add-car" class="btn text-lg">new wheels</a>
                {/if}
            {#if $page.data.session.user.role > 0 && $page.url.pathname.indexOf("meets") != -1}
                <a href="/garage/{$page.data.session.user.displayname}/my-meets" class="btn text-lg">ur meets</a>
            {/if}
                <button onclick={() => signOut()} class="btn text-lg">log out</button>
            {:else}
                <a href="/login" class="btn text-lg">login</a>
            {/if}
        </div>
    </div>
    <!---------->
</nav>