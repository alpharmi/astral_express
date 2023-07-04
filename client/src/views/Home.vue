<script setup>
import * as vueRouter from 'vue-router'

const router = vueRouter.useRouter()
function redirect(route) {
  router.push({
    path: route,
  })
}
</script>

<template>
  <div class="flex flex-row flex-wrap w-full px-20 gap-5 place-content-center child:max-w-md">
    <div class="flex flex-col gap-5">
      <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
        <h1 class="font-bold text-title pb-2">
          {{ $t('home.title') }}
        </h1>
        <i18n-t keypath="home.newDesc.content" tag="p">
          <span class="text-pink">{{ $t('home.newDesc.intro') }}</span>
        </i18n-t>
        <p v-if="false">
          {{ $t('home.desc') }} <span class="text-pink">{{ $t('home.desc2') }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
        <p>
          {{ $t('wc.desc') }}
        </p>
        <button class="flex button mt-3 gap-2 p-1 px-3 items-center" @click="redirect('warp/calculator')">
          <img class="w-9" src="/images/other/oneiric_shard.webp">
          <p class="font-bold">
            {{ $t('wc.title') }} >
          </p>
        </button>
      </div>
      <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
        <p>
          {{ $t('wh.desc') }}
        </p>
        <button class="flex button mt-3 gap-2 p-1 px-3 items-center" @click="redirect('warp')">
          <img class="w-9" src="/images/other/star_rail_pass.webp">
          <p class="font-bold">
            {{ $t('wh.title') }} >
          </p>
        </button>
      </div>
      <!--
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <p>
                    Search a player's UID to view their level,
                    characters, light cones, relics, and more.
                </p>
                <button @click="redirect('player')" class="flex button mt-3 gap-2 p-1 px-3 items-center">
                    <img class="w-9" src="/images/other/trailblaze_exp.webp">
                    <p class="font-bold">Player Viewer ></p>
                </button>s
            </div>
            -->
    </div>
  </div>
</template>
