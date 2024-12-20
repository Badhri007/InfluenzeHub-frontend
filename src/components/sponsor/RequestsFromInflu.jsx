import React, { useEffect, useState } from 'react'
import SponsoNavbar from './SponsoNavbar'

const RequestsFromInflu = () => {


  const [sponsorName,setSponsorName] = useState();
  const [allAdRequestOfInfluencers,setAllAdRequestOfInfluencers] = useState();





  const getSponsorNameById = async (sponsorId)=>{

    try
    {
      console.log("Sponsor Id:",sponsorId);
      const url='http://localhost:5000/getSponsorById'
      const response = await fetch(url,{
        headers:{
          'Content-Type': 'application/json',
          'sponsorid':sponsorId
        }
      });

      if(response.ok)
      {
        const sponsor_name = await response.json();
        console.log("Data from Backend for Sponsor name : ", sponsor_name);
        setSponsorName(sponsor_name);
      }
      else
      {
          console.log("Error in fetching the sponsor name : ");
      }

    }

    catch(err)
    {
      console.log("Error in fetching the sponsor name : ",err);
    }

  }


  const getAdRequestsFromInfluencers = async() =>{

    try
    {
        const url='http://localhost:5000/getAllAdRequestsFromInfluencers'
        const response = await fetch(url,{
          headers:{
            'Content-Type': 'application/json',
            'sponsor_name': sponsorName
          }
        });

      if(response.ok)
      {
          const allAdRequestsFromInfluencers = await response.json();
          console.log("Influencers Requests:", allAdRequestOfInfluencers);
          setAllAdRequestOfInfluencers(allAdRequestsFromInfluencers);
      }

      else
      {
        console.log("Error in getting the ad requests from influencers...")
      }


    }

    catch(err)
    {
      console.log("Error in getting the ad requests from influencers...",err);
    }


  }


  useEffect(()=>{
    let sponsorId = localStorage.getItem('sponsorId');
    console.log(sponsorId);
    getSponsorNameById(sponsorId);
    getAdRequestsFromInfluencers();
  },[])



  return (
    <div>
      <SponsoNavbar/>
      <div className='flex flex-col justify-center items-center p-4'>
        <div>
          <p className='text-xl'> Requested Campaigns from Influencers ..</p>
        </div>
      </div>
    </div>
  )
}

export default RequestsFromInflu
