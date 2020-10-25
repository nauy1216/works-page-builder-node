import Vue from "vue";
import Test from "./test/index.vue";
import ChartHistogram from "./chart-histogram/index.vue";
import ChartBar from "./chart-bar/index.vue";
import ChartPie from "./chart-pie/index.vue";
import ChartRing from "./chart-ring/index.vue";

const compList = {
  Test,
  ChartHistogram,
  ChartBar,
  ChartPie,
  ChartRing
};

Object.keys(compList).forEach(comp => {
  if (typeof compList[comp] != "function") {
    compList[comp] = Vue.extend(compList[comp]);
  }
});

export default compList;
