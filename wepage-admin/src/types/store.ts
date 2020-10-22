import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { MapStateTyped, StateWidthNamespace, MapMutationsTyped, MutatonsWidthNamespace, MapGettersTyped, MapActionsTyped } from "./vuex";
import { State, Mutations, Getters, Actions } from "../store";
import { PageStoreType } from "../store/page";
import { EditorStoreType } from "../store/editor";

export const mapStateTyped: MapStateTyped<State> & StateWidthNamespace<"page", PageStoreType["state"]> & StateWidthNamespace<"editor", EditorStoreType["state"]> = mapState as any;

export const mapMutationsTyped: MapMutationsTyped<Mutations> &
  MutatonsWidthNamespace<"page", PageStoreType["mutations"]> &
  MutatonsWidthNamespace<"editor", EditorStoreType["mutations"]> = mapMutations as any;

export const mapGettersTyped: MapGettersTyped<Getters> = mapGetters as any;

export const mapActionsTyped: MapActionsTyped<Actions> = mapActions as any;
