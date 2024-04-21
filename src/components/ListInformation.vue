<script setup>
import capitalize from '@/utils/capitalize'

const props = defineProps(['infos', 'title'])

const pokeInfo = props.infos.map((info) => capitalize(info.replace('-', ' ')))
</script>

<template>
  <div>
    <h3 class="border-bottom pb-2">{{ title }}</h3>
    <div class="d-flex flex-wrap gap-1">
      <p class="border p-1" v-for="info in pokeInfo" :key="info">{{ info }}</p>
    </div>
  </div>
</template>
