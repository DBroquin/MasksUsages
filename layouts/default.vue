<template>
  <div class="min-h-screen bg-white flex flex-col">
    <nav class="bg-white border-b border-gray-200">
      <Top />
    </nav>

    <main class="flex-1 flex">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'

export default {
  name: 'DefaultLayout',
  components: { Top }
}
</script>