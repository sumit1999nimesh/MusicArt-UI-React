import React, { useState, useEffect } from 'react';
import Navbar from '../Dashboard_Components/Navbar';
import Header from '../header';
import searchicon from '../icons/search.png';
import Footer from '../footer';
import cartlogo from '../icons/cartlogo.png';
import Cartsingleproduct from './Cartsingleproduct';
import '../AfterCartComponents/Orderplaced.css'; 
import backarrow from '../icons/back.png';
import '../Dashboard_Components/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';
function Cart() {
  const redirect = useNavigate();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [cartdata, setcartdata] = useState({});
  const [childValue, setChildValue] = useState(0);
  console.warn('start 1');


  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  const handleChildValue = (value) => {
    
    setChildValue(childValue => childValue + value);
    console.log(childValue + 'value')
  }
  useEffect(() => {
    if(localStorage.getItem('token') ===null){
      console.log('cart lhali')
         redirect('/signup')
         
    }
    console.warn('start use cart ');
    getCartProduct();
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  const backtohome = ()=>{
    redirect('/')
 }
 const placeorderhandler=()=>{
 console.log(JSON.stringify(cartdata) + 'cart data');

  redirect('/checkout' , {state :  { cartdata, childValue }})
 }
  const getCartProduct = async ()=>{
    console.warn('start 2');
   fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/getcartforuser', {
method: 'GET',
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
}
})
.then(response => {
if (!response.ok) {
 throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
setcartdata(data)

})
.catch(error => {
console.error('Server Error:', error);
});
}

console.warn('cart data ' +JSON.stringify(cartdata))
  let content;
  if (screenSize < 600) {    content =  <>
   <div className='search_mbol_con_uhny3'>
    <div style={{width:'100%', height:'80px' ,backgroundColor:'#2E0052'}}> 
    <div class="search_container_mobile">
    <input type="text" class="search-input" placeholder="Search by Product Name"/>
    <img className="search-icon" src={searchicon} alt="logo" style={{height:'30px',width:'30px'}}/>
  </div>
</div>
   </div>
<div className="top_dashboard_containerMBOL" style={{paddingTop:'88px'}}>
    <div className="mobile_dashboard_container" > 
    <div className='Backbtnlogo_div'>
 <img src={backarrow} className='Backbtnlogo' alt="logo" onClick={backtohome}/>
 </div>
          <div className='product_moblie_yht7'> 
          {cartdata!==null && 
          cartdata.products
           && Object.entries(cartdata.products).map(([productId, quantity]) => ( 
          <Cartsingleproduct layoutMobile='true' onValueChange={handleChildValue} product={productId} quant={quantity}/> ))}
          </div>
       
            {cartdata!==null ?
            <div className=''>
            <h2 style={{fontWeight:'600', display:'inline-block'}} >Total Amount</h2>

            <h2 style={{fontWeight:'600',float:'right'}}>₹ {parseInt(childValue)+45}</h2>
          
              <button className='order_place_btn_HY4_Mobile' onClick={placeorderhandler}>PLACE ORDER</button>
                </div>
                : <></>}
        
   </div>    </div>  
   <MobileFooter_Nav count={localStorage.getItem('totalProduct')}></MobileFooter_Nav>
   </>
  } else {

    content = 
  <div className="top_dashboard_container">
    <Header/>
    <div className="dashboard_container">
    
     <Navbar removemen= {'true'} head='View Cart'></Navbar>
     <button className='btn_Checkout_place_page' onClick={backtohome}>Back to Products</button>
     <h2 style={{textAlign:'center'}}>   <img src={cartlogo} alt='star' style={{width:'40px'}}/> My Cart</h2>

     <div className='checkout_container_banner'> 
          <div className='checkout_container_left_DTGFt'  >
          <div className='scrollable_product_item'> 
          {cartdata!==null && 
          cartdata.products
           && Object.entries(cartdata.products).map(([productId, quantity]) => (
          <Cartsingleproduct layoutMobile='false' onValueChange={handleChildValue} product={productId} quant={quantity}/> ))}
          </div>
            </div>
            {cartdata!==null ?
            <div className='checkout_container_right_content' style={{borderStyle:'dotted'}}>
              <h2 style={{fontWeight:'650'}} >PRICE DETAILS</h2>
            <div className='pro_details_cart'style={{float:'left'}}>
            <h2 style={{fontWeight:'600'}} >Total MRP</h2>
            <h2 style={{fontWeight:'600'}} >Discount on MRP</h2>
            <h2 style={{fontWeight:'600'}} >Convenience Fee</h2>
            <h2 style={{marginTop:'20px'}}>Total Amount</h2>
            </div>
            <div className='pro_details_cart'style={{float:'right'}}>
            <h2 style={{fontWeight:'600'}} >₹{childValue}</h2>
            <h2 style={{fontWeight:'600'}} >₹0</h2>
            <h2 style={{fontWeight:'600'}} >₹45</h2>
            <h2 style={{marginTop:'20px'}}>₹ {parseInt(childValue)+45}</h2>
              </div>    
              <button className='order_place_btn_HY4' onClick={placeorderhandler}>PLACE ORDER</button>
                </div>
                : <></>}
         </div>
   </div>    <Footer/></div>
    
  }

  return <div>{content}</div>;
}

export default Cart;
