<script>
export default {
  props: {
    number: String,
    description: String,
  },
}
</script>

<template>
  <div class="flex flex-row gap-3">
    <div class="rounded-full border-2 border-title font-bold text-center pr-0.5 pt-0.5 w-8 h-8">
      {{ number }}
    </div>
    <p class="text-xl">
      {{ description }}
    </p>
  </div>
</template>
