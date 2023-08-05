import React, { useState } from 'react';
import Header from "../navbar/navbar";
import Sidebar from "../sider";
import Loggeduser from "../userLogged/loggedUser";
import "./handleUser.css";
const HandleUser = () => {
  const [view, setView] = useState('login'); // Initial view is 'login'
  const BASE_URL = 'https://toystory-backend.onrender.com';
const [error,setError] = useState(null);
  const [sign,changeSign] = useState({
    name : "",
    email : "",
    password : ""
  });
  const [login,changeLogin] = useState({
    email : "",
    password: ""
  });

  const [render,changeRender] = useState(false);
function loginUser(e){
e.preventDefault();

async function loginFnc(){

const data = await fetch(`${BASE_URL}/def/login`,{
  method : 'POST',
  body : JSON.stringify(login),
  headers : {'Content-Type':'application/json'}  
})

if(data.ok){
    const res = await data.json();
    console.log('the user is logged in ',res);
    sessionStorage.setItem('jwt',res.token);
    changeRender((prev)=>{return !prev});
}else{
    setError('Invalid email and password');
    console.log('there was some error while loggin in the user',data.error);
}

}

loginFnc();

}

function signUpUser(e){
    e.preventDefault();
    async function suar(){
        const data = await fetch(`${BASE_URL}/def/signup`,{
            method  : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(sign)
        });

        if(data.ok){
            const res = await data.json();
            console.log('user is registered with info ',res);
        }else{
            setError('Please fill all the fields')
            console.log('there was some error while registering the user ',data.error);
        }
    }

    suar();
    alert('User is Signed Up');
    setView('login');
}

  const handleSignupClick = () => {
    setView('signup');
  };

  const handleLoginClick = () => {
    setView('login');
  };

  const handleSignupLinkClick = (event) => {
    event.preventDefault();
    handleSignupClick();
  };

  const jwt = sessionStorage.getItem('jwt');
  if(jwt){
    return (
        <>
        <Header/>
        <Sidebar filter='true' />
        <div className='logged__container'>
            <Loggeduser value='0'/>
        </div>
        </>
    )
  }
else{

  return (
    <div className='user__container'>
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${view === 'login' ? 'login' : 'signup'}`}>Login Form</div>
        <div className={`title ${view === 'signup' ? 'signup' : 'login'}`}>Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={view === 'login'} />
          <input type="radio" name="slide" id="signup" checked={view === 'signup'} />
          <label htmlFor="login" className={`slide login ${view === 'login' ? 'selected' : ''}`} onClick={handleLoginClick}>
            Login
          </label>
          <label htmlFor="signup" className={`slide signup ${view === 'signup' ? 'selected' : ''}`} onClick={handleSignupClick}>
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {view === 'login' && (
            <form onSubmit={(e)=>{
                loginUser(e);
            }} className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" required onChange={(e)=>{
                    changeLogin((prev)=>{return {...prev,email : e.target.value}})
                }}/>
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required onChange={(e)=>{
                    changeLogin((prev)=>{return {...prev,password : e.target.value}})
                }}/>
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <a href="#" onClick={handleSignupLinkClick}>Signup now</a>
              </div>
              <div className='text-red-500 text-center'>{error}</div>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={(e)=>{
                signUpUser(e);
            }} className="signup">
                 <div className="field">
                <input type="text" placeholder="Name" required  onChange={(e)=>{
                    changeSign((prev)=>{return {...prev,name : e.target.value}})
                }}/>
              </div>
              
              <div className="field">
                <input type="text" placeholder="Email Address" required onChange={(e)=>{
                    changeSign((prev)=>{return {...prev,email : e.target.value}})
                }}/>
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required onChange={(e)=>{
                    changeSign((prev)=>{return {...prev,password : e.target.value}})
                }}/>
              </div>
             

              <div className="field btn">
                <div className="btn-layer"></div>

                
                <input type="submit" value="Signup" />
              </div>

              <div className='text-red-500 text-center'>{error}</div>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
}

export default HandleUser;
