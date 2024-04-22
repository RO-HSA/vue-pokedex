<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

const { locale } = useI18n()

const store = useStore()

const changeLocale = async (value) => {
  locale.value = value
  await store.dispatch('fetchPokemons', locale.value)
  store.dispatch('setisLoading', false)
}
</script>

<template>
  <header>
    <b-navbar class="p-2" toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/">Pokedex</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="https://github.com/RO-HSA/vue-pokedex" target="_blank"
            >Github</b-nav-item
          >
          <b-nav-item-dropdown v-model="locale" :text="$t('nav.button_lang')">
            <b-dropdown-item v-on:click="changeLocale('en')">{{
              $t('nav.options.en')
            }}</b-dropdown-item>
            <b-dropdown-item v-on:click="changeLocale('pt')">{{
              $t('nav.options.pt')
            }}</b-dropdown-item>
            <b-dropdown-item v-on:click="changeLocale('es')">{{
              $t('nav.options.es')
            }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
