import React from "react";
import { observer } from "mobx-react";
import { IUser } from "../models";

type TProp = {
  user: IUser;
};

export const UserEntry: React.FC<TProp> = observer(({ user }) => {
  const { name, job, id, setMobxState, setMobxDeepState } = user;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxState({ name: e.target.value });
  };

  const onChangejobLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxDeepState('job.code', e.target.value)
  };

  const onChangeJobExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobxDeepState('job.exp', Number(e.target.value))
  };

  return (
    <div>
      id: {id}
      <br />
      Name: <input value={name} onChange={onChangeName} />
      <br />
      Job:
      <div style={{  margin: "5px 3px" ,paddingLeft: '10px', borderLeft: '2px solid #ccc' }}>
        Language: <input value={job.code} onChange={onChangejobLang} />
        <br />
        Exp: <input value={job.exp} onChange={onChangeJobExp} type="number" />
      </div>
    </div>
  );
});
