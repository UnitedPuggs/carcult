<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    
    let activeTab = $state("about")
    let uploadedPfp = $state();
    let file = $state();
    
    let { data } = $props();
    let trunc = $derived(data.garage);

    let bio = $state(data.garage.bio)
    let textarea = $state();
    $effect(() => {
        if(textarea) {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    })

    function switchTab(tab) {
        activeTab = tab;
    }

    const tabs = ["about", "appearance", "location"];

    const uploadedImg = (e) => {
        let img = e.target.files[0];
        file = img;

        let reader = new FileReader();

        reader.readAsDataURL(img);
        reader.onload = e => {
            uploadedPfp = e.target.result;
        };
    }

    async function updateProfile() {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("file", file);

        await fetch("/api/garage/update_profile", {
            method: "POST",
            body: formData,
        });

        goto(`/garage/${$page.data.session?.user.displayname}`);
    }

    function back() {
        if(browser)
            window.history.back();
    }
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

<button onclick={ back } class="text-start ml-2 mt-2 text-2xl">&lt;--</button>
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
                    click to change
                    <input type="file" class="hidden" accept="image/*" bind:value={ uploadedPfp } onchange={(e) => uploadedImg(e)} />
                    <img src={uploadedPfp ? uploadedPfp : trunc.pfp_url} alt="temp's avatar" class="rounded-full h-24 w-24 border border-black box cursor-pointer" />
                </label>
                <span class="text-gray-400 text-xl">{trunc.username}</span>
                <label for="bio" class="text-lg font-semibold">bio</label>
                <textarea class="border border-black rounded-lg p-1 lg:w-60 max-h-40" bind:value={ bio } bind:this={ textarea }></textarea>
                <div class="mt-auto mb-0">
                    <button onclick={ updateProfile } class="hover:opacity-80 border border-black p-1 rounded-lg box active:scale-90 transition-all hover:no-box hover:translate-y-1">save</button>
                </div>
            </div>
        {:else if activeTab == "appearance"}
            shiv
        {:else if activeTab == "location"}
            bebop
        {/if}
    </section>
</div>