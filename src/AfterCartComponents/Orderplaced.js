import React, { useEffect, useState } from 'react';
import congo from '../icons/congo.png';
import '../AfterCartComponents/Orderplaced.css'; 
import '../Dashboard_Components/Dashboard.css'; 
import Footer from '../footer';
import Header from '../header';
import logo from '../icons/logo_singup_login.png';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../HeaderMobile';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';

const Orderplaced = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  console.warn('start 1');
  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
     const redirect= useNavigate();
  
  const backtohome = () => { 
    redirect('/');
  }
  useEffect(() => {
    if(localStorage.getItem('token') ===null){
      console.log('cart lhali '+localStorage.getItem('token'))
         redirect('/signup')
         return;
    } 
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
   
  }, []);
    
  let content;

  if (screenSize < 768) {

    content =<div>
      <HeaderMobile/>
      <div className='order_container_banner'> 
     <div className='order_container_banner_child' style={{width:'90%'}} >
        <div className='order_con_content'>
     <img src={congo} className="congo_icon" alt="logo" />
     <h2>Order is placed successfully!</h2>

     <p className='order_txt'>You will be receiving a confirmation email with order details</p>
     <button className='btn_order_place_page'  style={{width:'90%'}} onClick={backtohome}>Go back to Home page</button>
     </div>
     </div>
     </div>
     <MobileFooter_Nav count='0'></MobileFooter_Nav>
    </div>;
  } else {
    console.log('size')
    content =  <div className="top_order_container">

    <div className="dashboard_container">
     <div> <img src={logo} className="logo_Orderplaced" alt="logo" /></div>
     <div className='order_container_banner'> 
     <div className='order_container_banner_child'  >
        <div className='order_con_content'>
     <img src={congo} className="congo_icon" alt="logo" />
     <h2>Order is placed successfully!</h2>
  
     <p className='order_txt'>You will be receiving a confirmation email with order details</p>
     <button className='btn_order_place_page' onClick={backtohome}>Go back to Home page</button>
     </div>
     </div>
     </div>
 
    </div>
  
   <Footer/>
   </div>
   
  }
  return <>{content}</>;

}


export default Orderplaced;