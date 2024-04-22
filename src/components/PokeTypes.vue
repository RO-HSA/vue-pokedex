<script setup>
const props = defineProps(['type'])
</script>

<template>
  <div class="type-wrapper">{{ props.type }}</div>
</template>

<style scoped>
.type-wrapper {
  padding: 4px 8px;
  color: #fff;
  font-weight: 500;
}

.bug,
.bicho {
  background-color: #abb642;
}

.dark,
.siniestro {
  background-color: #6c584a;
}

.dragon,
.dragón {
  background-color: #6843ef;
}

.electric,
.eléctrico {
  background-color: #f2d054;
}

.fairy,
.hada {
  background-color: #e29dac;
}

.flying,
.volador {
  background-color: #a493ea;
}

.fighting,
.lucha {
  background-color: #b13c31;
}

.fire,
.fuego {
  background-color: #e28544;
}

.ghost,
.fantasma {
  background-color: #6c5a94;
}

.grass,
.planta {
  background-color: #8bc560;
}

.ground,
.tierra {
  background-color: #dbc074;
}

.ice,
.hielo {
  background-color: #a6d6d7;
}

.normal {
  background-color: #a8a77d;
}

.poison,
.veneno {
  background-color: #94489b;
}

.psychic,
.psíquico {
  background-color: #e66388;
}

.rock,
.roca {
  background-color: #b4a04a;
}

.steel,
.acero {
  background-color: #b8b8ce;
}

.water,
.agua {
  background-color: #6f91e9;
}
</style>
