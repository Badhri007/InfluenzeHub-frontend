import React, { useState, useEffect } from 'react';
import InfluNavbar from './InfluNavbar';
import SearchBar from '../sponsor/SearchBar';
import CampaignPage from './CampaignPage';

const InfluencerFindPage = () => {
  const [filt_campaigns, setFilteredCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllCampaigns', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        const matchedCampaigns = data.filter((campaign) => campaign.visibility.toLowerCase() === 'public');
        setFilteredCampaigns(matchedCampaigns);
      } else {
        console.error('Error fetching campaigns:', response.status);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const viewCampaign = (campaign) => {
    setSelectedCampaign(campaign); // Pass the full campaign object
  };

  const resetSelectedCampaign = () => {
    setSelectedCampaign(null);
  };

  return (
    <div className="bg-gray-100 h-full">
      <InfluNavbar />
      <br />
      {selectedCampaign ? (
        <CampaignPage campaign={selectedCampaign} onBack={resetSelectedCampaign} />
      ) : (
        <>
          <p className="text-center text-xl font-semibold">All Public Campaigns</p>
          <SearchBar onFilterChange={setFilteredCampaigns} onlyPublic="true" />
          <br />
          <div className="grid grid-cols-1 w-[90%] m-auto md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filt_campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white shadow-xl rounded-xl p-4 m-1 flex flex-col hover:scale-110 transition-all duration-300"
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="font-roboto font-semibold text-xl">{campaign.name}</p>
                    <p className="text-medium font-normal">{campaign.niche}</p>
                  </div>
                  <img src={campaign.imageUrl} alt={campaign.name} className="w-20 h-20 rounded-lg" />
                </div>
                <hr className="h-px my-4 bg-gray-300 border-0" />
                <div className="grid grid-cols-1 gap-y-4">
                  <div className='flex flex-row justify-between mr-6'>
                      <div>
                          <p>From: {campaign.startDate.slice(0, 10)}</p>
                          <p>To: {campaign.endDate.slice(0, 10)}</p>
                      </div>
                      <div>
                      <p>${campaign.budget}</p>
                      </div>
                  </div>
                  <button
                    className="p-2 border border-blue-500 hover:bg-blue-700 hover:text-white text-blue-500 rounded-lg"
                    onClick={() => viewCampaign(campaign)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default InfluencerFindPage;
