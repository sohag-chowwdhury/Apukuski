<template>
  <v-app>
    <v-content>
      <navbar />
      <router-view />
    </v-content>
  </v-app>
</template>
<script>

export default {
  data() {
    return {};
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
 
  methods: {},
};
</script>

<style>
#app {
  overflow: hidden !important;
  background: #F7F7F7 !important;

}
#full-size {
  margin: auto;
  background: #F7F7F7 !important;
}

</style>
