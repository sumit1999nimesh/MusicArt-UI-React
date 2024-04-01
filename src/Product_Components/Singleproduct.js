import React, { useEffect, useState } from 'react';
import temp from '../icons/image.png';
import star from '../icons/Star.png';
import addcarticin from '../icons/addcarticin.png';
import left from '../icons/left.png';
import right from '../icons/right.png';
import '../Dashboard_Components/Dashboard.css'; 
import '../Product_Components/singleproduct.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header';
import searchicon from '../icons/search.png';
import Footer from '../footer';
import Navbar from '../Dashboard_Components/Navbar';
import backarrow from '../icons/back.png';
import MobileFooter_Nav from '../Dashboard_Components/MobileFooter_Nav';

const Singleproduct = (props) => {
   const id  = useParams();
   const navigate= useNavigate();
   const [product, setProduct] = useState({});
   const [Tproduct, setTproduct] = useState(0);
   console.log('id : '+product.name)
   const [screenSize, setScreenSize] = useState(window.innerWidth);
   const [currentSlide, setCurrentSlide] = useState(0);

   const prevSlide = () => {
     setCurrentSlide((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
   };
 
   const nextSlide = () => {
     setCurrentSlide((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
   };
 
   const handleDotClick = (index) => {
     setCurrentSlide(index);
   };
   
   const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };


  
     useEffect(()=>{
        getProductDetails();
        getTotalProductCount();
        
        window.addEventListener('resize', updateScreenSize);
        return () => {
          window.removeEventListener('resize', updateScreenSize);
        };
      },[])

      const addtoCartoneProduct=async ()=>{
          if(localStorage.getItem('token') ===null){
            navigate('/signup')
          }
        else{
        const productId=product._id;
        console.warn('data  '+ JSON.stringify(productId))
     try {
      const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/addtocart/'+productId, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        console.log('Added successful!');
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
     
      getTotalProductCount();
    } 
    }

       

      const getTotalProductCount = async () => {
        fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/getTotalProductsForUser', {
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
        console.warn('Server data:', data);
         setTproduct(data);
         localStorage.setItem('totalProduct',data);
      })
      .catch(error => {
        console.error('Server Error:', error);
      
      });
      }
      
      const backtohome = ()=>{
        navigate('/')
     }
      const buyonclickhandler = ()=>{
        if(localStorage.getItem('token') ===null){
          navigate('/signup')
        }
        else{

addtoCartoneProduct();
setTimeout(() => {
  navigate('/cart');
}, 2000);

        
}
    
      }

     const getProductDetails = async ()=>{
       fetch('https://musicart-server-078ee6927bdc.herokuapp.com/product/getProductByID/'+id.pid, {
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
 })
 .catch(error => {
   console.error('Server Error:', error);
 });
   }


    let content;
  if (screenSize < 600) {
 
    content = <div>
      <div className='search_mbol_con_uhny3' style={{zIndex:'10', background:'white'}}>
  <div style={{width:'100%', height:'80px' ,backgroundColor:'#2E0052'}}> 
    <div class="search_container_mobile">
    <input type="text" class="search-input" placeholder="Search by Product Name"/>
    <img className="search-icon" src={searchicon} alt="logo" style={{height:'30px',width:'30px'}}/>
  </div>
   </div>
   <div className='Backbtnlogo_div' style={{marginTop:'15px' , marginLeft:'5%' }}>
 <img src={backarrow} className='Backbtnlogo' alt="logo" onClick={backtohome}/>
 </div>
 <button className='order_place_btn_HY4_Mobile'  style={{marginTop:'15px' , marginLeft:'5%' , width:'90%'}} onClick={buyonclickhandler}>Buy Now</button>
     </div>
     <ToastContainer />
   <div className="top_dashboard_containerMBOL" style={{paddingTop:'200px'}}>
    <div className="mobile_dashboard_container" > 
         
    <div className="carousel-container" >
      <div className='boarder_caro'>
      <div className="carousel-slides" style={{ display: 'flex', transition: 'transform 0.5s', transform: `translateX(-${currentSlide * 100}%)` }}>
      {product.images?.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className='carosal_img_jas3'
                    />
                ))}
      
        <img src={temp} alt="Image 1" className='carosal_img_jas3'/>
        <img src={star} alt="Image 2" className='carosal_img_jas3'  />
        <img src={star} alt="Image 3"  className='carosal_img_jas3'  />
        <img src={temp} alt="Image 4" className='carosal_img_jas3' />
      </div>
      </div>
      <div className="navigation" style={{ position: 'absolute',marginTop:'15px', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
      <img src={left}  className="prev-button" onClick={prevSlide}></img>
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className={index === currentSlide ? 'dot active' : 'dot'} onClick={() => handleDotClick(index)}></span>
        ))}
        <img src={right}  className="prev-button" onClick={nextSlide}/>
      </div>
    </div>
         
    <div className='all_details_conarine_IUJJ6' style={{width:'100%' }}>
     <h1 style={{marginTop:'40px', width:'100%' , fontSize:'200%'   , whiteSpace:'nowrap' }} >{product.name}</h1>
     <div className="star" style={{display:'inline-block' ,width:'auto' }}>
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     </div>
     <p style={{display:'inline', whiteSpace:'nowrap' }}> (50 Customer reviews)</p>
     <h2 className='productdel_TXT_9' style={{lineHeight:'100%'}}>{product.title}</h2>
     <div className='productdel_TXT_9'>Price - ₹ {product.price}</div>
     <div className='productdel_TXT_9' style={{fontSize:'20px'}}>{product.color} | {product.type}</div>
     <p>About this item</p>
     <ul>
     {product.about?.map((about, index) => (
                    <li> {about} </li>
                ))}

</ul>
                <h3>Available - <span style={{fontWeight:'600'}} >In stock</span></h3>
                <h3 >Brand -<span style={{fontWeight:'600'}} > {product.company}</span></h3>
                <button className='order_place_btn_HY4_Mobile' style={{marginTop:'2%'}} onClick={addtoCartoneProduct}>Add to cart</button>
                <br></br>
                <button className='order_place_btn_HY4_Mobile' style={{marginTop:'5%' , marginBottom:'30%'}} onClick={buyonclickhandler}>Buy Now</button>
     </div>

 </div> </div>
<MobileFooter_Nav count={Tproduct}></MobileFooter_Nav>
    </div>;
  } else {

    content = <div className="top_dashboard_container">
    <Header/>
    <div className="dashboard_container">
    <ToastContainer />
     <Navbar removemen= {'true'} count={Tproduct} head={product.name}></Navbar>
     <button className='btn_Checkout_place_page' onClick={backtohome}>Back to Products</button>
     <h2 className='product_TXT_9'>{product.title}</h2>
     <div className='content_singe_pro_UJH5'>
     <div className='all_image_conarine_IUJJ6'>
     {product.images?.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className={`product-image ${index === 0 ? 'even-image' : 'odd-image'}`}
                    />
                ))}
     </div> 

     <div className='all_details_conarine_IUJJ6'>
     <h1>{product.name}</h1>
     <div className="star">
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     <img src={star} alt='star' className="starone"/>
     </div>
     <p style={{display:'inline' }}> (50 Customer reviews)</p>
     <div className='productdel_TXT_9'>Price - ₹ {product.price}</div>
     <div className='productdel_TXT_9' style={{fontSize:'20px'}}>{product.color} | {product.type}</div>
     <p>About this item</p>
     <ul>
     {product.about?.map((about, index) => (
                    <li> {about} </li>
                ))}

</ul>
                <h3>Available - <span style={{fontWeight:'600'}} >In stock</span></h3>
                <h3 >Brand -<span style={{fontWeight:'600'}} > {product.company}</span></h3>
                <button className='place_y_product_JHY2' onClick={addtoCartoneProduct}>Add to cart</button>
                <br></br>
                <button className='place_y_product_JHY2'  onClick={buyonclickhandler}>Buy Now</button>
     </div>

     </div>

     </div>
     <Footer></Footer>
    </div>
  }
  return <>{content}</>

}


export default Singleproduct;