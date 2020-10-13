<template>
  <div class="left-tool">
    <div
      v-for="comp in compList"
      :key="comp.name"
      class="left-tool-item"
      @click="handleClick(comp)"
    >
      <i :class="comp.extendOptions.config.icon"></i>{{ comp.extendOptions.config.label }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";

export default Vue.extend({
  props: {
    msg: {
      type: Number,
      default: 0,
      label: "msg"
    }
  },
  data() {
    return {
      compList
    };
  },
  methods: {
    handleClick(comp) {
      this.$store.commit("setSelectComp", comp);
      this.$eventBus.$emit("addComponent", comp);
      console.log(comp.extendOptions);
    }
  }
});
</script>
<style scoped lang="scss">
.left-tool-item {
  margin: 10px 0;
  padding: 20px;
  text-align: left;
  &:hover {
    background-color: red;
  }
}
</style>
