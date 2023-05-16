<template>
    <div class="tooltip">
        <img src="/images/other/warning.png" class="min-w-[27px] max-w-[27px] scale-75 pl-1"/>
        <span class="whitespace-pre-line">{{ message }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            message: String
        }
    }
</script>