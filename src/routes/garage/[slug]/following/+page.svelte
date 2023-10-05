<script>
    import FollowCard from '$lib/garage/FollowCard.svelte';
    export let data;
    $: short = data.garage;
</script>

<div class="flex flex-col justify-center items-center">
    {#each short as pics}
        <FollowCard username={pics.username} pfp_pic={pics.pfp_url}/>
    {/each}
</div>