<script setup></script>

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
          <b-nav-item-dropdown text="Language">
            <b-dropdown-item>English</b-dropdown-item>
            <b-dropdown-item>Portuguese</b-dropdown-item>
            <b-dropdown-item>Spanish</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
