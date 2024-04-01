
import React, { useEffect, useRef } from "react";
import { useState } from "react";

import searchicon from '../icons/search.png';
import bot from '../icons/bot.png';
import grid_1 from '../icons/grid_1.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import grid_2 from '../icons/grid_2.png';
import bannerimg from '../icons/banner.png';
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

import '../Dashboard_Components/Dashboard.css'; 
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import MobileFooter_Nav from "./MobileFooter_Nav";

function DashBoard() {
  const [layoutValue, setlayoutValue] = useState(true);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [selectedFeebackType, setselectedFeebackType] = useState('');
  const [selectedFeebackText, setselectedFeebackText] = useState('');
  const optionsRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedValueSort, setselectedValueSort] = useState('');
  let searchTXTValue='', filtertype='' , filtercompany='', filtercolor='', fillerrange='', sorttype='';
  const [searchedValue, setsearchedValue] = useState('');
  const [selectedValueType, setSelectedValueType] = useState('');
  const [selectedValueCompany, setSelectedValueCompany] = useState('');
  const [selectedValuePrange, setSelectedValuePrange] = useState('');
  const [selectedValueColor, setSelectedValueColor] = useState('');
  const [products, setProducts] = useState([]);
  const [Tproduct, setTproduct] = useState(0);
  
  const [errorFeedbacktype, seterrorFeedbacktype] = useState(false);
  const [errorFeedbacktext, seterrorFeedbacktext] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const updateScreenSize = () => {
     setScreenSize(window.innerWidth);
   };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  

  const handleOpenModalFeeback = () => {
    setIsOpenFeedback(!isOpenFeedback);
  };

  const handleCloseModalFeeback = () => {
    setIsOpenFeedback(false);
  };

  const handleDropFeedback= (event) => {
    setselectedFeebackType(event.target.value);
    seterrorFeedbacktype(false)
  };

  const handleTextareaFeedback= (event) => {
    setselectedFeebackText(event.target.value);
    seterrorFeedbacktext(false)
  };

  const handleSubmitFeedBack= async() => {
    if (!selectedFeebackType)   seterrorFeedbacktype(true)

    if (!selectedFeebackText)   seterrorFeedbacktext(true)

   if (!selectedFeebackType || !selectedFeebackText) {
     return console.warn('type and text are required');
   }
    handleCloseModalFeeback ();

    try {
      const data = {
        feedbackText:selectedFeebackText,
        feedbackType:selectedFeebackType
      };
      const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
   
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    finally{
      setselectedFeebackType('');
      setselectedFeebackText('')
    }
   
  };

  const changeLayoutgrid=()=>{
    setlayoutValue(true)
    let element = document.getElementById('grid_1')
     element.style.background='#2E0052'
     let element2 = document.getElementById('grid_2')
     element2.style.background='white'
  }
  const changeLayoutExpend=()=>{
    setlayoutValue(false)
    let element = document.getElementById('grid_1')
    element.style.background='white'
    let element2 = document.getElementById('grid_2')
    element2.style.background='#2E0052'
  }
  
  const handleChangeType = (event) => {
    filtertype=event.target.value
    setSelectedValueType(filtertype);
    searchTXTValue=searchedValue;
    filtercompany=selectedValueCompany
    filtercolor=selectedValueColor
    fillerrange=selectedValuePrange
    sorttype=selectedValueSort
   
    getAllProducts();
   
  };

  
  


  const handleChange_company= (event) => {

    setSelectedValueCompany(event.target.value);
    searchTXTValue=searchedValue;
    filtertype=selectedValueType
    filtercompany=event.target.value
    filtercolor=selectedValueColor
    fillerrange=selectedValuePrange
    sorttype=selectedValueSort
    getAllProducts();
  };
  const handleChange_color = (event) => {
    setSelectedValueColor(event.target.value);
    searchTXTValue=searchedValue;
    filtertype=selectedValueType
    filtercompany=selectedValueCompany
    filtercolor=event.target.value
    fillerrange=selectedValuePrange
    sorttype=selectedValueSort
    getAllProducts();
  };

  const handleChange_P_range = (event) => {
    setSelectedValuePrange(event.target.value);
    searchTXTValue=searchedValue;
    filtertype=selectedValueType
    filtercompany=selectedValueCompany
    filtercolor=selectedValueColor
    fillerrange=event.target.value
    sorttype=selectedValueSort
    getAllProducts();
 
  };

  const handleChange_Sort = (event) => {
    setselectedValueSort(event.target.value);
    searchTXTValue=searchedValue;
    filtertype=selectedValueType
    filtercompany=selectedValueCompany
    filtercolor=selectedValueColor
    fillerrange=selectedValuePrange
    sorttype=event.target.value
    getAllProducts();
  };

    useEffect(()=>{
      getAllProducts();
      getTotalProductCount();
      window.addEventListener('resize', updateScreenSize);
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };

    },[])
    const handleClearLocalStorage = () => {
      localStorage.clear(); 
   
        window.location.reload();
  
    };
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
    };

    const urlmaker =()=>{
      console.warn(filtertype+' urlaked '+searchTXTValue+' '+filtercompany+' '+filtercolor+' '+fillerrange)
      let url = "https://musicart-server-078ee6927bdc.herokuapp.com/product/search?";
      if(searchTXTValue!==''){
        url=url+'&name='+searchTXTValue;
      }
      if(filtertype!==''){
        url=url+'&type='+filtertype;
      }

      if(filtercompany!==''){
        url=url+'&company='+filtercompany;
      }
      if(filtercolor!==''){
        url=url+'&color='+filtercolor;
      }
      if(fillerrange!==''){
        let minPrice,maxPrice;
        if( fillerrange==='RangeA'){
          minPrice=0
          maxPrice=1000
        }
        else if( fillerrange==='RangeB'){
          minPrice=1000
          maxPrice=10000
        }
        else if( fillerrange==='RangeC'){
          minPrice=10000
          maxPrice=20000
        }
        url=url+'&minPrice='+minPrice;
        url=url+'&maxPrice='+maxPrice ;
      }

      if(sorttype!==''){
        let sortBy,sortOrder;
        if( sorttype==='SortPriceL'){
          sortBy='price'
          sortOrder='asc'
        }
        else if( sorttype==='SortPriceH'){
          sortBy='price'
          sortOrder='desc'
        }
        else if( sorttype==='SortNameA'){
          sortBy='company'
          sortOrder='asc'
        }
        else if( sorttype==='SortNameZ'){
          sortBy='company'
          sortOrder='desc'
        }
        url=url+'&sortBy='+sortBy;
        url=url+'&sortOrder='+sortOrder ;
      }
    
      console.warn('url '+url)
    return url;
    }
     const searchHandle= (event)=>{
      searchTXTValue= event.target.value;
      setsearchedValue(searchTXTValue)
      getAllProducts();
     }

     
    const getAllProducts = async ()=>{
       let url=  urlmaker();
      fetch(url, {
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
  setProducts(data)
})
.catch(error => {
  console.error('Server Error:', error);
});
  }

 
