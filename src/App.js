import React from 'react';
import './index.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import InfluRegister from './components/influencer/InfluRegister';
import SponsoRegister from './components/sponsor/SponsoRegister';
import InfluLogin from './components/influencer/InfluLogin';
import SponsorLogin from './components/sponsor/SponsorLogin';
import HomePage from './components/HomePage';
import SponsorCampaign from './components/sponsor/SponsorCampaign';
import SingleCampaign from './components/sponsor/SingleCampaign';
import AllRequests from './components/sponsor/AllRequests';
import FindPage from './components/sponsor/FindPage';
import InfluencerProfilePage from './components/influencer/InfluencerProfilePage';
import InfluencerFindPage from './components/influencer/InfluencerFindPage';
import CampaignPage from './components/influencer/CampaignPage';
import RequestsFromInfluForParticularCampaign from './components/sponsor/RequestsFromInfluForParticularCampaign';
import AllInfluAdRequests from './components/influencer/AllInfluAdRequests';



const router = createBrowserRouter(createRoutesFromElements
  (
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<InfluRegister />} />
      <Route path="/sponsosignup" element={<SponsoRegister />} />
      <Route path="/influencerLogin" element={<InfluLogin />} />
      <Route path="/sponsorLogin" element={<SponsorLogin />} />
      <Route path="/sponsorCampaign" element={<SponsorCampaign/>}/>
      <Route path="/campaign/:id" element={<SingleCampaign />} />
      <Route path="/influencer/:id" element={<InfluencerProfilePage />} />
      <Route path='/AllAdRequests' element={<AllRequests/>}/>
      <Route path='/find' element={<FindPage/>}/>
      <Route path='/influFind' element={<InfluencerFindPage/>} />
      <Route path='/campaign/:id' element={<CampaignPage/>} />
      <Route path='/influencerStats/:id' element={<InfluencerProfilePage/>}/>
      <Route path="/requestsFromInfluencersForParticularCampaign/:id" element={<RequestsFromInfluForParticularCampaign/>}/>
      <Route path = "/allInfluAdRequests/:id" element={<AllInfluAdRequests/>}/>
    </Route>

  )
)


const App = () => {
  return <RouterProvider router={router} />
}

export default App;
