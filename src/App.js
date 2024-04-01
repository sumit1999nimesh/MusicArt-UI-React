import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Signup from './Login_Signup_Components/Signup';
import Login from './Login_Signup_Components/Login';
import DashBoard from './Dashboard_Components/Dashboard';
import Orderplaced from './AfterCartComponents/Orderplaced';
import Checkout from './AfterCartComponents/Checkout';
import Singleproduct from './Product_Components/Singleproduct';
import Cart from './AfterCartComponents/Cart';
import Myinvoice from './AfterCartComponents/Myinvoices';
import Invoice from './AfterCartComponents/Invoice';


function App() {


  return (
    <div className="App">
    <BrowserRouter>
   <Routes>  
   <Route path="/" element={<DashBoard/>}/> 
   <Route path="/signup" element={<Signup/>}/> 
   <Route path="/login" element={<Login/>}/> 
   <Route path="/cart" element={<Cart/>} />
  <Route path="/product/:pid" element={<Singleproduct/>} />
  <Route path="/orderplaced" element={<Orderplaced/>}/> 
  <Route path="/Checkout" element={<Checkout/>}/> 
  <Route path="/public/:id" element={<Login/>} />
  <Route path="/myinvoice" element={<Myinvoice/>} />
  <Route path="/myinvoice/invoice" element={<Invoice/>} />
       
  

    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
