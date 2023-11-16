<script>
    export let username;
    export let pfp_url;
    export let followers;
    export let following;
</script>

<a href="/garage/{username}" class="text-2xl hover:opacity-75 w-wo-scroll">
    <div class="flex border-2 border-white items-center p-4">
        <img src={pfp_url} alt="" class="rounded-full border-white border-4 w-[150px] h-[146.22px] mr-4" width="150" height="150" loading="lazy"/>
        <section class="flex flex-col">
            <h1 class="font-bold">{username}</h1>
            <h2 class="text-base"><strong>following:</strong> {following}</h2>
            <h2 class="text-base"><strong>followers:</strong> {followers}</h2>
        </section>
    </div>
</a>