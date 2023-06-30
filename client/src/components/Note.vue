<template>
    <div class="bgcontainer bg-bg-dark-80 h-20 flex flex-row my-2 gap-2 p-2 pr-3 w-max whitespace-pre-line items-center">
        <img class="h-full" src="/images/other/march_sticker.png">

        <p class="text-description">{{ "• " + messages.replace(",", "\n• ") }}</p>
				<!-- <p v-for="(message, index) in messages" :key="index" class="text-description">
					{{ message }}
				</p> -->
    </div>
</template>

<script>
import { onMounted } from 'vue'
    export default {
        props: {
            messages: String
        }
    }

		onMounted(() => {
			console.log(this.messages)
		})
</script>
