import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import editIcon from '../../assets/edit2.png';
import plusIcon from '../../assets/gplus2.svg';
// import plusIcon from '../../assets/whiteplus.svg';
import deleteIcon from '../../assets/delete.png';


const ListCampaigns = ({ campaigns = [], onFilterChange, fetchCampaigns,setCampaignData, setDisplayCampaignForm }) => {
  const navigate = useNavigate();

  // Function to view a specific campaign
  const viewCampaign = async (campaign_id) => {
    console.log("Campaign id:", campaign_id);

    const url = "http://localhost:5000/getParticularCampaign";
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'campaignid': campaign_id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data from backend:", data);
        navigate(`/campaign/${campaign_id}`, { state: { currentCampaign: data } });
      } else {
        console.error('Error fetching campaigns:', response.status, response.statusText);
      }
    } catch (err) {
      console.log("Error in getting particular campaign:", err);
    }
  };

  // Function to handle campaign edit
  const handleEdit = (campaign_id) => {
    const selectedCampaign = campaigns.find((campaign) => campaign._id === campaign_id);
    setCampaignData(selectedCampaign);
    console.log("Selected campaign for edit:", selectedCampaign);
    setDisplayCampaignForm(true);
  };

  const handleAddCampaign = () => {
    // Reset the campaign form fields
    setCampaignData({
      _id: '',
      name: '',
      sponsorId: '',
      description: '',
      niche: '',
      budget: '',
      visibility: '',
      startDate: '',
      endDate: '',
      campaignFile: null,
      imageUrl: '',
    });
    setDisplayCampaignForm(true); // Open the campaign form
  };


  const handleDeleteCampaign=async(campaign_id)=>{
    console.log("Delete campaign Id:",campaign_id);

    try
    {
      const url="http://localhost:5000/deleteCampaign"
      const response=await fetch(url,{
        method:"DELETE",
        headers:{
          "Content-Type":"Application/JSON",
          "campaign_id":campaign_id
        }
      });

      const data=await response.json();
      fetchCampaigns();
      console.log("Data after deleting:",data);
    }

    catch(err)
    {
      console.log("Error in deleting Campaign:",err);
    }

  }

  return (
    <div className='bg-gray-100 p-2 h-full'>
      <p className='text-center text-xl font-semibold'>My Campaigns</p>
      <br />
      <SearchBar onFilterChange={onFilterChange} />
      <br />
      <div className='grid grid-cols-1 w-[90%] m-auto md:grid-cols-3 lg:grid-cols-4 gap-4'>
      <div className='bg-white shadow-xl rounded-xl p-4 flex flex-col m-1 hover:scale-110 transition-all duration-300' onClick={handleAddCampaign}>
        <img src={plusIcon} className='w-[50%] h-[50%] m-auto' ></img>
      </div>
        {campaigns.map((campaign, index) => (
          <div key={campaign._id} className='bg-white shadow-xl rounded-xl p-4 m-1 flex flex-col hover:scale-110 transition-all duration-300 cursor-pointer'>
            <div className='flex flex-row'>
              <div className='flex flex-col'>
                <p className='font-roboto font-semibold text-xl'>{campaign.name}</p>
                <br />
                <p className='text-medium font-normal'>{campaign.niche}</p>
              </div>
              <div className='ml-auto'>
                <img src={campaign.imageUrl} alt={campaign.name} className='w-20 h-20 rounded-lg' />
              </div>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0" />
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <label className='text-sm text-gray-600'>Visibility</label>
                <p className='text-md font-medium'>{campaign.visibility}</p>
              </div>
              <div>
                <label className='text-sm text-gray-600'>Start Date</label>
                <p className='text-sm font-medium'>{campaign.startDate.slice(0, 10).split("-").reverse().join("/")}</p>
              </div>
              <div>
                <label className='text-sm text-gray-600'>End Date</label>
                <p className='text-sm font-medium'>{campaign.endDate.slice(0, 10).split("-").reverse().join("/")}</p>
              </div>
              <div>
                <label className='text-sm text-gray-600'>Budget</label>
                <p className='text-md font-medium'>{campaign.budget}</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <img src={deleteIcon} alt="Delete Campaign" className='w-9 h-9 cursor-pointer' onClick={()=>{handleDeleteCampaign(campaign._id)}} />
                <img
                  src={editIcon}
                  alt="Edit Campaign"
                  className='w-10 h-10 cursor-pointer align-middle'
                  onClick={() => handleEdit(campaign._id)}
                />

              </div>
              <button
                className='p-2 border border-blue-500 hover:bg-blue-700 cursor-pointer hover:text-white text-blue-500 rounded-lg w-[50%] ml-auto'
                onClick={() => viewCampaign(campaign._id)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCampaigns;



