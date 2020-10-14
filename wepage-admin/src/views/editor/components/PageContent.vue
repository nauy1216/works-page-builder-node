<template>
  <div
    class="page-content"
    :style="{
      width: pageConfig.width + 'px',
      height: pageConfig.height + 'px'
    }"
  >
    <vue-draggable-resizable
      v-for="(comp, index) in pageConfig.children"
      :key="index"
      :w="comp.config.width"
      :h="comp.config.height"
      :parent="true"
      :debug="false"
      :min-width="comp.config.width"
      :min-height="comp.config.height"
    >
      <component :is="compList[comp.name]"></component>
    </vue-draggable-resizable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      active: false,
      compList
    };
  },
  created() {
    // this.$eventBus.$on("addComponent", comp => {
    //   this.compList.push(comp);
    // });
  },
  watch: {
    active() {
      console.log(this.active);
    }
  },
  computed: {
    ...mapState(["pageConfig"])
  },
  methods: {
    onDrag(data) {
      console.log("onDrag", data);
    },
    onResize() {
      console.log();
    }
  }
});
</script>

<style lang="scss" scoped></style>
