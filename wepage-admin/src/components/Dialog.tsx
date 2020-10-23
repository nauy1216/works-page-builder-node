import Vue, { VNode } from "vue";
import { ExportPublicProps } from "@/types/utils";

const Noop = function() {
  //
};
const comp = Vue.extend({
  data() {
    return {
      dialogVisible: false,
      renderContent: () => null,
      cancel: null,
      confirm: null,
      title: "提示",
      resolve: Noop,
      reject: Noop
    };
  },
  methods: {
    show(props: { renderContent?: () => VNode; cancel?: (close: Function) => void; confirm?: (close: Function) => void; title?: string }) {
      this.dialogVisible = true;
      this.renderContent = props.renderContent as any;
      this.cancel = props.cancel as any;
      this.confirm = props.confirm as any;
      this.title = props.title as any;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    close() {
      this.dialogVisible = false;
    },
    handleCancel() {
      if (this.cancel != null) {
        (this.cancel as any)(this.close);
      } else {
        this.close();
      }
      this.$emit("cancel");
      this.reject();
    },
    handleconfirm() {
      if (this.confirm != null) {
        (this.confirm as any)(this.close);
      } else {
        this.close();
      }
      this.$emit("confirm");
      this.resolve();
    }
  },
  render() {
    const props = {
      on: {
        "update:visible": value => {
          this.dialogVisible = value;
        }
      }
    };
    return (
      <el-dialog title={this.title} append-to-body={true} close-on-click-modal={false} width="30%" visible={this.dialogVisible} {...props}>
        {this.renderContent()}
        <span slot="footer" class="dialog-footer">
          <el-button onClick={this.handleCancel}>取 消</el-button>
          <el-button type="primary" onClick={this.handleconfirm}>
            确 定
          </el-button>
        </span>
      </el-dialog>
    );
  }
});

export type DialogType = ExportPublicProps<typeof comp, "show">;
export default comp;

let dialog;
export function getDialog(): DialogType {
  if (!dialog) {
    dialog = new comp().$mount();
    document.body.append(dialog.$el);
  }
  return dialog;
}
