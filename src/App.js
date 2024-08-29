import React, { useState } from 'react';
import './index.css';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/Mainlayout';
import InfluRegister from './components/InfluRegister';
import SponsoRegister from './components/SponsoRegister';


const router=createBrowserRouter(createRoutesFromElements
  (
    <Route path='/' element={<MainLayout/>}>
          <Route path="/signup" element={<InfluRegister/>}/>
          <Route path="/sponsosignup" element={<SponsoRegister/>}/>
    </Route>

  )
)


const App=()=>{
  return <RouterProvider router={router}/>
}

export default App;
