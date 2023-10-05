<script>
    import FollowCard from '$lib/garage/FollowCard.svelte';
    export let data;
    $: short = data.garage_followers;
    $: pics = data.garage;
</script>

<div class="flex flex-col justify-center items-center">
    {#each short as followed, i}
        <FollowCard username={followed.followed} pfp_pic={pics[i].pfp_url}/>
    {/each}
</div>