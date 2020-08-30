import { types, Instance } from "mobx-state-tree";
import { ActionUpdate } from 'easy-update-mst';

export const UserModel = types.model("User Model", {
  id: types.identifier,
  name: types.string,
  job: types.model({
    code: types.optional(types.string, 'Javascript'),
    exp: types.optional(types.number, 1.5),
  })
}).actions(ActionUpdate);

export const Users = types.model("User List", {
  users: types.array(UserModel),
  userSelected: types.reference(UserModel),
}).actions(ActionUpdate)

export interface IUser extends Instance<typeof UserModel> {}
export interface IUsers extends Instance<typeof Users> {}
