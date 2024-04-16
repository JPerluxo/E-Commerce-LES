import './Reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './concepts/ecommerce_user/components/templates/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
