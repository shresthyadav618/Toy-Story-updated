import React, { useState } from 'react';
import "./handleUser.css";
const HandleUser = () => {
  const [view, setView] = useState('login'); // Initial view is 'login'

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
            <form action="#" className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
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
            </form>
          )}

          {view === 'signup' && (
            <form action="#" className="signup">
                 <div className="field">
                <input type="text" placeholder="Name" required />
              </div>
              
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
             

              <div className="field btn">
                <div className="btn-layer"></div>

                
                <input type="submit" value="Signup" />
              </div>



            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default HandleUser;
