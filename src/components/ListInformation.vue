<script setup>
const props = defineProps(['infos', 'title'])
</script>

<template>
  <div>
    <h3 class="border-bottom pb-2">{{ title }}</h3>
    <div class="d-flex flex-wrap gap-1">
      <p class="border p-1" v-for="info in props.infos" :key="info">{{ info }}</p>
    </div>
  </div>
</template>
