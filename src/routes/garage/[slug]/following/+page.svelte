<script>
    import FollowCard from '$lib/garage/FollowCard.svelte';
    let { data } = $props();
    let short = $derived(data.garage);
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-2xl font-bold py-2">following</h1>
    {#each short as pics}
        <FollowCard username={pics.username} pfp_pic={pics.pfp_url}/>
    {/each}
</div>