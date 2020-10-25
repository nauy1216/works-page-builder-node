import Vue from "vue";
// import Test from "./packages/test/index.vue";
// import ChartHistogram from "./packages/chart-histogram/index.vue";
import ChartBar from "./packages/chart-bar/index.vue";
// import ChartPie from "./packages/chart-pie/index.vue";
// import ChartRing from "./packages/chart-ring/index.vue";

const compList = {
//   Test,
//   ChartHistogram,
  ChartBar,
//   ChartPie,
//   ChartRing
};

Object.keys(compList).forEach(comp => {
  if (typeof compList[comp] != "function") {
    compList[comp] = Vue.extend(compList[comp]);
  }
});

export default compList;
