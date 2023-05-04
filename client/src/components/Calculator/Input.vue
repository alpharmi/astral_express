<template>
    <div class="container w-fit flex flex-row h-14 gap-2">
        <img :src="`/images/items/${value}.webp`" class="w-9">
        <div class="flex flex-col w-min text-sm">
            <p class="text-title capitalize w-max pr-1">{{ value.replaceAll("_", " ") }}</p>
            <input :id="value" type="number" class="bg-transparent w-20 outline-none" placeholder="0">
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