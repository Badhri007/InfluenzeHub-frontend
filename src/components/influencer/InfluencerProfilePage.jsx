import React, { useState, useEffect } from 'react';
import SponsoNavbar from '../sponsor/SponsoNavbar';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';
import twitterIcon from '../../assets/twitter.png';
import youtubeIcon from '../../assets/youtube.png';
import linkedinIcon from '../../assets/linkedin.png';
import instagramIcon from '../../assets/instagram.png';
import reachIcon from '../../assets/graph.png'

const InfluencerProfilePage = () => {
  const [influencerProfile, setInfluencerProfile] = useState({});
  const influencer_id = document.URL.split("/")[4];

  const fetchInfluencer = async () => {
    const url = `http://localhost:5000/getInfluencer/`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'influencer_id': influencer_id,
        },
      });
      const data = await response.json();
      setInfluencerProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfluencer();
  }, [influencer_id]);

  // Helper function to return the appropriate platform icon
  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />;
      case 'Youtube':
        return <img src={youtubeIcon} alt="Youtube" className="w-6 h-6" />;
      case 'LinkedIn':
        return <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />;
      case 'Twitter':
        return <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />;
      default:
        return <></>; // Return an empty fragment if the platform doesn't match
    }
  };

  return (
    <div>
      <SponsoNavbar />
      <div className="text-center text-2xl font-semibold font-sans mt-3">
        {influencerProfile.username}'s Profile
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          {influencerProfile.profile_photo_url ? (
            <img
              src={influencerProfile.profile_photo_url}
              className="bg-gray-50 shadow-xl w-[60%] h-40 md:w-[70%] md:h-[70%] rounded-full p-1"
              alt="Influencer"
            />
          ) : influencerProfile.gender === 'Male' ? (
            <img
              src={maleIcon}
              className="w-28 h-28 md:w-40 md:h-40 bg-gray-50 rounded-full shadow-xl"
              alt="Male Influencer"
            />
          ) : (
            <img
              src={femaleIcon}
              className="w-28 h-28 md:w-40 md:h-40 bg-gray-50 rounded-full shadow-xl"
              alt="Female Influencer"
            />
          )}
        </div>

        {/* Influencer Info - Left */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-lg font-medium">{influencerProfile.username}</p>
          <p>{influencerProfile.niche}</p>
        </div>

        {/* Influencer Info - Right */}
        <div className="flex flex-col justify-center items-center space-y-2">
         <p> <img src={reachIcon} className='w-6 h-6 inline-block mb-3'/> <span className='ml-2'>Reach: {influencerProfile.reach} </span></p>
          <br/>
          <p>Platform: {influencerProfile.platform}</p>
          <br/>
          <p>
            <a
              href={influencerProfile.social_media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              {renderPlatformIcon(influencerProfile.platform)} 
              <span className="ml-2">Social Media</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfilePage;
