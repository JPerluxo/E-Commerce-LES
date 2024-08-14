import { React, useState } from 'react';

import Header from '../../../../shared/components/organisms/Header';
import Footer from '../../../../shared/components/molecules/Footer';
import TableBox from '../../organisms/TableBox';
import { userApi } from '../../../../../apis/usersApi';

const UserForm = () => {
  const [users, setUsers] = useState(null);
  userApi.getUsers().then(data => { setUsers(data); });

  return (<>
    <Header/>
    {users && (<TableBox content={users}/>)}
    <Footer/>
  </>)
}

export default UserForm;