let content;
if (screenSize < 600) {

  content = 
  <div> 
     <ToastContainer />
   <div className='search_mbol_con_uhny3'>
    <div style={{width:'100%', height:'80px' ,backgroundColor:'#2E0052'}}> 
    <div class="search_container_mobile">
    <input type="text" class="search-input"  onChange={searchHandle} placeholder="Search by Product Name"/>
    <img className="search-icon" src={searchicon} alt="logo" style={{height:'30px',width:'30px'}}/>
  </div>
</div>
   </div>

   <div className="top_dashboard_containerMBOL" style={{paddingTop:'88px'}}>
    <div className="mobile_dashboard_container" >  
    <div className="banner_container_YH7_MBOL"> 
     <div style={{width:'50%' , display:'inline-block'}}>
       <h1 className="banner_TXT7_mbol">Grab upto 50% off on <br></br>Selected headphones</h1>
        <p className="labelbuy_now">Buy Now</p>
        </div>
        <img src={bannerimg} className="banner_IMG75_MBOL" alt="logo" />
      </div>
 
     <div class="filter_container_scroll">
     <select value={selectedValueSort} onChange={handleChange_Sort} className="filter_dropdwop_YHYSORT_MBOL">
<option disabled hidden value="">
Sort by
</option>
<option value="" className="option_val_1">Featured</option>
<option value="SortPriceL" className="option_val_1">Price : Lowest</option>
<option value="SortPriceH" className="option_val_1">Price : Highest</option>
<option value="SortNameA" className="option_val_1">Name : (A-Z)</option>
<option value="SortNameZ" className="option_val_1">Name : (Z-A)</option>
</select>  

     <select value={selectedValueType} onChange={handleChangeType} className="filter_dropdwop_YHY1_MBOL" >
<option disabled hidden value="">
Headphone type
</option>
<option value="" className="option_val_1">Featured</option>
<option value="In-ear headphone" className="option_val_1">In-ear headphone</option>
<option value="On-ear headphone" className="option_val_1" >On-ear headphone</option>
<option value="Over-ear headphone" className="option_val_1">Over-ear headphone</option>
</select>

<select value={selectedValueCompany} onChange={handleChange_company} className="filter_dropdwop_YHY1_MBOL" >
<option disabled hidden value="">
Company
</option>
<option value="" className="option_val_1">Featured</option>
<option value="JBL" className="option_val_1">JBL</option>
<option value="Sony" className="option_val_1">Sony</option>
<option value="Boat" className="option_val_1">Boat</option>
<option value="Ptron" className="option_val_1">Ptron</option>
</select>

<select value={selectedValueColor} onChange={handleChange_color} className="filter_dropdwop_YHY1_MBOL" >
<option disabled hidden value="">
Color
</option>
<option value="" className="option_val_1">Featured</option>
<option value="Black" className="option_val_1">Black</option>
<option value="White" className="option_val_1">White</option>
<option value="Brown" className="option_val_1">Brown</option>

</select>
<select value={selectedValuePrange} onChange={handleChange_P_range} className="filter_dropdwop_YHY1_MBOL" >
<option disabled hidden value="">
Price</option>
<option value="" className="option_val_1">Featured</option>
<option value="RangeA" className="option_val_1">₹0 - ₹1,000</option>
<option value="RangeB" className="option_val_1">₹1,000 - ₹10,000</option>
<option value="RangeC" className="option_val_1"> ₹10,000 - ₹20,000</option>

</select>
</div>


        <p className='line_checkout' style={{marginBlockStart:'0.5em'}}></p>

        <div className="productcontainer_HHt4s_MBOL" >
{products.map((item)=><ProductCard fetchCount={getTotalProductCount} screen='mobile' layout={layoutValue} product={item}></ProductCard>)}

</div>
    </div></div>

 <MobileFooter_Nav count={Tproduct}></MobileFooter_Nav>
  </div>

}
else{
  content =   <div className="top_dashboard_container">
     <ToastContainer />
  <Header page='home'/>
  <div className="dashboard_container">

   <Navbar  toggleModal={toggleModal} count={Tproduct}></Navbar>
   {showModal && (
<div className="modal_top_navbar" >
<div className="modalcontent">
  <p>{localStorage.getItem('uname')}</p>
  <p className='line_checkout'></p>
  <p onClick={handleClearLocalStorage} >Logout</p>
</div>
</div>
)}
      <div className="banner_container_YH7"> 
       <h1 className="banner_TXT7">Grab upto 50% off on <br></br>Selected headphones</h1>
       <img src={bannerimg} className="banner_IMG75" alt="logo" />
      </div>

      <div class="search-container">
<input type="text" class="search-input" placeholder="Search by Product Name" onChange={searchHandle}/>
<img className="search-icon" src={searchicon} alt="logo" style={{height:'30px',width:'30px'}}/>
</div>

<div className="dropdown_container_11">
<img src={grid_1} id='grid_1' onClick={changeLayoutgrid} alt="logo" style={{height:'28px',width:'30px' ,float:"left",background:'#2E0052'}}/>
<img src={grid_2} id={'grid_2'} className='grid_1' onClick={changeLayoutExpend} alt="logo" style={{height:'25px',width:'30px',float:"left" }}/>
<select value={selectedValueType} onChange={handleChangeType} className="filter_dropdwop_YHY1" style={{float:"left"}}>
<option disabled hidden value="">
Headphone type
</option>
<option value="">Featured</option>
<option value="In-ear headphone">In-ear headphone</option>
<option value="On-ear headphone">On-ear headphone</option>
<option value="Over-ear headphone">Over-ear headphone</option>
</select>

<select value={selectedValueCompany} onChange={handleChange_company} className="filter_dropdwop_YHY1" style={{float:"left"}}>
<option disabled hidden value="">
Company
</option>
<option value="">Featured</option>
<option value="JBL">JBL</option>
<option value="Sony">Sony</option>
<option value="Boat">Boat</option>
<option value="Ptron">Ptron</option>
</select>

<select value={selectedValueColor} onChange={handleChange_color} className="filter_dropdwop_YHY1" style={{float:"left"}}>
<option disabled hidden value="">
Color
</option>
<option value="">Featured</option>
<option value="Black">Black</option>
<option value="White">White</option>
<option value="Brown">Brown</option>

</select>
<select value={selectedValuePrange} onChange={handleChange_P_range} className="filter_dropdwop_YHY1" style={{float:"left"}}>
<option disabled hidden value="">
Price
</option>
<option value="">Featured</option>
<option value="RangeA">₹0 - ₹1,000</option>
<option value="RangeB">₹1,000 - ₹10,000</option>
<option value="RangeC">₹10,000 - ₹20,000</option>

</select>

<select value={selectedValueSort} onChange={handleChange_Sort} className="filter_dropdwop_YHY1_sortby" style={{float:"right", marginRight:'0px'}}>
<option disabled hidden value="">
Sort by : Featured
</option>
<option value="">Featured</option>
<option value="SortPriceL">Price : Lowest</option>
<option value="SortPriceH">Price : Highest</option>
<option value="SortNameA">Name : (A-Z)</option>
<option value="SortNameZ">Name : (Z-A)</option>
</select>
</div>

<div className="productcontainer_HHt4s">
{products.map((item)=><ProductCard fetchCount={getTotalProductCount} layout={layoutValue} product={item}></ProductCard>)}

</div>

     </div>
<div class="container_IJU1" ref={optionsRef} onClick={handleOpenModalFeeback}>
<img src={bot} alt="logo" className='fixed-icon-bot' style={{height:'50px',width:'50px',float:"left"}}/>
</div>
{isOpenFeedback && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModalFeeback}>&times;</span>
            <div className="form-group" style={{marginBottom:'10px'}}>
              <label htmlFor="dropdown" className="feedbach_label">Type your feedback</label> <br></br>
              <select id="dropdown" className="dd_feed_forn"  style={{width:'200px' , height:'50px' , 
              color:'#919191' , backgroundColor:'#F3F3F3'}} value={selectedFeebackType} onChange={handleDropFeedback}>
              <option disabled hidden value="">
              Choose the type
 </option>
                <option value="Bugs" className="op_feedback_67">Bugs</option>
                <option value="Feedback"  className="op_feedback_67">Feedback</option>
                <option value="Query"  className="op_feedback_67">Query</option>
              </select>
              {errorFeedbacktype && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
            </div>
            <div className="form-group">
              <label className="feedbach_label" htmlFor="textarea">Feedback</label><br></br>
              <textarea id="textarea" style={{width:'192px' , height:'100px'}} value={selectedFeebackText} onChange={handleTextareaFeedback}></textarea>
              {errorFeedbacktext && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
            </div>
            <button onClick={handleSubmitFeedBack} className="submit_feedback_47">Submit</button>
          </div>
        </div>
      )}
<Footer/>
</div>

}
 return <>{content}</>
      };
    
      export default DashBoard;