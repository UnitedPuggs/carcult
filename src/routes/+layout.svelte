<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    
</script>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>  

<Navbar />
<body class="bg-black font-mono text-white antialiased">
    <slot />
</body>
<!--
<footer class="">
    <hr>
    <div class="flex flex-col my-2">
        <h3>carcult<sup>tm</sup> - 2024</h3>
        <a href="">contact us</a>
        <a href="">careers</a>
    </div>
</footer>
-->