<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main class="mt-32 min-h-[calc(100vh-3.5rem)] px-56 sm:px-10 flex flex-col gap-3">
    <RouterView />
  </main>
  <video autoplay loop muted preload="auto" playsinline on-touchmove="return false;" class="fixed object-cover w-full h-screen -z-50 mix-blend-soft-light opacity-75">
    <source src="/other/background.webm">
  </video>
  <Footer />
</template>
