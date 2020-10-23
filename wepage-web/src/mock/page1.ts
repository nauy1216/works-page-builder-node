export default {
  id: "16034361706941859",
  key: "1603436170694339",
  alias: "测试",
  width: 1920,
  height: 1080,
  dragMode: false,
  layouts: [
    {
      id: "16034361706947317",
      name: "默认",
      zIndex: 0,
      show: true,
      mode: "position"
    }
  ],
  children: [
    {
      layoutId: "16034361706947317",
      id: "1603436202714439",
      key: "16034362027145384",
      name: "ChartHistogram",
      alias: "柱状图",
      config: {
        x: 763,
        y: 259,
        width: 400,
        height: 400,
        zIndex: 0,
        lockAspectRatio: true,
        active: false,
        alias: "柱状图",
        icon: "el-icon-star-on"
      },
      data: {}
    },
    {
      layoutId: "16034361706947317",
      id: "16034362041165801",
      key: "16034362041163178",
      name: "ChartBar",
      alias: "条形图",
      config: {
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        zIndex: 0,
        lockAspectRatio: true,
        active: true,
        alias: "条形图",
        icon: "el-icon-star-on"
      },
      data: {}
    }
  ]
};
