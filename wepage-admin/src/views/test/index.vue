<script lang="tsx">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      msg: 9,
      show: true
    };
  },
  created() {
    window.addEventListener(
      "message",
      e => {
        if (e.data.from === "wepage-web") {
          console.log("接受iframe的消息", e.data);
        }
      },
      false
    );
  },
  methods: {
    sendMessage() {
      const win = (this.$refs.app as any).contentWindow as Window;
      win.postMessage(
        {
          from: "wepage-admin",
          type: "setAppConfig",
          data: {
            a: 100
          }
        },
        "*"
      );
    }
  },
  render() {
    return <iframe ref="app" src="http://localhost:8002/appID" style="width: 100vw; height: 100vh;"></iframe>;
  }
});
</script>

<style></style>
