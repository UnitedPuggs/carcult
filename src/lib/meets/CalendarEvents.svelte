<script>
    export let month;
    export let day;
    export let day_arr;

    let extra_style = ""
    //need to figure out if a day is in prev month and apply a new extra_style
</script>

<div class="border border-white flex flex-col h-32 w-48 {extra_style}">
    <!--<h1>{curr_date}</h1>-->
    <span>{day}</span>
    <button 
    on:click={() => alert("test " + day)} 
    class="hover:opacity-75 border border-white rounded-sm mx-1 bg-white text-black text-lg font-bold"
    >
        test {day}
    </button>
</div>