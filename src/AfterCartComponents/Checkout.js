import React, { useEffect, useState } from 'react';
import congo from '../icons/congo.png';
import '../AfterCartComponents/Orderplaced.css'; 
import '../Dashboard_Components/Dashboard.css'; 
import Footer from '../footer';
import Header from '../header';
import logo from '../icons/logo_singup_login.png';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderMobile from '../HeaderMobile';
import backarrow from '../icons/back.png';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';
const Checkout = () => {
    const redirect=  useNavigate();
  const [selectedPayment, setselectedPayment] = useState('');
  const [selectedAddress, setselectedAddress] = useState('');
  const [cartdata, setcartdata] = useState({});
  const [productDetail, setproductDetail] = useState([]);
  const [orderProduct, setorderProduct] = useState([]);
  const [tPrice, settPrice] = useState(0);
  const [errorPayment, seterrorPayment] = useState(false);
  const [errorAddress, seterrorAddress] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

 const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  const location = useLocation();
  const props = location.state;
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('token') ===null){
      console.log('cart lhali '+localStorage.getItem('token'))
         redirect('/signup')
         return;
    } 
   getData();
   window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  },[])

const getProductDetails = async (pId)=>{
        


}
const getData= async ()=>{
  let totalPricevalue =0;
  {props.products && Object.entries(props.products).map(([productId, quantity]) => (
    //getProductDetails(productId)

      fetch('https://musicart-server-078ee6927bdc.herokuapp.com/product/getProductByID/'+productId, {
      method: 'GET',
      headers: {
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
        setproductDetail(productDetail => [...productDetail,data]);
        setSelectedProduct(data);
        let currentTprice = parseInt(data.price)*parseInt(quantity)
           totalPricevalue = totalPricevalue + currentTprice ;
        settPrice(totalPricevalue)
       
        const Dorder = {
          productId: productId,
          productName: data.name,
          productColor: data.color,
          productImage: data.images[0],
          productQuantity: quantity
        };
        setorderProduct(orderProduct => [...orderProduct,Dorder]);
        console.error('Server Error:', data._Id);
      })
      .catch(error => {
      console.error('Server Error:', error);
      })
      .finally(() => {
        console.log('Fetch request completed.' + JSON.stringify(productDetail));
      })
  ))}

}
const backtocart = ()=>{
  redirect('/cart');
 }
const handleProductClick = (product) => {
   
  setSelectedProduct(product);
};

const modeofpaymenthandle = (event) => {
  setselectedPayment(event.target.value)
  seterrorPayment(false)

  console.log( selectedPayment)
}
const handleaddressChange = (event) => {
  setselectedAddress(event.target.value)
  seterrorAddress(false)
  console.log( selectedAddress)
}
const placeorderhandler= async() =>{

  if (!selectedAddress)   seterrorAddress(true)

  if (!selectedPayment)   seterrorPayment(true)

 if (!selectedAddress || !selectedPayment) {
   return console.warn('Payment and address are required');
 }

  const data = {
    name: localStorage.getItem('uname'),
    address: selectedAddress,
    paymentType: selectedPayment,
    products: orderProduct,
    grandTotal: tPrice
  };
  try {
    const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/createorder', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      localStorage.setItem('totalProduct',0)
      redirect('/orderplaced')
      return 'order created'
     
    }
    else{
      throw new Error('Failed to add order');
    }
  } catch (error) {
    console.error('Error adding order:', error);
  }

}
let content;
if (screenSize < 600) {

  content =  <><div className="top_dashboard_containerMBOL">
  <HeaderMobile></HeaderMobile>
 <div className="mobile_dashboard_container">
  <div className='Backbtnlogo_div'>
 <img src={backarrow} className='Backbtnlogo' alt="logo" onClick={backtocart}/>
 </div>

  <h2 style={{textDecoration:'underline'}}>Checkout</h2>
  <div > 

  <h3 className='input_label_checkout' style={{display:'block'}}>1. Delivery address</h3>
  <p className='input_txtoutput_checkout_mobile'>{localStorage.getItem('uname')}</p>
  <textarea onChange={handleaddressChange} className="input_txtoutput_checkout_mobile" name="postContent" rows={4} cols={20}   />
  {errorAddress && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
  <p className='line_checkout'></p>
  <h3 className='input_label_checkout' style={{display:'block'}}>2. Payment method</h3>
  <select value={selectedPayment} onChange={modeofpaymenthandle} className="input_txtoutput_checkout_mobile" >
<option disabled hidden value="">
Mode of Payment
 </option>
 <option value="Pay on Delivery">Pay on Delivery</option>
 <option value="UPI">UPI</option>
 <option value="Card">Card</option>
</select>
{errorPayment && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
  <p className='line_checkout'></p>

  <h3 className='input_label_checkout' style={{display:'block'}}>3. Review items and delivery</h3>

  <div className='input_txtoutput_checkout_IMG_MOBILE' >

  {productDetail.map((pro, index) => (
  <img src={pro.images[0]} className="p_image_checkout"  onClick={() => handleProductClick(pro)}        alt={`Product ${index + 1}`} style={{width:'62px',height:'60px'}}/>
  ))}
  {selectedProduct && (
   <>
  <div className='product_TXT_9'>{selectedProduct.name}</div>
 <div className='product_TXT_9'  style={{color:'#797979'}}>Colour : {selectedProduct.color} </div>
 <p style={{lineHeight:'5px'}}>
 <p>Estimated delivery : </p>
 <p>Monday — FREE Standard Delivery</p> </p>
 </>
  )}
  </div>
 
  <p className='line_checkout'></p>
  </div>
     <div className=''>
     <p className='TNC_YHT_trh3' style={{textAlign:'center'}} >By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
  
    <p className='line_checkout'></p>
    <div style={{ height:'100px'}}>
    <h3 >Order Summary</h3>
    <p className='YMU_UNY_8'>Items :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹{tPrice}.00</p>
     <div style={{marginTop:'50px'}}>
    <p className='YMU_UNY_8'>Delivery :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹45.00</p>
    </div>
    </div>
    <p className='line_checkout'></p>
    <p className='input_label_checkout'  >Order Total :</p> <p className='input_label_checkout' style={{float:'right'}}>₹{parseInt(tPrice)+45}.00</p>
    <button className='place_y_order_JHY2' onClick={placeorderhandler} style={{width:'100%'}}>Place your order</button>
   
  </div>
  </div>
</div>
<MobileFooter_Nav count={localStorage.getItem('totalProduct')}/>
</>


} else {

  content =  <div className="top_dashboard_container">
  <Header></Header>
 <div className="dashboard_container">
  <div> <img src={logo} className="logo_dashoard" alt="logo" />   <p className="nav_links_uUJ7R" >Home / Checkout</p> </div>

  <button className='btn_Checkout_place_page' onClick={backtocart}>Back to cart</button>
  <h2 style={{textAlign:'center',textDecoration:'underline'}}>Checkout</h2>
  <div className='checkout_container_banner'> 
  <div className='checkout_container_left_content'  >
  <h3 className='input_label_checkout'>1. Delivery address</h3>
  <p className='input_txtoutput_checkout'>{localStorage.getItem('uname')}</p>
  <textarea onChange={handleaddressChange} className="input_txtoutput_checkout" name="postContent" rows={4} cols={20}  style={{marginLeft:'31rem'}} />
  {errorAddress && <div style={{ color: 'red', fontSize:'13px' ,  marginLeft: '31rem' }}>*Required Field</div>}
  <p className='line_checkout'></p>
  <h3 className='input_label_checkout'>2. Payment method</h3>
  <select value={selectedPayment} onChange={modeofpaymenthandle} className="input_txtoutput_checkout" >
<option disabled hidden value="">
Mode of Payment
 </option>
 <option value="Pay on Delivery">Pay on Delivery</option>
 <option value="UPI">UPI</option>
 <option value="Card">Card</option>
</select>
{errorPayment && <div style={{ color: 'red', fontSize:'13px' ,  marginLeft: '31rem' }}>*Required Field</div>}
  <p className='line_checkout'></p>

  <h3 className='input_label_checkout'>3. Review items and delivery</h3>

  <div className='input_txtoutput_checkout_IMG' style={{marginTop:'-50px' ,  marginLeft: '31rem'}}>

  {productDetail.map((pro, index) => (
  <img src={pro.images[0]} className="p_image_checkout"  onClick={() => handleProductClick(pro)}        alt={`Product ${index + 1}`} style={{width:'62px',height:'60px'}}/>
  ))}
  {selectedProduct && (
   <>
  <div className='product_TXT_9'>{selectedProduct.name}</div>
 <div className='product_TXT_9' style={{color:'#797979'}}>Colour : {selectedProduct.color} </div>
 <p style={{lineHeight:'5px'}}>
 <p>Estimated delivery : </p>
 <p>Monday — FREE Standard Delivery</p> </p>
 </>
  )}
  </div>
 
  <p className='line_checkout'></p>
  <div className='placeyour_container'>
  
   <button className='place_y_order_JHY2' onClick={placeorderhandler}>Place your order</button>
   <div className='sum_une_yhy4'>
   <p className='input_label_checkout'>Order Total : ₹{parseInt(tPrice)+45}.00</p>
   <p className='TNC_YHT_trh3' style={{marginTop:'-10px'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
   </div>
  </div>
  </div>
     <div className='checkout_container_right_content'>
     <button className='place_y_order_JHY2' onClick={placeorderhandler} style={{width:'95%', marginRight:'10px', marginLeft:'10px'}}>Place your order</button>
    <p className='TNC_YHT_trh3' style={{textAlign:'center'}} >By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
    <p className='line_checkout'></p>
    <div style={{marginLeft:'10px',marginRight:'10px', height:'100px'}}>
    <h3 >Order Summary</h3>
    <p className='YMU_UNY_8'>Items :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹{tPrice}.00</p>
     <div style={{marginTop:'50px'}}>
    <p className='YMU_UNY_8'>Delivery :</p> <p className='YMU_UNY_8' style={{float:'right'}}>₹45.00</p>
    </div>
    </div>
    <p className='line_checkout'></p>
    <p className='input_label_checkout' style={{marginLeft:'10px'}} >Order Total :</p> <p className='input_label_checkout' style={{float:'right',marginRight:'10px'}}>₹{parseInt(tPrice)+45}.00</p>
  </div>
  </div>

 </div>

<Footer></Footer>
</div>

}
return <>{content}</>
}


export default Checkout;