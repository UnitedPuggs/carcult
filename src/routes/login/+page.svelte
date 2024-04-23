<script>
    import { signIn } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
</script>

{#if !$page.data.session?.user}
    <div class="flex flex-col gap-4 justify-center items-center mt-10 border-2 border-white w-fit mx-auto p-4">
        <!-- gotta work on functionality for this part since I dunno how supabase handles smtp stuff -->
        <!--
        <input type="text" placeholder="email" class="px-2 py-1">
        <input type="text" placeholder="password" class="px-2 py-1">
        <button class="text-lg">login</button>
        <hr class="border w-full">
        -->
        <button
        class="h-12 w-52 bg-white text-black font-bold rounded-md text-lg hover:opacity-75 active:scale-95" 
        on:click={() => signIn("google")}
        >
        log in with Google
        </button>
        <button 
        class="h-12 w-52 bg-purple-300 font-bold rounded-md text-lg hover:opacity-75 active:scale-95" 
        on:click={() => signIn("discord")}
        >
        log in with Discord
        </button>
    </div>
{:else}
    <div>
        <h1 class="text-center">You're already logged in! Have fun!</h1>
    </div>
{/if}