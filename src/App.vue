<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      height="30"
    >
      <div class="d-flex align-center">
        Wijimo検証
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
<style lang="scss">

</style>