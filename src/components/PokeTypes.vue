<script setup>
import capitalize from '@/utils/capitalize'

const props = defineProps(['type'])
</script>

<template>
  <div class="type-wrapper">{{ capitalize(props.type) }}</div>
</template>

<style scoped>
.type-wrapper {
  padding: 4px 8px;
  color: #fff;
  font-weight: 500;
}

.bug {
  background-color: #abb642;
}

.dark {
  background-color: #6c584a;
}

.dragon {
  background-color: #6843ef;
}

.electric {
  background-color: #f2d054;
}

.fairy {
  background-color: #e29dac;
}

.flying {
  background-color: #a493ea;
}

.fighting {
  background-color: #b13c31;
}

.fire {
  background-color: #e28544;
}

.ghost {
  background-color: #6c5a94;
}

.grass {
  background-color: #8bc560;
}

.ground {
  background-color: #dbc074;
}

.ice {
  background-color: #a6d6d7;
}

.normal {
  background-color: #a8a77d;
}

.poison {
  background-color: #94489b;
}

.psychic {
  background-color: #e66388;
}

.rock {
  background-color: #b4a04a;
}

.steel {
  background-color: #b8b8ce;
}

.water {
  background-color: #6f91e9;
}
</style>
