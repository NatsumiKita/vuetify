<template>
  <div class="home">
    <v-btn @click="linkPage('test1')">test1</v-btn>
    <v-btn @click="linkPage('test2')">test2</v-btn>
    <v-btn @click="linkPage('test3')">test3</v-btn>
  </div>
</template>

<script>

export default {
  components: {
  },
  methods: {
    linkPage (path) {
      this.$router.push(path)
    }
  }
}
</script>
