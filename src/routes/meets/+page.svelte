<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import DayGrid from '@event-calendar/day-grid'

    let plugins = [DayGrid];
    let options = {
        view: 'dayGridMonth'
    };

</script>

<div class="mt-10">
    <Calendar {plugins} {options} />
</div>