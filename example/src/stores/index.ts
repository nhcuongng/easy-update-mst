import { createContext, useContext } from "react";
import { types, Instance } from "mobx-state-tree";
import { Users } from '../models';
import { users } from "../../data";
import { ActionReset } from "easy-update-mst";

const RootModel = types
  .model({
    userStore: Users,
  })
  .actions(ActionReset);

/**
 * ```rootStore``` has data from all stores
 */
export const rootStore = RootModel.create(
  // Create your store with initial data
  {
    userStore: {
      users,
      userSelected: '06',
    },
  }
);

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;

/**
 * ```useMst``` return your root store
 */
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
