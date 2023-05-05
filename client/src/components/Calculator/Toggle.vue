<template>
    <div class="bgcontainer w-fit flex flex-row h-14 gap-2">
        <img :src="`/images/items/${value}.webp`" class="w-9">
        <div class="flex flex-col w-min text-sm items-start">
            <p class="text-title capitalize w-max pr-1">{{ value.replaceAll("_", " ") }}</p>
            <label class="checkbox">
                <input :id="value" type="checkbox">
                <span></span>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String
        }
    }
</script>