import './Reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './concepts/ecommerce_user/components/templates/Home';
import CategoryPage from './concepts/ecommerce_user/components/templates/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/home" element={<Home/>}/>
        <Route path="/user/category" element={<CategoryPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
