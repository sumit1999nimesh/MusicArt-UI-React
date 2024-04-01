import React, { useEffect, useState } from 'react';
import congo from '../icons/congo.png';
import '../AfterCartComponents/Orderplaced.css'; 
import '../Dashboard_Components/Dashboard.css'; 
import Footer from '../footer';
import Header from '../header';
import logo from '../icons/logo_singup_login.png';
import backarrow from '../icons/back.png';
import invheadI from '../icons/inv.png';
import invoicelogo from '../icons/invoicel.png';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderMobile from '../HeaderMobile';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';

const Myinvoice  = () => {
    const redirect=  useNavigate();
   const [alldData, setallData] = useState([{}])
   const [screenSize, setScreenSize] = useState(window.innerWidth);

   const updateScreenSize = () => {
      setScreenSize(window.innerWidth);
    };

  useEffect(()=>{
    if(localStorage.getItem('token') ===null){
      console.log('cart lhali')
         redirect('/signup')
         
    }
   getData();
   window.addEventListener('resize', updateScreenSize);
   return () => {
     window.removeEventListener('resize', updateScreenSize);
   };
  },[])

const getData= async ()=>{
    const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/getAllOrders', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
      })
      .then(data => {
        setallData(data);
        console.error('Server log:', data);

        })
      .catch(error => {
      console.error('Server Error:', error);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      })

}

const backtohome =(order)=>{
    redirect('/');
}
const handlesingleinvoice =(order)=>{
    console.log("Invoice ID:", order._id);
    redirect('/myinvoice/invoice' , {state : order})
}


let content;
  if (screenSize < 600) {
 
    content = 
    <>
    <div className="top_dashboard_containerMBOL" >
    <HeaderMobile/>
   <div className="mobile_dashboard_container">
    <div className='Backbtnlogo_div'>
 <img src={backarrow} className='Backbtnlogo' alt="logo" onClick={backtohome}/>
 </div>
    <h2 style={{textAlign:'center'}}>  <img src={invheadI}  alt="logo" /> My Invoices</h2>
    <div> 
    {alldData.map(order => (  
        <div style={{width:'100%' ,display:'inline-block'}}>
       <div className='invoice_small_ne45_uwnr'>
           <img src={invoicelogo} style={{width:'60px'}} className="invoice_tile_image" alt="logo" />
    < div className='div_for_tile_text_mobile'>
      <p className="invoice_tile_txt" > {order.name}</p>
      <br></br>
     <p className="invoice_tile_txt" style={{lineHeight:'15px' , fontSize:'18px'}} >{order.address}</p>
     </div>
 
       </div>
           <button className="invoice_tile_btn_mobile" onClick={() =>handlesingleinvoice(order)}>Invoice</button>
           <p className='line_checkout'></p>
  </div>
  
   ))}
    </div>

   </div>

</div>
 <MobileFooter_Nav count={localStorage.getItem('totalProduct')}></MobileFooter_Nav>
</>
  } else {
    content = <div className="top_dashboard_container">
    <Header></Header>
   <div className="dashboard_container">
    <div> <img src={logo} className="logo_dashoard" alt="logo" /> <p className="nav_links_uUJ7R" >Home / Checkout</p> </div>

    <button className='btn_Checkout_place_page' onClick={backtohome}>Back to Home</button>
    <h2 style={{textAlign:'center'}}>My Invoices</h2>
    <div> 
    {alldData.map(order => (
       <div className='invoice_small_ne45'>
           <img src={invoicelogo} className="invoice_tile_image" alt="logo" />
    < div className='div_for_tile_text'>
      <p className="invoice_tile_txt" > {order.name}</p>
      <br></br>
     <p className="invoice_tile_txt">{order.address}</p>
     </div>
     <button className="invoice_tile_btn" onClick={() =>handlesingleinvoice(order)}>Invoice</button>
    <p className='line_checkout'></p>
       </div>

   ))}
    </div>

   </div>
 
  <Footer></Footer>
</div>

}
  return <>{content}</>
};


export default Myinvoice;