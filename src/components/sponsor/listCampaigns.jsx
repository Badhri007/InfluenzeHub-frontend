import React, { useState, useEffect } from 'react'
import AdRequests from './AdRequests';
import { useNavigate } from 'react-router-dom';



const ListCampaigns = ({ data = [] }) => {


  const navigate=useNavigate();
  const [currentCampaign,setCurrentCampaign]=useState([]);

  const viewCampaign = async (campaign_id) => {
    console.log("Campaign id:", campaign_id);

    const url = "http://localhost:5000/getParticularCampaign";
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'campaignid': campaign_id
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data from backend:", data);
        setCurrentCampaign(data);
        navigate(`/campaign/${campaign_id}`, { state: { currentCampaign: data } });

      } else {
        console.error('Error fetching campaigns:', response.status, response.statusText);
      }

    }

    catch (err) {
      console.log("Error in getting particular campaign:", err);
    }
  }


  return (
    <div className='bg-black'>
      ListCampaigns
      <div className='grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4   gap-3'>
        {data.map((campaign, index) =>
          <div className='bg-white rounded-md p-4 flex flex-col'>
            <div className='flex flex-row'>
              <div className='flex flex-col'>
                <p className='font-roboto font-semibold text-xl' key={index}>{campaign.name}</p>
                <br />
                <p className='text-medium font-normal'>{campaign.niche}</p>
              </div>
              <div className='ml-auto'>
                <img src={campaign.imageUrl} className='w-20 h-20 rounded-lg'></img>
              </div>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0" />
            <div className="grid grid-cols-2">
              <div>
                <label className='text-sm text-gray-600'>Visibility</label>
                <p className='text-md font-medium'>{campaign.visibility}</p>
              </div>
              <div>
                <label className='text-sm text-gray-600'>Start Date</label>
                <p className='text-sm font-medium'>{campaign.startDate.slice(0, 10).split("-").reverse().join("/")}</p>
                <br />
              </div>

              <div>
                <label className='text-sm text-gray-600'>End Date</label>
                <p className='text-sm font-medium'>{campaign.endDate.slice(0, 10).split("-").reverse().join("/")}</p>
              </div>
              <div>
                <label className='text-sm text-gray-600'>Budget</label>
                <p className='text-md font-medium'>{campaign.budget}</p>
                <br />
              </div>
              <button className='p-2 border border-blue-500 hover:bg-blue-700 cursor-pointer hover:text-white text-blue-500 rounded-lg w-[50%]' onClick={() => { viewCampaign(campaign._id) }}>View</button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}


export default ListCampaigns;