<template>
  <div class="left-tool">
    <!-- <component v-for="comp in compList" :key="comp.name" :is="comp"></component> -->
    <div
      v-for="comp in compList"
      :key="comp.name"
      class="left-tool-item"
      @click="handleClick(comp)"
    >
      <i :class="comp.extendOptions.icon"></i>{{ comp.extendOptions.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropOptions } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import CompList from "@/lib/index.ts";

@Component({
  components: {}
})
export default class Index extends Vue {
  @Prop({
    type: Number,
    default: 0,
    label: "msg"
  } as PropOptions)
  msg = 0;

  compList = CompList;

  created() {
    console.log("compList", this.compList);
  }

  handleClick(comp) {}
}
</script>
<style scoped lang="scss">
.left-tool-item {
  margin: 10px 20px;
  text-align: left;
}
</style>
