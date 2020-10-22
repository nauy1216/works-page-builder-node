import { mapMutations, mapState } from "vuex";
import {
  MapStateTyped,
  StateNamespace,
  MapMutationsTyped,
  MutationNamespace
} from "./vuex";
import { State, Mutations } from "../store";
import { PageStoreType } from "../store/page";
import { EditorStoreType } from "../store/editor";

export const mapStateTyped: MapStateTyped<State> &
  StateNamespace<"page", PageStoreType["state"]> &
  StateNamespace<"editor", EditorStoreType["state"]> = mapState as any;

export const mapMutationsTyped: MapMutationsTyped<Mutations> &
  MutationNamespace<"page", PageStoreType["mutations"]> &
  MutationNamespace<
    "editor",
    EditorStoreType["mutations"]
  > = mapMutations as any;
