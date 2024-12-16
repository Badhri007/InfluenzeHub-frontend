import React, { useState, useEffect } from 'react';

const SponsoHomePage = () => {
  const sponsorId = localStorage.getItem('sponsorId');
  const [sponsorName, setSponsorName] = useState('Loading...');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allAdsList, setAllAdsList] = useState([]);

  const [pendingAds,setPendingAds] = useState([]);
  const [acceptAds,setAcceptAds] = useState([]);
  const [rejectedAds,setRejectedAds] = useState([]);

  const [totalAmountSpent,setTotalAmountSpent] = useState(0);
  const [totalBudget,setTotalBudget] = useState(0);

  const [currentCampaignBudget,setCurrentCampaignBudget] = useState(0);

  const [profitableCampaigns,setProfitableCampaigns] = useState([]);
  const [failedCampaigns,setFailedCampaigns] = useState([]);

  const [error, setError] = useState(null);

  const headers = {
    'Content-Type': 'application/json',
    sponsorid: sponsorId,
  };

  const getSponsor = async () => {
    try {
      const response = await fetch('http://localhost:5000/getSponsorById', { headers });

      if (response.ok) {
        const sponsor = await response.json();
        setSponsorName(sponsor || 'Unknown Sponsor');
      } else {
        setError('Failed to fetch sponsor details.');
      }
    } catch (error) {
      setError('Error fetching sponsor details.');
      console.error(error);
    }
  };

  const getAllCampaignsOfSponsor = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllCampaignsSponsorWise', { headers });

      if (response.ok) {
        const campaigns = await response.json();
        setAllCampaigns(campaigns);

        let totalBudget = 0;

        campaigns.map((campaign)=>{
          totalBudget+=campaign.budget;
          setCurrentCampaignBudget(campaign.budget);
        })

        console.log("Total Budget:",totalBudget);

        setTotalBudget(totalBudget);


      } else {
        setError('Failed to fetch campaigns.');
      }
    } catch (error) {
      setError('Error fetching campaigns.');
      console.error(error);
    }
  };

  const getAdsForCurrentCampaign = async (campaignId) => {
    try {
      const response = await fetch('http://localhost:5000/getAllAdRequests', {
        headers: { 'Content-Type': 'application/json', campaign_id: campaignId },
      });

      if (response.ok) {
        const ads = await response.json();

        // let adsCostForCurrentCampaign = 0;
        // ads.map((ad,index)=>{
        //   adsCostForCurrentCampaign+=ad.payment_amount;
        // });

        // if(adsCostForCurrentCampaign<currentCampaignBudget)
        // {
        //     setProfitableCampaigns()
        // }


        setAllAdsList((prevAdsList) => {
          const combinedAds = [...prevAdsList, ...ads];
          const uniqueAds = Array.from(new Set(combinedAds.map((ad) => JSON.stringify(ad)))).map(
            (adString) => JSON.parse(adString)
          );
          return uniqueAds;
        });


      } else {
        console.error('Failed to fetch ads for campaign', campaignId);
      }
    } catch (error) {
      console.error('Error fetching ads for campaign', campaignId, error);
    }
  };

  const fetchAllAds = async () => {
    try {
      await Promise.all(allCampaigns.map((campaign) => getAdsForCurrentCampaign(campaign._id)));
      filterOldUpcomingAds(allAdsList);
    } catch (error) {
      console.error('Error fetching all ads:', error);
    }
  };


  const filterOldUpcomingAds=(allAdsList)=>{

    // console.log(allAdsList);

    let pending = allAdsList.filter(ad => ad.status ==="pending")
    // console.log("Pending ads count:",pending.length);
    setPendingAds(pending);

    let accepted = allAdsList.filter(ad => ad.status ==="accept")
    console.log("Accepted ads count:",accepted);
    setAcceptAds(accepted);

    let rejected = allAdsList.filter(ad => ad.status === "reject")
    // console.log("Rejected Ad count:",rejected);
    setRejectedAds(rejected);

    let totalAmountSpent = 0;

    acceptAds.map((ad)=>{
      totalAmountSpent+=ad.payment_amount;
    })

    console.log("Total Amount Spent:",totalAmountSpent);
    setTotalAmountSpent(totalAmountSpent);
  }



  useEffect(() => {
    (async () => {
      await getSponsor();
      await getAllCampaignsOfSponsor();
    })();
  }, []);

  useEffect(() => {
    if (allCampaigns.length > 0) {
      fetchAllAds();
      // console.log(allAdsList);

    }
  }, [allCampaigns]);

  return (
    <div className='bg-gray-200 w-full h-full'>
      <div className='p-4 w-full h-full'>
        <div className='p-4'>
        <h1 className='text-3xl ml-5'>Welcome, {sponsorName}!</h1>
        </div>

        <div className='sm:grid grid-cols-1 sm:w-full md:grid-cols-3  lg:flex flex-row w-full h-[25%] justify-around'>
          <div className='sm:w-full md:w-[90%] lg:w-[15%]   bg-white  rounded-xl p-4 m-2'>
            <p className='p-1 text-center bg-cyan-300 rounded-xl'>Total Campaigns</p>
            <p className='text-9xl text-center'>{allCampaigns.length}</p>
          </div>

          <div className='bg-white sm:w-full md:w-[90%] lg:w-[15%]  rounded-xl p-4 m-2'>
            <p className='p-1 text-center bg-violet-300 rounded-xl'>Total Advertisements</p>
            <p className='text-9xl text-center'>{allAdsList.length}</p>
          </div>

          <div className='bg-white sm:w-full md:w-[90%] lg:w-[15%]  rounded-xl p-4 m-2'>
            <p className='bg-green-400 p-1 text-center rounded-xl'>Total Accepted Ads</p>
            <p className='text-9xl text-center'>{acceptAds.length}</p>
          </div>

          <div className='bg-white sm:w-full md:w-[90%] lg:w-[15%]  rounded-xl p-4 m-2'>
            <p className='bg-red-300 p-1 text-center rounded-xl'>Total Rejected Ads</p>
            <p className='text-9xl text-center'>{rejectedAds.length}</p>
          </div>

          <div className='bg-white sm:w-full md:w-[90%] lg:w-[15%]  rounded-xl p-4 m-2'>
            <p className='bg-yellow-300 p-1 text-center rounded-xl'>Total Pending Ads</p>
            <p className='text-9xl text-center'>{pendingAds.length}</p>
          </div>
        </div>


      </div>

      <div>
        <div className='flex flex-row justify-between p-[10%]'>
          <div >
            <div className='mb-3'>
              <label className=' p-1 font-bold rounded-xl'>TOTAL BUDGET: </label>
              <p className='text-3xl p-1.5 bg-white  rounded-xl'>${totalBudget}</p>
            </div>

            <div className='mb-3'>
              <label className=' p-1 font-bold rounded-xl'>EXPENSES:  </label>
              <p className='text-3xl p-1.5  bg-white  rounded-xl'>${totalAmountSpent}</p>
            </div>

            <div className='mb-3'>
              <label className=' p-1 font-bold rounded-xl'>BALANCE: </label>
              <p className='text-3xl p-1.5  bg-white  rounded-xl'>${totalBudget - totalAmountSpent}</p>
            </div>

          </div>
          <div>
            <p>Profitable Campaign:</p>
            <p>Failed Campaign:</p>

          </div>

          <div>
          <a href="#" className='underline'> Influencers Hired </a>
          </div>


        </div>

      </div>
      {/* <div>
        <h2>All Ads</h2>
        {allAdsList.length === 0 && <p>No ads available.</p>}
        <ul>
          {allAdsList.map((ad, index) => (
            <li key={index}>{JSON.stringify(ad)}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default SponsoHomePage;
