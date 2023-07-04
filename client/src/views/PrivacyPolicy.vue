<script setup>
import Split from '../components/Split.vue'
</script>

<template>
  <h1 class="text-4xl pb-2 text-title font-bold">
    Privacy Policy
  </h1>
  <p class="pb-2">
    How and what data does Astral Express handle <br>and what it's used for.
  </p>
  <Split />
  <p class="text-title font-bold text-xl">
    What does Astral Express collect
  </p>
  <div class="text-xl ml-10">
    <div class="flex flex-col gap-2">
      <div>
        <p class="text-title">
          • Visted astral-express.vercel.app URL
        </p>
        <p>astral express uses <a href="https://vercel.com/docs/concepts/analytics/privacy-policy" class="link">vercel.com</a> analytics to collect pages viewed, operating system, browser, and visitor country.</p>
      </div>
    </div>
  </div>
  <p class="text-title font-bold text-xl">
    What does Astral Express DOESN'T collect
  </p>
  <div class="text-xl ml-10 flex flex-col gap-2">
    <p>• Astral Express wont ever save passwords, emails, and HoYoverse related data (UIDs, usernames, etc). <br> Feel free to checkout the source code for yourself on <a href="https://github.com/alpharmi/astral_express" class="link">GitHub</a></p>
    <p>• Warp data is stored within the browser and isn't uploaded anywhere.</p>
  </div>
</template>
