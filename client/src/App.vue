<template>
  <Header/>
  <main class="relative top-14 min-h-[calc(100vh-3.5rem)] px-56 pt-20 flex flex-col gap-3">
    <RouterView/>
  </main>
</template>

<script setup>
  import Header from "./components/Header.vue"
</script>