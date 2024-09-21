import React, { useEffect, useState } from 'react';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';
import loadingIcon from '../../assets/loadingIcon.png';

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

  const [advertisement,setAdvertisement]=useState({
    name:'',
    campaign_id:'',
    requirements:'',
    payment_amount:'',
    status:'',
    campaignName:''
  });

  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); // Track only image upload state

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
        setProfile(data); // Set the fetchedcon profile data
      } catch (err) {
        console.log(err);
      }
    };


    const getAdRequests=async()=>{
      const url='http://localhost:5000/getAllInfluAdRequests/'
      try{
          const response = await fetch(url,{
            method:"GET",
            headers:{
              'Content-Type':'Application/JSON',
              'influencer_id':influencer_id
            }
          })
          const data = await response.json();
          setAdvertisement(data);
          console.log("Ad requests:",data);
      }
      catch(err)
      {
        console.log("Error in getting all adrequests");
      }
    }

    fetchInfluencer();
    getAdRequests();
  }, [influencer_id]);

  const handleImageUpload = async () => {
    if (!file) {
      // No new file selected, return existing imageUrl
      return profile.profile_photo_url || '';
    }

    setIsImageUploading(true); // Start loading when image upload starts

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'influencer-upload');
    formData.append('api_key', '153934842354119');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dg3brbocw/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
       // Stop loading after image upload is complete

      if (response.ok) {
        setImageUrl(data.secure_url); // Save the uploaded image URL
        return data.secure_url;
      } else {
        console.error('Upload failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Error uploading the image:', error);
      setIsImageUploading(false); // Stop loading on error
      return null;
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === 'profile-photo') {
      setFile(e.target.files[0]);
    } else {
      // Handle other input changes
      setProfile((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleProfileUpdate = async () => {
    const uploadedImageUrl = await handleImageUpload();
    
    if (!file) {
      // Set isSubmitting to true only if image is not being uploaded
      setIsSubmitting(true);
    }

    const updatedProfile = {
      ...profile,
      profile_photo_url: uploadedImageUrl || profile.profile_photo_url,
    };

    console.log("Updated Profile:", updatedProfile);

    try {
      const url = `http://localhost:5000/updateProfile`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      });

      const data = await response.json();
      if (!file) {
        setIsSubmitting(false); 
      }

      if (response.ok) {
        setProfile(data); 
      }
      setIsImageUploading(false);
      console.log("Data response got:", data);

    } catch (err) {
      console.log("Error updating profile:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-2'>
      
      <div className='flex flex-row h-full bg-gray-200 md:w-[50%] lg:w-[25%]  items-center justify-center sm:ml-0 sm:justify-center md:items-center md:justify-center'>
        <br/>
        <div>
        <br/>
        <div className='text-center m-auto text-xl font-semibold'>My Profile</div>
        <br/>
        <div className="flex flex-col items-center justify-center">
          {
            profile.profile_photo_url ? (
              <img src={profile.profile_photo_url} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]  shadow-2xl' alt="Profile" />
            ) : (
              profile.gender === 'Male' ? (
                <img src={maleIcon} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]' alt="Male Icon" />
              ) : (
                <img src={femaleIcon} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]' alt="Female Icon" />
              )
            )
          }
          <br/>
          <input type="file" className="ml-10" name="profile-photo" onChange={handleChanges} />
          <br />
          
        </div>

        {/* Editable Fields */}
        <div className='flex flex-col justify-start md:ml-10'>
          <div className="flex flex-row">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              className="ml-2 p-1  rounded-xl border-gray-400"
              value={profile.username}
              onChange={handleChanges}
            />
          </div>

          <div className="flex flex-row mt-4">
            <label>Niche: </label>
            <input
              type="text"
              name="niche"
              className="ml-2 p-1 rounded-xl  border-gray-400"
              value={profile.niche}
              onChange={handleChanges}
            />
          </div>

          <div className="flex flex-row mt-4">
            <label>Platform: </label>
            <input
              type="text"
              name="platform"
              className="ml-2 p-1 rounded-xl  border-gray-400"
              value={profile.platform}
              onChange={handleChanges}
            />
          </div>

          <div className="flex flex-row mt-4">
            <label>Reach: </label>
            <input
              type="text"
              name="reach"
              className="ml-2 p-1 rounded-xl  border-gray-400"
              value={profile.reach}
              onChange={handleChanges}
            />
          </div>

          {/* Update Button */}
          <button onClick={handleProfileUpdate} className="mt-4 bg-blue-500 hover:bg-green-500 transition-all hover:scale-110 text-white p-2 rounded">
            Update Profile
          </button>
        </div>
      </div>
      

      {/* Show loading icon only during image upload */}
      {(isImageUploading || isSubmitting) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <img src={loadingIcon} className="w-10 h-10 animate-spin" alt="Loading" />
        </div>
      )}

    
    </div>

    <div className='w-[80%]'>
  <p className="p-5">Welcome {profile.username}!</p>
  <div className="w-full m-auto shadow-lg rounded-xl overflow-auto">
  {
    advertisement.length > 0 ? (
      <table className='w-full text-sm text-left rtl:text-right text-black-500'>
        <thead className='bg-gray-100'>
          <tr>
            <th scope="col" className="px-6 py-3">AD.NAME</th>
            <th scope="col" className="px-6 py-3">REQUIREMENTS</th>
            <th scope="col" className="px-6 py-3">CAMPAIGN</th>
            <th scope="col" className="px-6 py-3">STATUS</th>
          </tr>
        </thead>
        <tbody>
        {advertisement.map((ad, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-100">
            <td className="px-6 py-3">{ad.name}</td>
            <td className="px-6 py-3">{ad.requirements}</td>
            <td className="px-4 py-3">{ad.campaignName}</td>
            <td className="px-6 py-3">
              <button className='p-2 px-3 mr-2 text-white rounded-xl shadow-lg bg-amber-400'>View</button>
              {ad.status === 'pending' ? (
                <>
                  <button className='p-2 mr-2 text-white rounded-xl shadow-lg bg-green-400'>Accept</button>
                  <button className='p-2 mr-2 text-white rounded-xl shadow-lg bg-red-400'>Reject</button>
                </>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>

      </table>
     
    ) : (
      <p>No advertisements available</p>
    )
  }
   </div>
</div>

    </div>
  );
};

export default InfluHomePage;
