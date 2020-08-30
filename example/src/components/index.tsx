import React from "react";
import { observer } from "mobx-react";
import { UserView } from './view';
import { UserEntry } from './edit';
import { useMst } from "../stores";

export const UserList: React.FC = observer(() => {
  const { userStore, reset } = useMst();
  const { setMobxState, userSelected, users } = userStore;

  const onChangeUserSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMobxState({ userSelected: e.target.value });
  }

  return (
    <>
      <h2>
        User List
      </h2>
      <div>
        {users.map((user, index) => (
          <>
            <div key={index}>
              <UserView user={user} />
            </div>
            <br />
          </>
        ))}
      </div>
      <hr />
      <div>
        <h2>Edit user use <i>setMobxState, setMobxDeepState, reset</i></h2>
        <label>Choose your user you want edit:</label>
        <hr />
        <select onChange={onChangeUserSelected}>
          {users.map(({ name, id }, index) => (
            <option key={index} value={id}>{name}</option>
          ))}
        </select>
        <hr />
        <UserEntry user={userSelected} />
        <button onClick={() => reset('userStore')}>Reset</button>
      </div>
    </>
  );
});
