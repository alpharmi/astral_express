<template>
    <div class="bgcontainer w-fit flex flex-row h-14 gap-2">
        <img :src="`/images/other/${value}.webp`" class="w-9">
        <div class="flex flex-col w-min text-sm capitalize">
            <p class="text-title w-max pr-1">{{ value.replaceAll("_", " ") }}</p>
            <div class="flex flex-row align-middle gap-2 w-max">
                <p v-if="option">{{ option.replaceAll("_", " ") }}</p>
                <label class="switch mt-0.5">
                    <input :id="value" type="checkbox" :checked="toggled">
                    <span></span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String,
            option: String,
            toggled: String
        }
    }
</script>