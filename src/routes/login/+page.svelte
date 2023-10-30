<script>
    import { signIn } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
</script>

{#if !$page.data.session?.user}
<div class="flex flex-col justify-center items-center mt-10">
    <button class="border-2 rounded-md border-white p-2 hover:opacity-75" on:click={() => signIn("google")}>log in with Google</button>
    <button class="border-2 rounded-md border-purple-300 py-2 px-[4px] mt-4 hover:opacity-75" on:click={() => signIn("discord")}>log in with Discord</button>
</div>
{:else}
    <div>
        <h1 class="text-center">You're already logged in! Have fun!</h1>
    </div>
{/if}