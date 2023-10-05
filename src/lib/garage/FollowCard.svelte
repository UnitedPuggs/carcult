<script>
    export let pfp_pic;
    export let username;
</script>
<a href="/garage/{username}" class="text-2xl hover:opacity-75">
    <div class="flex border-2 border-white items-center p-4 w-screen">
        <img src={pfp_pic} alt="" class="rounded-full border-white border-4 w-[150px] h-[146.22px]" width="150" height="150"/>
        {username}
    </div>
</a>