<template>
    <div class="bgcontainer w-fit flex flex-row h-14 gap-2">
        <img :src="`/images/other/${value}.webp`" class="w-9">
        <div class="flex flex-col w-min text-sm capitalize">
            <p class="text-title w-max pr-1 ">{{ getLangValue(value)}}</p>
            <div class="flex flex-row align-middle gap-2 w-max">
                <p v-if="option">{{ getLangValue(option)}}</p>
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
            toggled: String,
						category: String
				},
				methods:{
					getLangValue(val, completedKey = false){
						if(!this.category){return}
							return this.$t(this.category + '.' + val.replace(/_(.)/g, (_, p1) => p1.toUpperCase()).replace(/^./, c => c.toLowerCase()))
					}
				}
    }
</script>
