import React,{useState,useEffect} from 'react'
import InfluNavbar from './InfluNavbar'
import plusIcon from '../../assets/plus.png'
import SearchBar from '../sponsor/SearchBar'

const InfluencerFindPage = () => {

    // const [campaigns,setAllCampaigns]=useState([]);
    const [filt_campaigns,setFilteredCampaigns]=useState([]);



    


    const fetchCampaigns = async () => {
        try {
        //   const sponsor_Id = localStorage.getItem("sponsorId");
        //   console.log("In frontend: ", sponsor_Id);
        //   if (!sponsor_Id) {
        //     console.error('User ID not found in localStorage');
        //     return;
        //   }
    
          const url = `http://localhost:5000/getAllPublicCampaigns`;
    
          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          if (response.ok) {
            const data = await response.json();
            setFilteredCampaigns(data);
            console.log("Data from backend:", data);
    
          } else {
            console.error('Error fetching expenses:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      };
    
      useEffect(() => {
        fetchCampaigns();
      }, []);
    
    const handleFilterChange = (filteredData) => {
    setFilteredCampaigns(filteredData); 
    };


  return (

    <div className='bg-gray-100 p-2 h-full'>
        <InfluNavbar/>
        <br/>
        <p className='text-center text-xl font-semibold'>All Public Campaigns</p>
        <br />
        <SearchBar onFilterChange={handleFilterChange} onlyPublic='true'/>
        <br />
        <div className='grid grid-cols-1 w-[90%] m-auto md:grid-cols-3 lg:grid-cols-4 gap-4'>
    
            {filt_campaigns.map((campaign, index) => (
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
                <button
                    className='p-2 border border-blue-500 hover:bg-blue-700 cursor-pointer hover:text-white text-blue-500 rounded-lg w-[50%] ml-auto'
                    // onClick={() => viewCampaign(campaign._id)}
                >
                    View
                </button>
                <button
                    className='p-2 border border-blue-500 hover:bg-blue-700 cursor-pointer hover:text-white text-blue-500 rounded-lg w-[50%] ml-auto'
                    // onClick={() => viewCampaign(campaign._id)}
                >
                    Request
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
  )
}

export default InfluencerFindPage