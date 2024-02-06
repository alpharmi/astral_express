<template>
  <div class="absolute w-full min-h-screen z-[3]">
    <RouterView/>
  </div>

  <video autoplay loop muted preload="auto" playsinline on-touchmove="return false;" class="absolute object-cover w-full h-screen opacity-50 mix-blend-overlay z-[2]">
    <source src="/other/background.webm">
  </video>
  <img src="/images/other/astralExpress.png" class="absolute z-[1]">
</template>

<script setup>

</script>