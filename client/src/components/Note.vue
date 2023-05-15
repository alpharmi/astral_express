<template>
    <div class="bgcontainer bg-bg-dark-80 h-20 flex flex-row my-2 gap-2 p-2 pr-3 w-[30rem] whitespace-pre-line items-center">
        <img class="h-full" src="/images/other/march_sticker.png">
        <p class="text-description">{{ "• " + messages.replace(",", "\n• ") }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            messages: String
        }
    }
</script>