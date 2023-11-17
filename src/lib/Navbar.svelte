<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";

    let prev_scroll = window.scrollY;
    let show = "top-0";

    onMount(() => {
        window.onscroll = () => {
            if(window.scrollY > prev_scroll) {
                console.log(window.scrollY)
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
    <div class="border border-white text-mono text-white p-4 gap-4 flex grow flex-row flex-wrap lg:h-24 bg-black justify-center items-center text-center">
        <div>
            <a href="/" class="text-xl hover:opacity-75 transition ease-in-out hover:scale-110"><img src="/assets/logo-new.png" alt="click me" class="w-16 h-16 rounded-full"></a>
        </div>
        <div class="flex flex-wrap gap-4 justify-center">
        <a href="/meets/{date.getMonth() + 1}/{date.getFullYear()}" class="hover:opacity-75">meets</a>
        <a href="/market" class="hover:opacity-75">market</a>
        <a href="/forum" class="hover:opacity-75">forum</a>
        <a href="/users" class="hover:opacity-75">users</a>
            <div class="flex gap-4 lg:mr-5 lg:ml-auto">
                {#if $page.data.session?.user}
                    <a href="/garage/{$page.data.session.user.displayname}" class="hover:opacity-75">garage</a>
                    <a href="/garage/{$page.data.session.user.displayname}/add-car" class="hover:opacity-75">add a car</a>
                    {#if $page.data.session.user.role > 0}
                    <a href="/garage/{$page.data.session.user.displayname}/my-meets" class=" hover:opacity-75">my meets</a>
                    {/if}
                    <button on:click={() => signOut()} class="hover:opacity-75 mb-1">log out</button>
                {:else}
                    <a href="/login" class="hover:opacity-75">log in</a>
                {/if}
            </div>
        </div>
    </div>
</nav>