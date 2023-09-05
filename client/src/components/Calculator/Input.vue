<script>
export default {
  props: {
    value: String,
    category: String,
  },
  computed: {
    langValue() {
      if (this.category && this.value)
        return this.$t(`${this.category}.${this.value.replace(/_(.)/g, (_, p1) => p1.toUpperCase()).replace(/^./, c => c.toLowerCase())}`)

      else
        return this.value.replaceAll('_', ' ')
    },
  },
}
</script>

<template>
  <div class="bgcontainer w-fit flex flex-row h-14 gap-2">
    <img
      :src="`/images/other/${value}.webp`"
      class="w-9"
    >
    <div class="flex flex-col w-min text-sm">
      <p class="text-title capitalize w-max pr-1">
        {{ langValue }}
      </p>
      <input
        :id="value"
        type="number"
        class="bg-transparent w-20 outline-none"
        placeholder="0"
      >
    </div>
  </div>
</template>
