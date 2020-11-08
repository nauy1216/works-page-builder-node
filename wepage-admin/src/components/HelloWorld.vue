<template>
  <div class="hello">
    <h1 ref="h1">{{ message1 }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
const SuperVue = Vue;
@Component({
  data() {
    return {
      a: 1
    };
  }
})
export default class HelloWorld extends SuperVue {
  @Prop() private msg!: string;

  message = "kkkk";
  message1 = "kkkk";
  message23 = "kkkk";
  message3 = "kkkk";

  get c1() {
    return this.message1;
  }
  $refs!: {
    refH1: HTMLElement;
  };

  mounted() {
    console.log("kkkk", this.$refs.refH1);
  }

  m1() {
    console.log("kkkk", this.$refs.refH1);
  }

  m2() {
    console.log("kkkk", this.$refs.refH1);
  }

  m3() {
    console.log("kkkk", this.$refs.refH1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
