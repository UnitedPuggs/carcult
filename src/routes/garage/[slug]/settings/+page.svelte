<script>
    import { page } from "$app/stores";
    
    let activeTab = $state("about")
    let uploadedPfp = $state();
    
    let { data } = $props();
    //let trunc = $derived(data.garage[0]);

    function switchTab(tab) {
        activeTab = tab;
    }

    const tabs = ["about", "appearance"];
</script>

<svelte:head>
    <title>account settings</title>
</svelte:head>

{#snippet settingChoice(text)}
    <li>
        <button onclick={() => switchTab(text)}>
            <span class="{activeTab == text ? "underline" : "no-underline hover:underline"}">{text}</span>
        </button>
    </li>
{/snippet}

<div class="flex border border-black w-80 lg:w-96 h-96 m-auto rounded-xl offset-box">
    <section class="border-r border-black h-full p-2 text-end">
        <ul>
            {#each tabs as tab}
                {@render settingChoice(tab)}
            {/each}
        </ul>
    </section>
    <section class="flex flex-col p-2 w-full">
        {#if activeTab == "about"}
            <div class="flex flex-1 flex-col justify-center items-center">
                <label>
                    <input type="file" class="hidden" accept="image/*" bind:value={ uploadedPfp } onchange={(e) => uploaded_file(e)} />
                    <img src={uploadedPfp ? uploadedPfp : '/assets/user_profile.png'} alt="temp's avatar" class="rounded-full h-24 w-24 border border-black box cursor-pointer" />
                </label>
                <span class="font-bold text-lg">username</span>
                <label for="bio">bio</label>
                <textarea class="border border-black rounded-lg p-1 lg:w-60"></textarea>
                <div class="mt-auto mb-0"><button>save</button></div>
                
            </div>
        {:else if activeTab == "appearance"}
            piss
        {/if}
    </section>
</div>