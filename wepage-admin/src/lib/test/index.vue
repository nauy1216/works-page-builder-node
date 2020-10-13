<template>
  <div class="test">
    llll
    <p>msg {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { PropOptions, ComponentOptions } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  label: "测试",
  icon: "el-icon-star-on",
  components: {}
} as ComponentOptions<Vue>)
export default class Test extends Vue {
  @Prop({
    type: Number,
    default: 0,
    label: "msg"
  } as PropOptions)
  msg = 0;
}
</script>
<style scoped lang="scss">
.test {
  border: 1px solid red;
}
</style>
