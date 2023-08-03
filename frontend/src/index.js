import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cast from "./cast/cast";
import Detailed from "./detailed/detailed";
import './index.css';
import Sider from "./sider.js";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  
  <BrowserRouter>
  <div className='flex'>
    {/* <img src='./assets/12.png'></img> */}
    <Routes>
  
    <Route path='/' element={<> <div className='miracle'></div> <Sider/></>}></Route>
    <Route path='/:id' element={<Sider/>}></Route>
    <Route path='/movie/:id' element={<Detailed/>}></Route>
    <Route path='/movies/:id' element={<Detailed/>}></Route>
    <Route path='/cast/:id' element={<Cast/>}></Route>
 
    </Routes>


  </div>
  
  </BrowserRouter>
   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
