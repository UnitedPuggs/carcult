<script>
    export let pfp_pic;
    export let username;
</script>

<!-- We're just wrapping our div in a link to the follower/following user's garage -->
<a href="/garage/{username}" class="text-2xl hover:opacity-75">
    <div class="flex border-2 border-white items-center p-4 w-screen">
        <img src={pfp_pic} alt="" class="rounded-full border-white border-4 w-[150px] h-[146.22px] mr-4" width="150" height="150" loading="lazy"/>
        {username}
    </div>
</a>