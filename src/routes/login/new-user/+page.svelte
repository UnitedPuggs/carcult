<script>
    import { goto } from '$app/navigation';
    import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });

    let username = $state();

    let badword = $derived(matcher.hasMatch(username))

    const date = new Date().toISOString();
    let { data = $bindable() } = $props();
    const email = data.session.user.email;

    async function assign_username() {
        const req = await fetch("/api/login/update_username", {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, username: username.replace(' ', '')})
        })
        data.session.user.displayname = username.replace(' ', '');
        data.session.user.role = 0;
        goto('/')
    }
</script>

<svelte:head>
    <title>carcult | creating your account!</title>
</svelte:head>

<div class="flex flex-col gap-2 justify-center items-center lg:mt-4 border rounded-xl offset-box border-black w-fit mx-auto py-4 px-20">
    <img src="/assets/Hulk_Hogan.jpg" alt="hogan" class="h-32 w-32 box border border-black rounded-full" loading="lazy" />
    <h2 class="text-xl">{username ? username : "your username here"}</h2>
    <h3 class="font-bold text-lg">Joined:</h3>
    <span>{date.substring(0, 10)}</span>
    <form class="flex flex-col gap-1" onsubmit={assign_username}>
        <input id="display_name" type="text" placeholder="radical username here" class="border border-black rounded-lg p-1 shadow" required bind:value={username}>
        {#if badword}
            <span class="text-red-500">Username contains no-no's</span>
        {/if}
        <input 
        type="submit" 
        class="border {badword ? "border-red-500 cursor-not-allowed" : "border-black box active:scale-90 transition-all hover:no-box hover:translate-y-1 hover:opacity-80 cursor-pointer"} p-1 rounded-lg" 
        value="choose username"
        disabled={badword}
        >
    </form>
</div>