import React, { useState } from 'react';
import './index.css';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/Mainlayout';
import InfluRegister from './components/InfluRegister';
import SponsoRegister from './components/SponsoRegister';
import InfluLogin from './components/InfluLogin';
import SponsorLogin from './components/SponsorLogin';
import HomePage from './components/HomePage';


const router=createBrowserRouter(createRoutesFromElements
  (
    <Route path='/' element={<MainLayout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<InfluRegister/>}/>
          <Route path="/sponsosignup" element={<SponsoRegister/>}/>
          <Route path="/influlogin" element={<InfluLogin/>}/>
          <Route path="/sponsorlogin" element={<SponsorLogin/>}/>
    </Route>

  )
)


const App=()=>{
  return <RouterProvider router={router}/>
}

export default App;
