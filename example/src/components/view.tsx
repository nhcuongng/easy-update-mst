import React from 'react';
import { observer } from 'mobx-react'
import { IUser } from "../models";

type TProp = {
  user: IUser
};

export const UserView: React.FC<TProp> = observer(({ user }) => (
  <div>
    User <b>{user.name}</b> was code {user.job.code} in {user.job.exp} years!!!
  </div>
));
