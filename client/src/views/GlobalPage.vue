<script>
import Split from '../components/TheSplit.vue'

export default {
  data() {
    return {
      currentBanner: 'swirl_of_heavenly_spear',
    }
  },
}
</script>

<template>
  <h1 class="text-4xl pb-2 text-title font-bold">
    Global Stats
  </h1>
  <p>Global statistics from user submitted data to astral express. <br>View total warps for a banner, what characters pulled, and more.</p>
  <Split />
  <p class="text-[pink]">
    Coming soon.
  </p>
  <!--
    <div class="grid grid-cols-2 gap-5 child:rounded-md px-20">
        <img :src="`/images/banners/${currentBanner}.png`">
        <img :src="`/images/banners/${currentBanner}_fixation.png`">
    </div>
    -->
</template>
