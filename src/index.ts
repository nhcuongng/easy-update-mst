import { getSnapshot, SnapshotIn, applySnapshot } from "mobx-state-tree";

/**
 * use for reset store, use in root model
 *
 * @example
 * ```ts
 * const RootModel = types
    .model({
      userStore: Users,
    })
    .actions(ActionReset);
 * ```
 * @detail see in folder ```example```
 * @param self
 */
export const ActionReset = <T>(self: T) => ({
  afterCreate() {
    localStorage.setItem("dataRoot", JSON.stringify(getSnapshot(self)));
  },
  /**
   * Reset lai gia tri luu trong store
   * @param parent ten store
   * @param ignores cac key se khong bi reset trong store
   * @example
   * ```ts
   *  reset("userList", ["dev"])
   * ```
   */
  reset<K extends keyof T>(parent: K, ignores?: (keyof T[K])[]) {
    const data = localStorage.getItem("dataRoot");
    if (data !== null) {
      const jsonData = JSON.parse(data);
      if (ignores?.length) {
        Object.keys(self[parent]).forEach((_key) => {
          if (ignores.some((_keyIgnor) => _keyIgnor !== _key)) {
            self[parent][_key as keyof T[K]] = jsonData[parent][_key];
          }
        });
      } else {
        self[parent] = jsonData[parent];
      }
    }
  }
});

/**
 * Can use in any models
 *
 * Add ```setMobxState``` and ```setMobxDeepState``` to instance of model
 *
 * ```ts
 * export const Users = types.model("User List", {
    users: types.array(UserModel),
    userSelected: types.reference(UserModel),
   }).actions(ActionUpdate)
 * ```
 *
 * @param self
 */
export const ActionUpdate = <T>(self: T) => ({
  updateByDung: (
    data: Partial<{ [key in keyof typeof self]: typeof self[key] }>
  ) => {
    Object.assign(self, data);
  },
  /**
   * Update state for store (```shallow``` update)
   * @param state new state
   *
   * @example
   * setMobxState({ userSelected: "13" })
   * setMobxState({
      users: [],
      userSelected: "1"
    });
   */
  setMobxState<K extends keyof T>(
    state: Pick<SnapshotIn<T>, K> | SnapshotIn<T> | null
  ) {
    applySnapshot(self, { ...self, ...state });
  },
  /**
   * Update state fro store (```Deep``` update)
   * @param pathOrigin path to property need update
   * @param value new value
   * @example
   *
   * ```ts
   *  setMobxDeepState("dev.job.lang", "golang")
   * ```
   */
  setMobxDeepState(pathOrigin: string, value: any) {
    const path: string[] = pathOrigin.split(".");
    let level = 0;

    path.reduce((a: any, b: any) => {
      level += 1;

      if (
        typeof a[b] === "undefined" &&
        level !== path.length
      ) {
        a[b] = {};
        return a[b];
      }

      if (level === path.length) {
        a[b] = value;
        return value;
      }
      return a[b];
    }, self);
  }
});
