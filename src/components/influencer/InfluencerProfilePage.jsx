import React, { useState, useEffect } from 'react';
import SponsoNavbar from '../sponsor/SponsoNavbar';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';
import twitterIcon from '../../assets/twitter.png';
import youtubeIcon from '../../assets/youtube.png';
import linkedinIcon from '../../assets/linkedin.png';
import instagramIcon from '../../assets/instagram.png';
import reachIcon from '../../assets/graph.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        background: "gray",
        borderRadius: "50%",
        width: "3rem", 
        height: "3rem",
        zIndex: 10,
        opacity: "0.7",
        position: "absolute",
        top: "50%", 
       
      }}
      onClick={onClick}
    >
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        background: "gray",
        borderRadius: "50%",
        width: "3rem", 
        height: "3rem",
        zIndex: 10,
        opacity: "0.7",
        position: "absolute",
        top: "50%", 
       
      }}
      onClick={onClick}
    >
    </div>
  );
}



const InfluencerProfilePage = () => {
  const [influencerProfile, setInfluencerProfile] = useState({});
  const [advertisement, setAdvertisement] = useState([]);
  const influencer_id = document.URL.split('/')[4];

  const fetchInfluencer = async () => {
    const url = `http://localhost:5000/getInfluencer/`;
    try {
      const response = await fetch(url, {
        method: 'GET',
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

  const fetchAllPublicAds = async () => {
    const url = 'http://localhost:5000/getAllPublicInfluAdRequests/';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'influencer_id': influencer_id,
        },
      });
      const data = await response.json();
      setAdvertisement(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfluencer();
    fetchAllPublicAds();
  }, [influencer_id]);

  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <img src={instagramIcon} alt="Instagram" className="w-6 h-6 inline-block" />;
      case 'Youtube':
        return <img src={youtubeIcon} alt="Youtube" className="w-6 h-6  inline-block" />;
      case 'LinkedIn':
        return <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6  inline-block" />;
      case 'Twitter':
        return <img src={twitterIcon} alt="Twitter" className="w-6 h-6  inline-block" />;
      default:
        return <></>;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SponsoNavbar />
      <div className="w-[95%] m-auto mt-5">
        {/* Influencer Profile Section */}
        <div className="text-center text-2xl font-semibold mb-4">{influencerProfile.username}'s Profile</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 shadow-lg rounded-lg">
          {/* Profile Image */}
          <div className="flex justify-center items-center">
            {influencerProfile.profile_photo_url ? (
              <img
                src={influencerProfile.profile_photo_url}
                className="w-40 h-40 rounded-xl shadow-xl"
                alt="Influencer"
              />
            ) : influencerProfile.gender === 'Male' ? (
              <img
                src={maleIcon}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-lg"
                alt="Male Influencer"
              />
            ) : (
              <img
                src={femaleIcon}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-lg"
                alt="Female Influencer"
              />
            )}
          </div>

          {/* Influencer Info - Left */}
          <div className="flex flex-col justify-center items-center space-y-2 text-center">
            <p className="text-xl font-medium">{influencerProfile.username}</p>
            <p className="text-gray-500">{influencerProfile.niche}</p>
          </div>

          {/* Influencer Info - Right */}
          <div className="flex flex-col justify-center items-center space-y-4">
            <p className="text-lg flex items-center">
              <img src={reachIcon} className="w-6 h-6 inline-block mr-2" alt="Reach Icon" /> Reach: {influencerProfile.reach}
            </p>
            <p className="text-lg">
              {renderPlatformIcon(influencerProfile.platform)}{' '}
              <span className="ml-2">{influencerProfile.platform}</span>
            </p>
            <a
              href={influencerProfile.social_media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              {renderPlatformIcon(influencerProfile.platform)}
              <span className="ml-2">Social Media</span>
            </a>
          </div>
        </div>

        {/* Ads and Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Public Ads */}
<div className="bg-white p-4 shadow-lg rounded-lg pb-8">
  <p className="text-center text-xl font-semibold mb-2">
    {influencerProfile.username}'s Public Ads
  </p>
  
  {advertisement.length >= 3 ? (
    // Render Slider if there are 3 or more ads
    <Slider {...settings}>
      {advertisement.map((ad, index) => (
        <div
          className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center justify-center text-center"
          key={index}
        >
          <div className='flex items-center justify-center'>
            <img
              src={ad.campaign_pic}
              className="w-28 h-28 rounded-full object-cover mb-4"
              alt={ad.name}
            />
          </div>
          <div>
            <p className="font-medium">{ad.name}</p>
            <p className="text-gray-500">{ad.campaignName}</p>
            <p className="text-gray-400">10 Days Campaign</p>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    // Render regular cards if there are less than 3 ads
    <div className={`grid grid-cols-${advertisement.length} gap-4 w-[50%]`}>
      {advertisement.map((ad, index) => (
        <div
          className="bg-gray-100 rounded-lg p-4 shadow-md text-center"
          key={index}
        >
          <div className="flex items-center justify-center">
            <img
              src={ad.campaign_pic}
              className="w-28 h-28 rounded-full object-cover mb-4"
              alt={ad.name}
            />
          </div>
          <div>
            <p className="font-medium">{ad.name}</p>
            <p className="text-gray-500">{ad.campaignName}</p>
            <p className="text-gray-400">10 Days Campaign</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

          {/* Stats */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-center text-xl font-semibold mb-4">Stats</p>
            <div className="flex flex-col items-center space-y-4">
              <label className="text-lg font-medium">Average Pay/Advertisement: $1200</label>
              <label className="text-lg font-medium">Total Ads: {advertisement.length}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfilePage;