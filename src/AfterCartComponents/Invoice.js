import React, { useEffect, useState } from 'react';
import congo from '../icons/congo.png';
import '../AfterCartComponents/Orderplaced.css'; 
import '../Dashboard_Components/Dashboard.css'; 
import Footer from '../footer';
import Header from '../header';
import logo from '../icons/logo_singup_login.png';
import backarrow from '../icons/back.png';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderMobile from '../HeaderMobile';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';

const Invoice  = () => {
    const redirect=  useNavigate();
    
    const location = useLocation();
    const props = location.state;
    const [selectedProduct, setSelectedProduct] = useState(props.products[0]);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
        const navigate=  useNavigate();
    const updateScreenSize = () => {
       setScreenSize(window.innerWidth);
     };
    
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

  const  backtocart =(order)=>{
    redirect('/cart');
}
  console.log('pp '+ JSON.stringify(props));
const handleProductClick = (product) => {

  setSelectedProduct(product);
};
let content;
  if (screenSize < 600) {
  
    content = <><div className="top_dashboard_containerMBOL">
    <HeaderMobile></HeaderMobile>
   <div className="mobile_dashboard_container">
    <div className='Backbtnlogo_div'>
   <img src={backarrow} className='Backbtnlogo' alt="logo" onClick={backtocart}/>
   </div>
  
    <h2 style={{textDecoration:'underline'}}>Invoice</h2>
    <div > 
  
    <h3 className='input_label_checkout' style={{display:'block'}}>1. Delivery address</h3>
    <p className='input_txtoutput_checkout_mobile'>{props.name}</p>
    <p className="input_txtoutput_checkout_mobile" name="postContent" rows={4} cols={20}   >{props.address}</p>
    
    <p className='line_checkout'></p>
    <h3 className='input_label_checkout' style={{display:'block'}}>2. Payment method</h3>
   <p className='input_txtoutput_checkout_mobile'> {props.paymentType}</p>
   
    <p className='line_checkout'></p>
  
    <h3 className='input_label_checkout' style={{display:'block'}}>3. Review items and delivery</h3>
  
    <div className='input_txtoutput_checkout_IMG_MOBILE input_txtoutput_checkout_mobile' >
  
    {props.products.map((pro, index) => (
    <img src={pro.productImage} className="p_image_checkout"  onClick={() => handleProductClick(pro)}        alt={`Product ${index + 1}`} style={{width:'62px',height:'60px'}}/>
    ))}
    {selectedProduct && (
     <>
    <div className='product_TXT_9'>{selectedProduct.productName}</div>
   <div className='product_TXT_9'  style={{color:'#797979'}}>Colour : {selectedProduct.productColor} </div>
   <p style={{lineHeight:'5px',color:'black'}}>
 <p>Estimated delivery : </p>
 <p>Monday — FREE Standard Delivery</p> </p>
   </>
    )}
    </div>
   
    <p className='line_checkout'></p>
    </div>
       <div className=''>
      <div style={{ height:'100px'}}>
      <h3 >Order Summary</h3>
      <p className='YMU_UNY_8'>Items :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹{props.grandTotal}.00</p>
       <div style={{marginTop:'50px'}}>
      <p className='YMU_UNY_8'>Delivery :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹45.00</p>
      </div>
      </div>
      <p className='line_checkout'></p>
      <p className='input_label_checkout'  >Order Total :</p> <p className='input_label_checkout' style={{float:'right'}}>₹{parseInt(props.grandTotal)+parseInt(45)}.00</p>
    </div>
    </div>
  </div>
  <MobileFooter_Nav count={localStorage.getItem('totalProduct')}/>
  </>

  } else {

    content =  <div className="top_dashboard_container">
    <Header></Header>
   <div className="dashboard_container">
    <div> <img src={logo} className="logo_dashoard" alt="logo" />  <p className="nav_links_uUJ7R" >Home / Checkout</p> </div>

    <button className='btn_Checkout_place_page' onClick={backtocart}>Back to cart</button>
    <h2 style={{textAlign:'center',textDecoration:'underline'}}>Invoice</h2>
    <div className='checkout_container_banner'> 
    <div className='checkout_container_left_content'  >
    <h3 className='input_label_checkout'>1. Delivery address</h3>
    <p className='input_txtoutput_checkout'>{props.name}</p>
    <p  className="input_txtoutput_checkout"  rows={4} cols={20} style={{marginLeft:'31rem', wordWrap:'break-word'}} >{props.address}</p>
    
    <p className='line_checkout'></p>
    <h3 className='input_label_checkout'>2. Payment method</h3>
    <p className='input_txtoutput_checkout' style={{borderWidth:'2px' , borderStyle:'solid' , borderRadius:'5px'}}>{props.paymentType}</p>

    <p className='line_checkout'></p>

    <h3 className='input_label_checkout'>3. Review items and delivery</h3>
  
    <div className='input_txtoutput_checkout' style={{marginTop:'-50px' ,  marginLeft: '31rem'}}>
    {props.products.map((pro, index) => (
    <img src={pro.productImage} className="p_image_checkout"  onClick={() => handleProductClick(pro)}        alt={`Product ${index + 1}`} style={{width:'62px',height:'60px'}}/>
    ))}
    {selectedProduct && (
     <>
    <div className='product_TXT_9'>{selectedProduct.productName}</div>
   <div className='product_TXT_9'>{selectedProduct.productColor} </div>

   <p style={{lineHeight:'25px',color:'black'}}>
 <p>Estimated delivery : </p>
 <p>Monday — FREE Standard Delivery</p> </p>
   </>
    )}

    </div>
     <p className='line_checkout'></p>

    </div>
       <div className='checkout_container_right_content' style={{height:'220px'}}>
      
      <div style={{marginLeft:'10px',marginRight:'10px', height:'100px'}}>
      <h3 >Order Summary</h3>
      <p className='YMU_UNY_8'>Items :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹{props.grandTotal}.00</p>
       <div style={{marginTop:'50px'}}>
      <p className='YMU_UNY_8'>Delivery :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹45.00</p>
      </div>
      </div>
      <p className='line_checkout'></p>
      <p className='input_label_checkout' style={{marginLeft:'10px'}} >Order Total :</p> <p className='input_label_checkout' style={{float:'right',marginRight:'10px'}}>₹{parseInt(props.grandTotal)+parseInt(45)}.00</p>
    </div>
    </div>

   </div>
 
  <Footer></Footer>
</div>


  }
  return <>{content}</>

}


export default Invoice;