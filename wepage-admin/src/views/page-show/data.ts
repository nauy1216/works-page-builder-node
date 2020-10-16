export default {
  alias: "",
  width: 1920,
  height: 1080,
  children: [
    {
      name: "ChartHistogram",
      alias: "柱状图",
      config: {
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        zIndex: 0,
        lockAspectRatio: true,
        alias: "柱状图",
        icon: "el-icon-star-on",
        active: false
      },
      data: {}
    },
    {
      name: "ChartPie",
      alias: "饼图",
      config: {
        x: 400,
        y: 0,
        width: 400,
        height: 200,
        zIndex: 0,
        lockAspectRatio: true,
        alias: "饼图",
        icon: "el-icon-star-on",
        active: false
      },
      data: {}
    },
    {
      name: "ChartBar",
      alias: "条形图",
      config: {
        x: 800,
        y: 0,
        width: 400,
        height: 400,
        zIndex: 0,
        lockAspectRatio: true,
        alias: "条形图",
        icon: "el-icon-star-on",
        active: false
      },
      data: {}
    },
    {
      name: "ChartRing",
      alias: "环图",
      config: {
        x: 400,
        y: 200,
        width: 400,
        height: 200,
        zIndex: 0,
        lockAspectRatio: true,
        alias: "环图",
        icon: "el-icon-star-on",
        active: false
      },
      data: {
        msg: "hello",
        color: "#ffffff"
      }
    },
    {
      name: "ChartRing",
      alias: "环图",
      config: {
        x: 800,
        y: 400,
        width: 400,
        height: 200,
        zIndex: 0,
        lockAspectRatio: true,
        alias: "环图",
        icon: "el-icon-star-on",
        active: false
      },
      data: {
        msg: "hello",
        color: "#ffffff"
      }
    }
  ]
};
