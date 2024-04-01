import React, { useState } from 'react';
import temp from '../icons/image.png';
import addcarticin from '../icons/addcarticin.png';
import '../Dashboard_Components/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const ProductCard = (props) => {
  const navigate  = useNavigate();
const [pId,setpId]=useState('');
  console.log("layout "+localStorage.getItem('token'))


    const addtoCart=async (event)=>{
      event.stopPropagation();
        console.log('adding to cart'+props.product._id)
        setpId(props.product._id);
        const productId=props.product._id;
        console.warn('data  '+ JSON.stringify(productId))
     try {
      const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/addtocart/'+productId, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    
      if (response.ok) {
    props.fetchCount();
        console.log('Signup successful!');
      }
      else{
        if (response.status === 406) {
          toast.error('Maximum 8 quantity is allowed for a product');
        } 
 
      }

    }
      catch(error){
    
        console.error('Server Error:', error);
      }
    }

    const printprodeuctid=()=>{
      console.warn('ID '+props.product._id) 
      navigate('/product/' +props.product._id);
    }
    const p_style_pro={
      width: props.layout ? '22%' : '100%'  ,
      display: props.layout ? 'block' : 'inline'
    }
let content;
    if(props.screen==='mobile'){
      content =   
      <div className="singleproduct" onClick={printprodeuctid} style={{width:'45%' , borderRadius:'10px'  , border: '3px solid #E1E1E1'}}>
             <ToastContainer />
      <div className="image-container_MBOL">
      <img src={props.product.images[0]} style={{width:'100%',   height:'150px',backgroundColor:'#D4E5FF' ,alignContent:'center'} } alt='headphone' />
   {localStorage.getItem('token')===null ? <></>:
   <button className="button_add_cart" onClick={addtoCart}>  <img src={addcarticin} alt="Button" style={{width:'25px',height: '25px'}} /></button> 
   }
 </div>
   <div className="singleproduct-text-bodyMBOL">
     <div className='product_TXT_9MVOL'>{props.product.name}</div>
     <div className='product_TXT_9MVOL'>Price - ₹ {props.product.price}</div>
     <div className='product_TXT_9MVOL'style={{fontSize:'15px'}}>{props.product.color} | {props.product.type}</div>
   </div>
 </div> 
    }
    else{
      content= 
      <div style={p_style_pro}>
    <ToastContainer />
        {props.layout===true ? 
        
          <div className="singleproduct" onClick={printprodeuctid}>
          <div style={{background:'#D4E5FF'}}> 
          <div style={{marginLeft:'15%' ,marginRight:'22%'}}>
                     <div className="image-container">
          <img src={props.product.images[0]} style={{width:'200px' , height:'200px' ,paddingTop:'10%',paddingBottom:'10%',backgroundColor:'#D4E5FF' ,alignContent:'center'} } alt='headphone' />
          {localStorage.getItem('token')===null ? <></>: <button className="button_add_cart" onClick={addtoCart}>  <img src={addcarticin} alt="Button" style={{width:'25px',height: '25px'}} /></button>
      }  </div>
      </div>
      </div>
       <div className="singleproduct-text-body">
         <div className='product_TXT_9'>{props.product.name}</div>
         <div className='product_TXT_9'>Price - ₹ {props.product.price}</div>
         <div className='product_TXT_9'>{props.product.color} | {props.product.type}</div>
       </div>
     </div> 
     :
     
          <div className="singleproduct" style={{height:'auto',display:'inline-block'}}>
            
          <div className="image-container">
          <img src={props.product.images[0]} style={{width:'200px' , height:'200px',backgroundColor:'#D4E5FF' ,alignContent:'center'} } alt='headphone' />
          {localStorage.getItem('token')===null ? <></>: <button className="button_add_cart">  <img src={addcarticin} alt="Button" style={{width:'25px',height: '25px'}} onClick={addtoCart}/></button>
     }
      </div>
       <div className="singleproduct-text-body-extend"   style={{display:'inline-block',verticalAlign: 'top' ,width:'80%'}} >
         <div className='product_TXT_10'>{props.product.name}</div>
         <br></br>
         <div className='product_TXT_10'>Price - ₹ {props.product.price}</div>
         <br></br>
         <div className='product_TXT_10'>{props.product.color} | {props.product.type}</div> 
         <br></br>
         <div className='product_TXT_10'>{props.product.title}</div> 
         <button className='btn_details_grid_1'  onClick={printprodeuctid}>Details</button>
       </div>
    
     </div>
     
     }
    </div>
    }
    return <>{content}</>
};


export default ProductCard;
