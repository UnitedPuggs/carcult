<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    
</script>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>  

<div class="flex flex-col h-screen">
<Navbar />
<body>
    <slot />
</body>
<footer class="w-full mt-auto mb-0">
    <hr class="border-t border-black">
    <div class="flex flex-col my-2 w-fit text-sm text-gray-400">
        <h3>copyright © 2024 carcult. All rights reserved.</h3>
        <a href="/">contact us</a>
    </div>
</footer>
</div>
