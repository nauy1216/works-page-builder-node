<template>
  <div id="app">
    <Hello></Hello>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
import Hello from "@/components/HelloWorld.vue";
(window as any).h = Hello;
console.log("Hello", Hello);
export default {
  components: {
    Hello
  }
};
</script>

<style lang="scss"></style>
