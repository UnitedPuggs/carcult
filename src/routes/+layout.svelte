<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    
</script>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>  

<Navbar />
<body class="bg-black font-mono text-white antialiased">
    <slot />
</body>