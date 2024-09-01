import React from 'react'
import Navbar from './Navbar';
import SponsoHomePage from './sponsor/SponsoHomePage';
import InfluHomePage from './influencer/InfluHomePage';
import InfluNavbar from './influencer/InfluNavbar';
import SponsoNavbar from './sponsor/SponsoNavbar';

const HomePage = () => {


  const influ=localStorage.getItem("influencerId");
  console.log("Influ:",influ)
  let sponso;
  if(influ==null)
  {
    sponso=localStorage.getItem("sponsorId");
    console.log("Sponsor:",sponso);
    return (
      <div>
      <SponsoNavbar/>
      <SponsoHomePage/>
      </div>
    )
  }
  else{
    return (
      <div>
      <InfluNavbar/>
      <InfluHomePage/>
      </div>
    )

  }
  

  
}

export default HomePage