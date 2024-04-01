

import React, { useState, useEffect } from 'react';
import temp from '../icons/image.png';
import '../AfterCartComponents/Orderplaced.css'; 
function Cartsingleproduct(props) {
    const [product, setProduct] = useState({});
    const [productId, setproductId] = useState(props.product);
    
    const [quantit, setquantit] = useState(props.quant)
    const [selectedValue, setSelectedValue] = useState(props.quant);
   
       useEffect(()=>{
        console.warn('start use child');
        getProductDetails();
      },[])
      
      const handleChangedropdown=(event)=> {
       setquantit(event.target.value)
        setSelectedValue(event.target.value)
        updateProductQuantity(event.target.value);
      }
  
    const getProductDetails = async ()=>{
        
        fetch('https://musicart-server-078ee6927bdc.herokuapp.com/product/getProductByID/'+props.product, {
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
    setProduct(data)
    props.onValueChange( parseInt(props.quant)* parseInt(data.price));
  })
  .catch(error => {
    console.error('Server Error:', error);
  });
    }

    const updateProductQuantity = async (count)=>{
        const quantity=count;
        console.warn(quantity +' = quanti')
        fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/updateProductQuatity', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, quantity })
   
  })
  
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.warn(data +'data')
  })
  .catch(error => {
    console.error('Server Error:', error);
  });
 
    }
    console.warn('return 5' + JSON.stringify(product)); 
 return(
  <>
  {props.layoutMobile==='true'? <div> 
  <div className='pro_mobile_cart_IJU6'>
  <img src={temp} className='img_cart_p_HNY2_mobile'></img>
  <div className='pro_details_cart_mobile' >
   <p  className='txt_x_stock_UJY2_UNHw'>{product.name}</p>
   <h2 style={{fontWeight:'700' ,marginBlockStart:'0%', marginBlockEnd:'0%'}}>₹{product.price}</h2>
   <p className='txt_x_stock_UJY2_UNHw'>Colour : <span>{product.color}</span></p>
   <p className='txt_x_stock_UJY2_UNHw'>In Stock</p>
   <h2 style={{fontWeight:'500', display:'inline-block' }}>Total :</h2>
    <h2 style={{fontWeight:'500', display:'inline-block' , marginRight:'10px',float:'right'}}>₹ {parseInt(quantit) * parseInt(product.price)}</h2>
 
    </div>
    
   </div>
 
  </div>:



   <div>
    <img src={temp} className='img_cart_p_HNY2'></img>
    <div className='pro_details_cart' style={{width:'30%'}}>
   <h2>{product.name}</h2>
   <p className='txt_x_stock_UJY2'>Colour : <span>{product.color}</span></p>
   <p className='txt_x_stock_UJY2'>In Stock</p>
    </div>
    <div className='pro_details_cart'>
   <h2 style={{fontWeight:'650'}}>Price</h2>
   <h2 style={{fontWeight:'600'}}>₹{product.price}</h2>
    </div>
    <div className='pro_details_cart'>
   <h2 style={{fontWeight:'650'}}>Quantity</h2>
   <select className='quantity_drop_down_se4' value={selectedValue} onChange={handleChangedropdown}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
    </div>
    <div className='pro_details_cart'>
   <h2 style={{fontWeight:'650'}}>Total</h2>
   <h2 style={{fontWeight:'600'}}>₹ {parseInt(quantit) * parseInt(product.price)}</h2>
    </div>
   </div>
}
   </>
 );
}

export default Cartsingleproduct;