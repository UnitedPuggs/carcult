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

    let darkMode = $state(false);

    $effect(() => { //This handles the textarea auto adjusting height
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

    function themeSwitch() {
        darkMode = !darkMode;

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        darkMode 
        ? document.documentElement.classList.add('dark') 
        : document.documentElement.classList.remove('dark');
    }

    function back() {
        if(browser)
            window.history.back();
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkMode = true;
        } else {
            document.documentElement.classList.remove('dark');
            darkMode = false;
        }
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
                    <button onclick={ updateProfile } class="hover:opacity-80 border-2 border-black p-1 rounded-md box active:scale-90 transition-all hover:no-box hover:translate-y-1 lg:w-60">save</button>
                </div>
            </div>
        {:else if activeTab == "appearance"}
            <div class="flex flex-col">
                <label for="dark mode" class="font-semibold">toggle dark mode</label>
                <button aria-label="dark mode" onclick={themeSwitch} class="border-2 border-black p-2 box-shadow transition-all active:scale-90 hover:translate-x-1 hover:translate-y-1 hover:no-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun h-6 w-6 m500:h-4 m500:w-4 hidden dark:inline stroke-darkText"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="lucide lucide-moon h-6 w-6 m500:h-4 m500:w-4 inline dark:hidden stroke-text"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                </button>
            </div>
        {:else if activeTab == "location"}
            bebop
        {/if}
    </section>
</div>