import React from 'react';
import './index.css';
import { useNavigate } from "react-router-dom";
import callicon from './icons/calling.png';

function Header(props) {
  const redirect =useNavigate();
  const goToLogin =()=>{
    localStorage.clear();  
    redirect('/login');
  }

  const goToSignup =()=>{
    redirect('/signup');
  }
  return (
    <header className="header">
      <div className="header_container" >
      <img src={callicon}  style={{float:'left', marginLeft:"5%" , width:'30px', height:'30px',marginTop:'10px'}} alt="logo" />
        <p className='header_TXT_iiu8' style={{float:'left', marginLeft:"1%"}}>912121131313</p> 
        <p className='header_TXT_iiu8' style={{ marginLeft:"-5%"}}>Get 50% off on selected items &nbsp;  </p>
         <p className='header_TXT_iiu8'>|&nbsp; Shop now</p>
         {localStorage.getItem('token')===null ? <div  style={{float:'right', marginRight:"5%", cursor:'pointer'}}>
         <p  className='header_TXT_iiu8 huh'  onClick={goToLogin}>Login</p>
           <p className='header_TXT_iiu8 '> &nbsp; | &nbsp;</p>
       <p className='header_TXT_iiu8 huh'  onClick={goToSignup}>Signup</p>
         </div> : props.page!=='home' ? <div  style={{float:'right', marginRight:"5%", cursor:'pointer'}}>
         <p  className='header_TXT_iiu8 huh'  onClick={goToLogin}>Logout</p>
         </div> : <></>}
            </div> 
    </header>
  );
}

export default Header;