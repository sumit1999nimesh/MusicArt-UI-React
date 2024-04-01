import React from 'react';
import './index.css';
import logo from './icons/logo_mobile.png';

function HeaderMobile() {

  return (
    <header className="header">
      <div className="header_container" style={{padding:'10px'}} >
      <div> <img src={logo} className="logo_Orderplaced" alt="logo" /></div>
       </div>
    </header>
  );
}

export default HeaderMobile;