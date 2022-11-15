import React, { useState } from 'react';
import { List } from './Components/List/List';

import './App.scss';

import dataJson from './data.json';
import { Form } from './Components/Form/Form';
import { DataType } from './Types/DataType';
import { CurrentUserType } from './Types/CurrentUserType';

export const App = () => {
  const [data, setData] = useState<DataType[]>(dataJson.comments);
  const [user, setUser] = useState<CurrentUserType>(dataJson.currentUser);

  return (
    <div className="containter">
      <List data={data} setData={setData} user={user} />
      <Form data={data} setData={setData} user={user} buttonName={'send'} editStatus={null} editMessage={''}/>
    </div>
  );
};
