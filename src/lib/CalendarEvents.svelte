<script>
    export let month;
    export let day;
    export let date;

    let curr_date = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day).toLocaleString('en-us', { weekday: 'long' });
</script>

<div class="hover:opacity-75 border border-white flex flex-col h-32">
    <h1>{curr_date}</h1>
    <span>{day}</span>
    <button>test</button>
</div>