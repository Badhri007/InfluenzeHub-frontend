import React from 'react'
import Navbar from './Navbar';
import SponsoHomePage from './SponsoHomePage';
import InfluHomePage from './InfluHomePage';
import InfluNavbar from './InfluNavbar';
import SponsoNavbar from './SponsoNavbar';

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