// import { Home, Login } from '@mui/icons-material';
import { Navigate, Route, Routes } from 'react-router';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import "./assets/style.css"
import { Admin } from './pages/Admin/Admin';
import { Category } from './pages/Category/Category';
import { Order } from './pages/Order/Order';
import { Product } from './pages/Product/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin/*' element={<Admin/>}>
          <Route path='/admin/*' element={<Navigate to="category" replace={true}/>}/>
          <Route path='category' element={<Category/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='praduct' element={<Product/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
