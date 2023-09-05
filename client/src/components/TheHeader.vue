<template>
  <div class="fixed flex justify-between items-center top-0 w-full h-14 px-5 backdrop-blur-lg backdrop-brightness-75 border-b-[rgba(255,_255,_255,_0.08)] border-b z-30">
    <div class="font-bold font-sans text-xl flex flex-row gap-1">
      <p
        class="text-description link-hidden"
        @click="redirect('/')"
      >
        astral express
      </p>
      <p
        v-for="(routeItem, index) in currentRoute"
        :id="routeItem"
        :key="index"
        class="fade-in"
      > 
        <span class="text-description">/ </span><a
          class="hover:cursor-pointer"
          @click="redirect(routeItem, index)"
        >{{ routeItem }}</a>
      </p> 
      <Locale />
    </div>
  </div>
</template>

<script>
import * as vueRouter from 'vue-router'
import Locale from './TheLocale.vue'
export default {
	components:{
		Locale
	},
	computed:{
		currentRoute(){
			return this.$router.currentRoute.value.fullPath.split('/').filter(route => route != '')
		}
	},
  methods: {
		redirect(route, index){
			if(index !== 0 & index === this.currentRoute.length - 1){
				return
			}
			const targetPath = ((route === '/') ? '' : '/') +  route
			this.$router.push(
				{path: targetPath}
			)
	 }
  },
}
</script>

