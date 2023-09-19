<script>
    import { page } from '$app/stores'
    export let data;
    const short = data.garage[0];
</script>

<div>
    <div class="flex justify-start items-start max-w-[200px] md:max-w-xs h-screen p-2 border-white border-2">
        <div class="flex flex-col justify-center items-center mx-auto">
            <img src={$page.data.session.user.image} alt="/assets/Hulk_Hogan.jpg" class="rounded-full border-white border-4 md:mt-6" width="150" height="150"/>
            <h1 class="text-2xl mt-2">{$page.data.session.user.name}</h1>
            <h1 class="font-semibold mt-12 text-xl">Joined:</h1>
            <span>{short.created.substring(0, 10)}</span>
            <h1 class="font-semibold mt-12 text-xl">Bio:</h1>
            <span>{short.bio}</span>
            <h1 class="font-semibold mt-12 text-xl">Owner of:</h1>
            {#each short.vehicles as vehicles}
                <span>{vehicles}</span>
            {/each}
        </div>
    </div>
</div>