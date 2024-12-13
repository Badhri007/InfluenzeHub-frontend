import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SponsoNavbar from './SponsoNavbar';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg'; // Assuming you have maleIcon for male influencers
import FilterPage from './FilterPage';

const FindPage = () => {
  const [influencers, setAllInfluencers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const idCampaign = location.state?.campaignId || "empty";

  const getAllInfluencers = async () => {
    const url = "http://localhost:5000/getAllInfluencers";
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAllInfluencers(data);
        console.log("Data from backend:", data);
      } else {
        console.error('Response not ok:', response.status, response.statusText);
      }
    } catch (err) {
      console.log("Error fetching influencers:", err);
    }
  };

  useEffect(() => {
    getAllInfluencers();
  }, []);

  const handleChoose = (influencer) => {
    navigate('/campaign/' + location.state.campaignId, {
      state: {
        selectedInfluencer: influencer.username, // Pass selected influencer
        ...location.state.formData, // Spread previous form data
      },
    });
  };

  const handleFilterChange = (filt_influencers) => {
    setAllInfluencers(filt_influencers);  // Update the filtered campaigns based on search
  };

  const handleView=(influencerId)=>{
    navigate('/influencer/'+ influencerId);
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <SponsoNavbar />
      <FilterPage handleFilterChange={handleFilterChange}/>
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
          {influencers.map((influencer, index) => (
            <div
              key={index}
              className='bg-white shadow-lg rounded-xl flex flex-col items-center justify-center w-[80%] m-4 p-4  hover:scale-95 transition-all' >
              {influencer.profile_photo_url ? (
                <img src={influencer.profile_photo_url} className='bg-gray-50 shadow-xl w-[70%] h-40  md:w-[80%] md:h-[90%] rounded-[50%] p-1' alt='Influencer' />
              ) : influencer.gender === "Male" ? (
                <img src={maleIcon} className='w-[80%] h-[90%] bg-gray-50 rounded-[50%] shadow-xl' alt='Male Influencer' />
              ) : (
                <img src={femaleIcon} className='w-[80%] h-[90%] bg-gray-50 rounded-[50%] shadow-xl' alt='Female Influencer' />
              )}
              <p className='mt-2 font-semibold cursor-pointer hover:text-red-500 hover:underline' onClick={()=>{handleView(influencer._id)}}>{influencer.username}</p>
              <p className='mt-2 text-sm cursor-pointer' >{influencer.niche}</p>
              <button className='p-2 mt-1 rounded-2xl text-green-500 border-green-500 hover:bg-green-400 hover:text-white border-2 bg-white' onClick={()=>{handleView(influencer._id)}}>View Profile</button>
              {idCampaign!=="empty" && 
              (<button
                className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4'
                onClick={() => handleChoose(influencer)}>
                Request
              </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindPage;
