<template>
  <Header/>
  <main class="relative top-14 min-h-[calc(100vh-3.5rem)] px-56 pt-20 flex flex-col gap-3">
    <RouterView/>
  </main>
  <video autoplay loop muted preload="auto" playsinline on-touchmove="return false;" class="absolute object-cover w-full h-full -z-50 mix-blend-soft-light opacity-75">
    <source src="/other/background.webm">
  </video>
</template>

<script setup>
  import Header from "./components/Header.vue"
</script>