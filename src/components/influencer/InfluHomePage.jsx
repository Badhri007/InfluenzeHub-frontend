import React, { useEffect, useState } from 'react';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';

const InfluHomePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    gender: '',
    niche: '',
    email: '',
    platform: '',
    reach: '',
    profile_photo_url: ''
  });

  let influencer_id = localStorage.getItem("influencerId");

  useEffect(() => {
    const fetchInfluencer = async () => {
      const url = `http://localhost:5000/getInfluencer/`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'influencer_id': influencer_id
          },
        });
        const data = await response.json();
        setProfile(data); // Set the fetched profile data
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfluencer();
  }, [influencer_id]);

  return (
    <div>
    <div className='flex flex-col items-center justify-center sm:ml-0 sm:justify-center md:ml-10 md:items-start md:justify-start'>
      <div>InfluHomePage</div>
      <div >
        {
          profile.profile_photo_url ? (
            <img src={profile.profile_photo_url} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]' alt="Profile" />
          ) : (
            profile.gender === 'Male' ? (
              <img src={maleIcon} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]' alt="Male Icon" />
            ) : (
              <img src={femaleIcon} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]' alt="Female Icon" />
            )
          )
        }
         <input type="file" className="ml-10"/>
         <br/>
         <br/>
      </div>
        <div className='flex flex-col justify-start md:ml-10'>
        <div className="flex flex-row">
        <label>Username : </label>
        <p className='ml-2'> {profile.username}</p>
        </div>
        <div className="flex flex-row">
        <label>Niche : </label>
        <p className='ml-2'>{profile.niche}</p>
        </div>
        <div className="flex flex-row">
        <label>Platform : </label>
        <p className='ml-2'>{profile.platform}</p>
        </div>
        <div className="flex flex-row">
        <label>Reach : </label>
        <p className='ml-2'>{profile.reach}</p>
        </div>
       
      </div>
    </div>
    </div>
  );
};

export default InfluHomePage;
