import React, { useState, useEffect } from 'react';

const SponsoHomePage = () => {
  const sponsorId = localStorage.getItem('sponsorId');
  const [sponsorName, setSponsorName] = useState('Loading...');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allAdsList, setAllAdsList] = useState([]);
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
    } catch (error) {
      console.error('Error fetching all ads:', error);
    }
  };

  useEffect(() => {
    (async () => {
      await getSponsor();
      await getAllCampaignsOfSponsor();
    })();
  }, []);

  useEffect(() => {
    if (allCampaigns.length > 0) {
      fetchAllAds();
    }
  }, [allCampaigns]);

  return (
    <div className='bg-gray-200 w-full h-screen'>
      <div className='p-4 w-full h-full'>
        <div className='p-4'>
        <h1 className='text-3xl ml-5'>Welcome, {sponsorName}!</h1>
        </div>

        <div className='flex flex-row w-full h-[25%] justify-around'>
          <div className='bg-white w-[20%] rounded-xl p-4 m-2'>
            <p>Total Campaigns</p>
            <p className='text-9xl'>{allCampaigns.length}</p>
          </div>

          <div className='bg-white w-[20%] rounded-xl p-4 m-2'>
            <p>Total Advertisements</p>
            <p className='text-9xl'>{allAdsList.length}</p>
          </div>

          <div className='bg-white w-[20%] rounded-xl p-4 m-2'>
            <p>Total Advertisements</p>
            <p className='text-9xl'>{allAdsList.length}</p>
          </div>

          <div className='bg-white w-[20%] rounded-xl p-4 m-2'>
            <p>Total Advertisements</p>
            <p className='text-9xl'>{allAdsList.length}</p>
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
