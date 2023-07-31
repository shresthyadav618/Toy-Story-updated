import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detailed from "./detailed/detailed";
import './index.css';
import Sider from "./sider.js";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  
  <BrowserRouter>
  <div className='flex'>
    <Routes>
  
    <Route path='/' element={<div className='sider'><Sider/></div>}></Route>
    <Route path='/movie/:id' element={<Detailed/>}></Route>
 
    </Routes>


  </div>
  
  </BrowserRouter>
   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
