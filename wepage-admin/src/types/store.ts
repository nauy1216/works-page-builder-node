import { mapMutations, mapState } from "vuex";
import {
  MapStateTyped,
  StateWidthNamespace,
  MapMutationsTyped,
  MutatonsWidthNamespace
} from "./vuex";
import { State, Mutations } from "../store";
import { PageStoreType } from "../store/page";
import { EditorStoreType } from "../store/editor";

export const mapStateTyped: MapStateTyped<State> &
  StateWidthNamespace<"page", PageStoreType["state"]> &
  StateWidthNamespace<"editor", EditorStoreType["state"]> = mapState as any;

export const mapMutationsTyped: MapMutationsTyped<Mutations> &
  MutatonsWidthNamespace<"page", PageStoreType["mutations"]> &
  MutatonsWidthNamespace<
    "editor",
    EditorStoreType["mutations"]
  > = mapMutations as any;
