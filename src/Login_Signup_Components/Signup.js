
import React, { useEffect } from "react";
import { useState } from "react";
import '../Login_Signup_Components/auth.css'; 
import logo from '../icons/logo_singup_login.png';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import Footer from "../footer";
import HeaderMobile from "../HeaderMobile";
function Signup() {
  
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [errorpassword, seterrorpassword] = useState(false);
  const [erroremail, seterroremail] = useState(false);
  const [errormobile, seterrormobile] = useState(false);
  const [errorname, seterrorname] = useState(false);
    const navigate = useNavigate();
    const [loginformData, setloginformData] = useState({ email: '', password: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phonenumber: ''
      });
const gotosignup=()=>{
  navigate('/login')
}
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        seterrorpassword(false)
        seterrormobile(false)
        seterrorname(false)
        seterroremail(false)
        console.log('name '+JSON.stringify(formData));
      };

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
      const handleSubmit = async (e) => {
        e.preventDefault();
       let str= formData.email;
       str=str.toLowerCase();
       formData.email=str
        setFormData(
          {
            name: formData.name,
            email:formData.email,
            password: formData.password,
            phonenumber: formData.phonenumber
          }
        )
        if(!formData.password) seterrorpassword(true)

        if(!formData.name) seterrorname(true)

        if(!formData.phonenumber) seterrormobile(true)

        if(!formData.email) seterroremail(true)
        
    
        try {
          const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/signup', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          if (response.ok) {
        
            console.log('Signup successful!');
            
        try {
            loginformData.email=formData.email;
            loginformData.password=formData.password;
            
            const response = await fetch('https://musicart-server-078ee6927bdc.herokuapp.com/user/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
      
            if (response.ok) {
              const { token } = await response.json();
              console.log(token)
              localStorage.setItem('token', token);
             localStorage.setItem('uname',formData.name);
              const user = jwtDecode(token);
              console.log('User:', user);
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
          } else {
         
            console.error('Signup failed:', response);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
        finally{
          setFormData(
            {
              name: '',
              email:'',
              password: '',
              phonenumber:''
            })
        
        }
      };

      let content;
      if (screenSize < 600) {
     
        content = <div className="signup_container"  style={{marginTop:'70px',paddingBottom:'50px'}}>
        <HeaderMobile></HeaderMobile>
        <h1 className="welcome_txt_THTY3">Welcome</h1>
        <form className="form" onSubmit={handleSubmit}>

              <div className="form-body">
                      <h2 style={{display:'inline-block' ,fontSize:'20px'}}>Create Account </h2>  <p style={{display:'inline'}}>Don’t have an account?</p>
                <div className="login_signup_input">
                <label className="inp_label_nhs8">Your name</label>
            <input className="form_input_name_U4" value={formData.name}  onChange={handleChange} type="text" id="name" name="name" />
            {errorname && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>   
                    <div className="login_signup_input">
                    <label className="inp_label_nhs8">Mobile number</label>
            <input className="form_input_name_U4"  value={formData.phonenumber}  onChange={handleChange} type="tel" id="phonenumber" name="phonenumber" />
            {errormobile && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Email</label>
                      <input className="form_input_name_U4"  value={formData.email}  onChange={handleChange} type="text" id="Email" name="email" />
                      {erroremail && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
               
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Password</label>
                      <input className="form_input_name_U4"  type="password"  value={formData.password}  onChange={handleChange} id="password" name="password" />
                      {errorpassword && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                  <p className="inp_label_nhs8">By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>
                 
                  <div className="login_btn">
                  <button  className="signup_btn_p1">Continue</button>
              </div>
              <p className="inp_label_nhs8">By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                 
              </div>
            
          </form>   
                 
           <div className="inp_label_nhs8" style={{textAlign:'center'}}> <p>Already have an account? <div className="sign_UHY4" onClick={gotosignup}>Sign in</div></p>
              </div>

          </div>  
      } else {
    
        content = <div className="signup_container">
        <img src={logo} className="logo_signup_login" alt="logo" />
        <form className="form" onSubmit={handleSubmit}>

              <div className="form-body">
                      <h2>Create Account</h2>
                <div className="login_signup_input">
                <label className="inp_label_nhs8">Your name</label>
            <input className="form_input_name_U4" value={formData.name}  onChange={handleChange} type="text" id="name" name="name" />
            {errorname && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>   
                    <div className="login_signup_input">
                    <label className="inp_label_nhs8">Mobile number</label>
            <input className="form_input_name_U4"  value={formData.phonenumber}  onChange={handleChange} type="tel" id="phonenumber" name="phonenumber" />
            {errormobile && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Email</label>
                      <input className="form_input_name_U4"  value={formData.email}  onChange={handleChange} type="text" id="Email" name="email" />
                      {erroremail && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
               
                  <div className="login_signup_input">
                  <label className="inp_label_nhs8">Password</label>
                      <input className="form_input_name_U4"  type="password"  value={formData.password}  onChange={handleChange} id="password" name="password" />
                      {errorpassword && <div style={{ color: 'red', fontSize:'13px'  }}>*Required Field</div>}
                  </div>
                  <p className="inp_label_nhs8">By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>
                 
                  <div className="login_btn">
                  <button  className="signup_btn_p1">Continue</button>
              </div>
              <p className="inp_label_nhs8">By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                 
              </div>
            
          </form>   
                 
           <div className="inp_label_nhs8"> <p>Already have an account? <div className="sign_UHY4" onClick={gotosignup}>Sign in</div></p>
              </div>
            
          </div>   
      }
    return <>{content}   <Footer/></>
      }
    
      export default Signup;
