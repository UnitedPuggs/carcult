<script>
    import { signIn } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>carcult login</title>
</svelte:head>

{#if !$page.data.session?.user}
    <div class="flex flex-col gap-4 justify-center items-center mt-10 border-2 border-white w-fit mx-auto p-4">
        <!--<input type="text" placeholder="email" class="px-2 py-1 text-black" bind:value={email}>
        <input type="password" placeholder="password" class="px-2 py-1 text-black" bind:value={password}>
        <button 
        class="text-lg border border-white rounded-sm p-1 active:scale-95 hover:opacity-75"
        on:click={() => signIn('credentials', { email, password })}
        >
        login
        </button>
        <hr class="border w-full">
        fuck auth.js and their credential avoiding asses
        -->
        <div class="mr-auto ml-0">
            <h1 class="text-xl">Log in</h1>
        </div>
        <hr class="border w-full">
        <button
        class="h-12 w-52 border border-white font-bold rounded-md text-lg hover:opacity-75 active:scale-95" 
        on:click={() => signIn("google")}
        >
        log in with <span class="text-blue-500">G</span><span class="text-red-500">o</span><span class="text-yellow-500">o</span><span class="text-blue-500">g</span><span class="text-green-500">l</span><span class="text-red-500">e</span>
        </button>
        <button 
        class="h-12 w-52 border border-white font-bold rounded-md text-lg hover:opacity-75 active:scale-95" 
        on:click={() => signIn("discord")}
        >
        log in with <span class="text-purple-200">Discord</span>
        </button>
    </div>
{:else}
    <div>
        <h1 class="text-center">You're already logged in! Have fun!</h1>
    </div>
{/if}