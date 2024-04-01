

import { useEffect, useRef, useState, useCounter} from 'react';
import '../Dashboard_Components/Dashboard.css'; 
import home_icon from '../icons/Group 102.png';
import logout_icon from '../icons/Group 55.png';
import login_icon from '../icons/Group 103.png';
import cart_icon from '../icons/g100.png';
import invoice_icon from '../icons/Group 101.png';
import { useNavigate } from 'react-router-dom';
function MobileFooter_Nav(props) {

    const redirect=useNavigate();
    
    const goLogout = () => {  
        localStorage.clear();
        redirect('/');
      }
      const gotoHome = () => { 
        redirect('/');
      }
      const goLogin = () => {  
        redirect('/login');
      }
      const gotocart = () => {  
        redirect('/cart');
      }
      const gotoinvoices = () => {  
        redirect('/myinvoice');
      }

return (
<div className="footer_mbol_icons">
<div className="icons-container">
  <img onClick={gotoHome} src={home_icon} alt="Icon 1" className="icon" />
  <div className="cart-icon-container">
      <img  onClick={gotocart}  src={cart_icon} alt="Icon 2" style={{width:'100%', height:'100%',maxWidth:'100px'}} className="icon" />
      <span className="cart-text">{props.count}</span>
    </div>
  { localStorage.getItem('token')===null ?  <></> :
   <img  onClick={gotoinvoices}  src={invoice_icon} alt="Icon 3" className="icon" />}
    
  { localStorage.getItem('token')===null ?
  <img   onClick={goLogin}  src={login_icon} alt="Icon 4" className="icon" /> :
  <img  onClick={goLogout}  src={logout_icon} alt="Icon 2" className="icon" /> }
</div>
</div>
);
}
export default MobileFooter_Nav;
