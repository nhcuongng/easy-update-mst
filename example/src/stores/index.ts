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

export const rootStore = RootModel.create(
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
 * useMst se tra ve store
 *
 * Chi dung trong function component
 */
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
