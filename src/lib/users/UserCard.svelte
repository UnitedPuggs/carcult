<script>
    let {
        username,
        pfp_url,
        followers,
        following
    } = $props();
</script>

<a href="/garage/{username}" class="hover:opacity-80 w-fit mx-auto">
    <div class="flex border border-black mx-auto lg:w-96 w-80 p-2 rounded-lg box transition-all hover:no-box hover:translate-y-1">
        <img src={pfp_url} alt="" class="rounded-full border-black border box h-32 w-32" loading="lazy"/>
        <section class="flex flex-col ml-6">
            <h1 class="font-bold text-2xl lg:text-3xl">{username}</h1>
            <h2 class="text-base text-gray-400"><strong>following:</strong> {following}</h2>
            <h2 class="text-base text-gray-400"><strong>followers:</strong> {followers}</h2>
        </section>
    </div>
</a>