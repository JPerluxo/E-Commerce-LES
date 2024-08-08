import './Reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './concepts/ecommerce_user/components/templates/Home'; //HOMEPAGE DO USUÁRIO
import AdminHome from './concepts/ecommerce_admin/components/templates/Home'; //HOMEPAGE DO ADMIN
import UserForm from './concepts/ecommerce_admin/components/templates/UserForm'; //GERENCIAMENTO DE USUÁRIO

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*ROTAS USUÁRIO*/}
        <Route path="/user/home" element={<Home/>}/>

        {/*ROTAS ADMIN*/}
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/admin/userForm" element={<UserForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
