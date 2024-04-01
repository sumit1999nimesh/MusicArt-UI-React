
import React, { useEffect } from "react";
import { useState } from "react";
import {jwtDecode} from 'jwt-decode';
import '../Login_Signup_Components/auth.css'; 
import logo from '../icons/logo_singup_login.png';
import { useNavigate } from "react-router-dom";
import HeaderMobile from "../HeaderMobile";
import Footer from "../footer";

function Login() {
  const [errorpassword, seterrorpassword] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [erroremail, seterroremail] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate  = useNavigate();

  const gotosignup=()=>{
    navigate('/signup')
  } 
  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      navigate('/')
      return;
    }
   
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        seterroremail(false)
        seterrorpassword(false)
      };

      const handleLogin = async (e) => {
        e.preventDefault();
        let str= formData.email;
        str=str.toLowerCase();
        formData.email=str
         setFormData(
           {
             email:formData.email,
             password: formData.password
           }
         )
         if (!formData.email)   seterroremail(true)

         if (!formData.password)   seterrorpassword(true)

        if (!formData.email || !formData.password) {
          return console.warn('Email and password are required');
        }
    
        try {
       
          const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            const { token ,user} = await response.json();
            console.log(token)
            localStorage.setItem('token', token);
            localStorage.setItem('uname', user.name);
            console.log('token:', localStorage.getItem('token'));
            console.log('user:', localStorage.getItem('uname'));
            
             console.log('user:', user);
        
            setTimeout(() => {
          }, 3000);
          console.log('logged in');
            navigate('/');
          } else {
            console.error('Invalid email or password');
          }
        } catch (error) {
          console.error('Error:', error);
    
        }
      };
      let content;
      if (screenSize < 600) {
     
        content = <div>
          <HeaderMobile></HeaderMobile>
          <div className="signup_container" style={{marginTop:'70px'}}>
            <h1 className="welcome_txt_THTY3">Welcome</h1>
        <form className="form" onSubmit={handleLogin}>
           
              <div className="form-body">
                      <h2 style={{display:'inline-block'}}>Sign in</h2> <p style={{display:'inline'}}>Already a customer?</p>
          
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Enter your email or mobile number</label>
                      <input className="form_input_name_U4"   type="text" id="Email" name="email" value={formData.email} onChange={handleChange}  />
                      {erroremail && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
               
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8" >Password</label>
                      <input className="form_input_name_U4"  type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                      {errorpassword && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                
                  <div className="login_btn">
                  <button  className="login_btn_p1">Continue</button>
              </div>
              <p className="inp_label_nhs8">By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                 
              </div>
            
          </form>   
      
           <div className="newtoMus_UYB"> <p className="pas"><div className="line-2"></div> New to Musicart          <div className="line-2"></div></p> </div>
        <button className="redirecttosignup_BTN_ASjw" style={{height:'3em'}}onClick={gotosignup}> Create your Musicart account</button>
     
          </div>   
        </div>;
      } else {
    
        content =  <div className="signup_container">
        <img src={logo} className="logo_signup_login" alt="logo" />
        <form className="form" onSubmit={handleLogin}>

              <div className="form-body">
                      <h2>Sign in</h2>
          
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Enter your email or mobile number</label>
                      <input className="form_input_name_U4"   type="text" id="Email" name="email" value={formData.email} onChange={handleChange}  />
                      {erroremail && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
               
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8" >Password</label>
                      <input className="form_input_name_U4"  type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                      {errorpassword && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                
                  <div className="login_btn">
                  <button  className="login_btn_p1">Continue</button>
              </div>
              <p className="inp_label_nhs8">By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                 
              </div>
            
          </form>   
      
           <div className="newtoMus_UYB"> <p  className="pas"><div className="line-2"></div> New to Musicart          <div className="line-2"></div></p> </div>
        <button className="redirecttosignup_BTN_ASjw" onClick={gotosignup}> Create your Musicart account</button>
       
          </div>   
      }

        return <div>{content}   <Footer/></div>;
      }
    
      export default Login;