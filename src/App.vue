<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>
    <v-content class="grey lighten-4" v-if="loggedIn">
      <router-view class="mx-4 mb-4"></router-view>
    </v-content>
    <v-content class="grey lighten-4" v-if="!loggedIn">
      <router-view class=""></router-view>
    </v-content>
  </v-app>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import Navbar from "./components/Navbar";

  export default {
    name: 'App',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Navbar
    },
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn
      }
    },
    data: () => ({
      //
    }),
  };
</script>
