import './Reset.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './concepts/ecommerce_user/hooks/useUserContext';
import Home from './concepts/ecommerce_user/components/templates/Home'; //HOMEPAGE DO USUÁRIO
import Cart from './concepts/ecommerce_user/components/templates/Cart'; //CARRINHO DE COMPRAS
import AdminHome from './concepts/ecommerce_admin/components/templates/Home'; //HOMEPAGE DO ADMIN
import ManageUser from './concepts/ecommerce_admin/components/templates/ManageUser'; //GERENCIAMENTO DE USUÁRIO (CONSULTA E EXCLUSÃO)
import UserForm from './concepts/ecommerce_admin/components/templates/UserForm'; //FORMULÁRIO DE USUÁRIO (CADASTRO OU EDIÇÃO)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/home" replace/>}/>
        <Route
          path="/user/*" //ROTAS USUÁRIO
          element={
            <UserProvider>
              <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="cart" element={<Cart/>}/>
              </Routes>
            </UserProvider>
          }
        />
        <Route
          path="/admin/*" //ROTAS ADMIN
          element={
            <Routes>
              <Route path="home" element={<AdminHome/>}/>
              <Route path="manageUser" element={<ManageUser/>}/>
              <Route path="manageUser/new" element={<UserForm newForm/>}/>
              <Route path="manageUser/edit" element={<UserForm/>}/>
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
