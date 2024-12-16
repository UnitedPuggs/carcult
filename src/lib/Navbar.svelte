<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";
    import { getDrawerStore, Drawer } from "@skeletonlabs/skeleton";

    let prev_scroll = 0;
    let show = $state("top-0");

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

    const drawerStore = getDrawerStore();

    let date = new Date();

    function openDrawer() {
        const drawerSettings = {
	// Provide your property overrides:
            bgDrawer: 'bg-white text-black',
            bgBackdrop: 'z-[400] backdrop-blur h-screen w-screen',
            width: 'w-screen',
            height: 'h-screen',
            position: "right"
        };
        drawerStore.open(drawerSettings);
    }
    function closeDrawer() {
        drawerStore.close();
    }
</script>

<Drawer>
    <div class="flex flex-1 flex-col text-3xl items-end mr-4 mt-4 gap-2">
        <button onclick={() => closeDrawer()} class="text-2xl" aria-label="close menu">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
        </button>
        {#if $page.data.session?.user}
            <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-80 w-8 active:scale-90" onclick={() => closeDrawer()}><img src="/assets/garage.png" alt="garage"></a>
            {#if $page.url.pathname.indexOf("garage") != -1 && !$page.url.pathname.includes(`/garage/${$page.data.session.user.displayname}/my-meets`)}
                <a href="/garage/{$page.data.session.user.displayname}/add-car" class="hover:opacity-80 border-2 border-black box p-1 rounded-md transition-all hover:no-box hover:translate-y-1" onclick={() => closeDrawer()}>new wheels</a>
            {/if}
            {#if $page.data.session.user.role > 0 && $page.url.pathname.indexOf("meets") != -1}
                <a href="/garage/{$page.data.session.user.displayname}/my-meets" class=" hover:opacity-80 border-2 border-black box p-1 rounded-md active:scale-90 transition-all hover:no-box hover:translate-y-1" onclick={() => closeDrawer}>ur meets</a>
            {/if}
        {/if}
        <a href="/users" 
        onclick={() => closeDrawer()}
        class="hover:opacity-80 border-2 border-black p-1 rounded-md box active:scale-90 transition-all hover:no-box hover:translate-y-1"
        >
        users
        </a>
        <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}"
        onclick={() => closeDrawer()}
        class="hover:opacity-80 border-2 border-black p-1 rounded-md box active:scale-90 transition-all hover:no-box hover:translate-y-1"
        >
        meets
        </a>
        {#if $page.data.session?.user}
            <button onclick={() => signOut()} class="hover:opacity-80 border-2 border-black box p-1 rounded-md active:scale-90 transition-all hover:no-box hover:translate-y-1 mt-auto">log out</button>
        {:else}
            <a href="/login" class="hover:opacity-80 border-2 border-black box rounded-md p-1 active:scale-90 transition-all hover:no-box hover:translate-y-1 mt-2" onclick={() => closeDrawer()}>login</a>
        {/if}
    </div>
</Drawer>
<nav class="sticky {show} z-[100] max-w-full transition-all ease-in-out duration-300 border-b-2 border-b-black shadow bg-white">
    <!--- MOBILE NAVBAR -->
    <div class="flex flex-row lg:hidden">
        <div>
            <a href="/" class="text-xl hover:opacity-80"><img src="/assets/logo-tester.png" alt="click me" class="w-16 h-12 rounded-sm active:scale-95"></a>
        </div>
        <button onclick={() => openDrawer()} aria-label="open menu" class="ml-auto mr-4 border-2 border-black w-fit h-fit m-auto box-shadow">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
        </button>
        
    </div>
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
                class="hover:opacity-80 w-12 active:scale-90 border-2 border-black box-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:no-box">
                    <img src="/assets/garage.png" alt="garage" class="p-2">
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