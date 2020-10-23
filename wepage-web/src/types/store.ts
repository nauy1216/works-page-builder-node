import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { MapStateTyped, MapMutationsTyped, MapGettersTyped, MapActionsTyped } from "./vuex";
import { State, Mutations, Getters, Actions } from "../store";

export const mapStateTyped: MapStateTyped<State> = mapState as any;

export const mapMutationsTyped: MapMutationsTyped<Mutations> = mapMutations as any;

export const mapGettersTyped: MapGettersTyped<Getters> = mapGetters as any;

export const mapActionsTyped: MapActionsTyped<Actions> = mapActions as any;
