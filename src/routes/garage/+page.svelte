<script>
    import { page } from '$app/stores'
</script>

<div>
    <div class="flex justify-start items-start max-w-xs h-full p-2 border-white border-2">
        <div class="flex justify-center">
            <img src={$page.data.session.user.image} alt="" class="rounded-full border-white border-2"/>
        </div>
    </div>
</div>