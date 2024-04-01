import { useEffect, useRef, useState, useCounter} from 'react';
import cartlabelIcon from '../icons/Vector.png';
import logo from '../icons/logo_singup_login.png';
import { useNavigate } from 'react-router-dom';
import '../Dashboard_Components/Dashboard.css'; 
function Navbar(props) {
 const redirect= useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const buttonRef = useRef(null);
  const [Tproduct, setTproduct] = useState(0);
  const openModal = () => {
  
  setIsOpen(!isOpen);
  } 
   let words ="", intiName="";
   if(localStorage.getItem('uname')!==null){
    words = localStorage.getItem('uname').split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());
     intiName= initials.join('');
   }
  
  useEffect(()=>{

  },[])
  const gotoCart = () => {
    redirect('/cart')
  }
  
  const handleInvoiceBtn = () => {
    redirect('/myinvoice')
  }
   const handleInputChange1 = (event) => setText1(event.target.value);
  const handleInputChange2 = (event) => setText2(event.target.value);
  const buttonPosition = buttonRef.current ? buttonRef.current.getBoundingClientRect() : {};


  return (
    <div className="top_nav_bar">
    <img src={logo} className="logo_dashoard" alt="logo" />
    <p className="nav_links_uUJ7" >Home</p> 
   {props.head &&props.head.length>0?  <p className="nav_links_uUJ7" style={{marginLeft:'0px'}}>/ {props.head}</p>: 
      localStorage.getItem('token') ===null ?
     <></>  : <p className="nav_links_uUJ7" onClick={handleInvoiceBtn}>Invoice</p>
  
    }
 {props.removemen==='true' ? <></> : localStorage.getItem('token') ===null ? <></> :<div class="circle" onClick={props.toggleModal}>&nbsp;{intiName}</div> }
   
  {localStorage.getItem('token') ===null ? <></> : <p className="cartLabel_dash_97" onClick={gotoCart}><img src={cartlabelIcon} alt="logo" style={{height:'14px',width:'16px'}}/> View Cart  {props.count}</p>
}
    </div>
  );
}

export default Navbar;
