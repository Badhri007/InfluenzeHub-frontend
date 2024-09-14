import React, { useState } from 'react';
import './index.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/Mainlayout';
import InfluRegister from './components/influencer/InfluRegister';
import SponsoRegister from './components/sponsor/SponsoRegister';
import InfluLogin from './components/influencer/InfluLogin';
import SponsorLogin from './components/sponsor/SponsorLogin';
import HomePage from './components/HomePage';
import SponsorCampaign from './components/sponsor/SponsorCampaign';
import SingleCampaign from './components/sponsor/SingleCampaign';
import AllRequests from './components/sponsor/AllRequests';


const router = createBrowserRouter(createRoutesFromElements
  (
    // <Route path='/' element={<MainLayout/>}>
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<InfluRegister />} />
      <Route path="/sponsosignup" element={<SponsoRegister />} />
      <Route path="/influencerLogin" element={<InfluLogin />} />
      <Route path="/sponsorLogin" element={<SponsorLogin />} />
      <Route path="/sponsorCampaign" element={<SponsorCampaign/>}/>
      <Route path="/campaign/:id" element={<SingleCampaign />} />
      <Route path='/AllAdRequests' element={<AllRequests/>}/>
    </Route>

  )
)


const App = () => {
  return <RouterProvider router={router} />
}

export default App;
