import './Reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './concepts/ecommerce_user/components/templates/Home'; //HOMEPAGE DO USUÁRIO
import AdminHome from './concepts/ecommerce_admin/components/templates/Home'; //HOMEPAGE DO ADMIN
import ManageUser from './concepts/ecommerce_admin/components/templates/ManageUser'; //GERENCIAMENTO DE USUÁRIO (CONSULTA E EXCLUSÃO)
import UserForm from './concepts/ecommerce_admin/components/templates/UserForm'; //FORMULÁRIO DE USUÁRIO (CADASTRO OU EDIÇÃO)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*ROTAS USUÁRIO*/}
        <Route path="/user/home" element={<Home/>}/>

        {/*ROTAS ADMIN*/}
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/admin/manageUser" element={<ManageUser/>}/>
        <Route path="/admin/manageUser/new" element={<UserForm newForm/>}/>
        <Route path="/admin/manageUser/edit" element={<UserForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
