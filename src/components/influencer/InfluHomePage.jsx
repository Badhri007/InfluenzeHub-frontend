import React, { useEffect, useState } from 'react';
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';
import loadingIcon from '../../assets/loadingIcon.png';
import RequestViewModal from './RequestViewModal';

const InfluHomePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    gender: '',
    niche: '',
    email: '',
    platform: '',
    reach: '',
    profile_photo_url: '',
    social_media_url:''
  });



  const [advertisement,setAdvertisement]=useState([]);



  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);



  let influencer_id = localStorage.getItem("influencerId");

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
        if(data.profile_photo_url)
        {
           setFile(data.profile_photo_url);
        }
        else if(data.gender === "Male")
        {
           setFile(maleIcon);
        }
        else{
          setFile(femaleIcon);
        }


        setProfile(data);
         // Set the fetchedcon profile data
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

  useEffect(() => {
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
      try{
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend=()=>{
        setFile(reader.result)
      }
    }
    catch(er){
      setFile(file)
    }
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


  const [selectedAd,setSelectedAd]=useState(null)

  const handleStatus = async (e,ad_id) => {
    const { value } = e.target;
    console.log("Status:", value);

    let newAd;

    const updatedAds = advertisement.map((ad) => {
      if (ad.ad_id === ad_id) {
        console.log("id:",ad_id);
        console.log("press:",value);
        newAd={ ...ad, status: value };
        console.log("Upd Ad:", newAd);
        return newAd;
      }
      return ad;
    });

    setAdvertisement(updatedAds);

    console.log("Up:",newAd);

    try {
      const url = "http://localhost:5000/updateAd/";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'Application/JSON',
          'influencer_id': influencer_id
        },
        body: JSON.stringify(newAd)
      });

      const data = await response.json();
      if (response.ok) {
        setAdvertisement(data); // Update the advertisement state with the new data
      }

      console.log("Updated status data:", data);
      getAdRequests();

      if(isModalOpen===true)
      {
        setIsModalOpen(false);
      }

    } catch (err) {
      console.log("Error in updating:", err);
    }
  };

  const [activeCampaignPage, setActiveCampaignPage] = useState(1);
  const [newRequestPage, setNewRequestPage] = useState(1);
  const ITEMS_PER_PAGE=3;
  const ACTIVE_ITEMS_PER_PAGE=2;

  const getActiveRequests = () => {
    if (!Array.isArray(advertisement)) return [];
    const activeCampaigns = advertisement.filter(ad => ad.campaignName && (ad.status === "accept" || ad.status === "view"));
    const startIndex = (activeCampaignPage - 1) * ACTIVE_ITEMS_PER_PAGE;
    console.log("PG:",activeCampaigns.slice(startIndex, startIndex + ACTIVE_ITEMS_PER_PAGE));
    return activeCampaigns.slice(startIndex, startIndex + ACTIVE_ITEMS_PER_PAGE);
  };


  const getNewRequests = () => {
    if (!Array.isArray(advertisement)) return [];
    const newRequests = advertisement.filter(ad => ad.campaignName && ad.status === 'pending');
    const startIndex = (newRequestPage - 1) * ITEMS_PER_PAGE;


    return newRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Function to handle page changes
  const handlePageChange = (type, newPage) => {
    if (type === 'active') {
      setActiveCampaignPage(newPage);
    } else if (type === 'request') {
      setNewRequestPage(newPage);
    }
  };

  const handleAdView = (ad) => {
    setIsModalOpen(true);
    console.log("Detials:",ad);
    setSelectedAd(ad);// Open the modal when "View" is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };




  return (
    <div className='flex flex-col md:flex-row gap-2'>
       <div className='flex flex-row h-screen bg-gray-200 md:w-[50%] lg:w-[25%]  justify-center  sm:ml-0 sm:justify-center sm:items-center md:items-start md:justify-center'>
        <br/>
        <div>
        <br/>
        <div className='text-center m-auto text-xl font-semibold'>My Profile</div>
        <br/>
        <div className="flex flex-col items-center justify-center">

          <img src={file} alt="" className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]  shadow-2xl p-1  border-black border-1 bg-white' />

          <br/>
          <label className="inline-block bg-blue-500 text-white p-2 rounded-full hover:bg-green-500">Select Photo<input type="file" className="hidden" name="profile-photo" onChange={handleChanges}/></label>

          <br />

        </div>

        {/* Editable Fields */}
        <div className='flex flex-col w-[80%] m-auto items-center justify-start md:ml-10'>
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
              className="ml-9 p-1 rounded-xl  border-gray-400"
              value={profile.niche}
              onChange={handleChanges}
            />
          </div>

          <div className="flex flex-row mt-4">
            <label>Platform: </label>
            <input
              type="text"
              name="platform"
              className="ml-4 p-1 rounded-xl  border-gray-400"
              value={profile.platform}
              onChange={handleChanges}
            />
          </div>

          <div className="flex flex-row mt-4">
            <label>Reach: </label>
            <input
              type="text"
              name="reach"
              className="ml-8 p-1 rounded-xl  border-gray-400"
              value={profile.reach}
              onChange={handleChanges}
            />
          </div>
          {/* Update Button */}

          <button onClick={handleProfileUpdate} className="mt-4 mb-2.5  w-[80%] bg-blue-500 hover:bg-green-500 transition-all hover:scale-110 text-white p-3 rounded-full">
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

      <div className='w-[100%]'>
        <p className="p-5">Welcome {profile.username}!</p>
        <p className='px-5 pb-5'>Active campaigns</p>
        <div className="flex-grow relative overflow-auto">
        <div className="w-full m-auto shadow-lg rounded-xl overflow-auto">
          {advertisement.length > 0 ? (
            <table className='w-full text-sm text-left rtl:text-right text-black-500'>
              <thead className='bg-gray-100'>
                <tr>
                  <th scope="col" className="px-6 py-3 w-[25%]">CAMPAIGN</th>
                  <th scope="col" className="px-6 py-3 w-[25%]">SPONSOR</th>
                  <th scope="col" className="px-6 py-3 w-[20%]">AMOUNT</th>
                  <th scope="col" className="px-6 py-3 w-[30%]">STATUS</th>
                </tr>
              </thead>
              <tbody>
              {getActiveRequests().map((ad, index) => (
                ad.campaignName && ((ad.status==="accept") || (ad.status==="view")) && (
                  <tr key={index} className="odd:bg-white even:bg-gray-100 hover:bg-green-300">
                    <td className="px-6 py-3">{ad.campaignName}</td>
                    <td className="px-6 py-3">{ad.sponsorName}</td>
                    <td className="px-6 py-3">{ad.payment_amount}</td>
                    <td className="px-6 py-3">
                      <button className='p-2 mr-2 text-white rounded-xl shadow-lg bg-amber-400'onClick={() => handleAdView(ad)}>View</button>
                    </td>
                  </tr>
                )
              ))}

              {isModalOpen && (
                      <RequestViewModal onClose={closeModal} adDetails={selectedAd} /> // Pass a close function as a prop
                    )}
              </tbody>
            </table>
          ) : (
            <p>No advertisements available</p>
          )}

         </div>
         <div className='flex justify-evenly m-2'>
          <button className='bg-blue-400 text-white rounded-full p-2 disabled:bg-gray-300' disabled={activeCampaignPage === 1}  onClick={() => handlePageChange('active', activeCampaignPage - 1)}>Previous</button>
          <button className='bg-blue-400 text-white rounded-full p-2 disabled:bg-gray-300' disabled={getActiveRequests().length < ACTIVE_ITEMS_PER_PAGE} onClick={() => handlePageChange('active', activeCampaignPage + 1)}>Next Page</button>
        </div>

         <br/>
        <label className='p-2'>New Requests</label>
        <br/>
          <br/>
          <div className="flex-grow relative overflow-auto">
        <div className="w-full m-auto shadow-lg rounded-xl overflow-auto">
          {advertisement.length > 0 ? (
            <table className='w-full text-sm text-left rtl:text-right text-black-500'>
              <thead className='bg-gray-100'>
                <tr>
                  <th scope="col" className="px-6 py-3 w-[25%]">CAMPAIGN</th>
                  <th scope="col" className="px-6 py-3 w-[25%]">SPONSOR</th>
                  <th scope="col" className="px-6 py-3 w-[20%]">AMOUNT</th>
                  <th scope="col" className="px-6 py-3 w-[30%]">STATUS</th>
                </tr>
              </thead>
              <tbody>
              {getNewRequests().map((ad, index) => (
                ad.campaignName && ad.status === 'pending' && (
                  <tr key={index} className="odd:bg-white even:bg-gray-100 hover:bg-green-300">
                    <td className="px-6 py-3">{ad.campaignName}</td>
                    <td className="px-6 py-3">{ad.sponsorName}</td>
                    <td className="px-6 py-3">{ad.payment_amount}</td>
                    <td className="px-6 py-3">
                      <button className='p-2 px-3 mr-2 text-white rounded-xl shadow-lg bg-amber-400'onClick={() => handleAdView(ad)}>View</button>
                      <button className='p-2 mr-2 text-white rounded-xl shadow-lg bg-green-400' value="accept" onClick={(e) => handleStatus(e, ad.ad_id)}>Accept</button>
                      <button className='p-2 mr-2 text-white rounded-xl shadow-lg bg-red-400' value="reject" onClick={(e) => handleStatus(e, ad.ad_id)}>Reject</button>
                    </td>
                  </tr>
                )
              ))}

            {isModalOpen && (
              <RequestViewModal onClose={closeModal} adDetails={selectedAd} handleStatus={handleStatus}/> // Pass a close function as a prop
            )}
            </tbody>

            </table>

          ) : (
            <p>No advertisements available</p>
          )}
        </div>

        <div className='flex justify-evenly m-2'>
          <button className='bg-blue-400 text-white rounded-full p-2 disabled:bg-gray-300' disabled={newRequestPage === 1}  onClick={() => handlePageChange('request', newRequestPage - 1)}>Previous</button>
          <button className='bg-blue-400 text-white rounded-full p-2 disabled:bg-gray-300' disabled={getNewRequests().length < ITEMS_PER_PAGE} onClick={() => handlePageChange('request', newRequestPage + 1)}>Next Page</button>
        </div>


        </div>
        </div>
      </div>
    </div>
  );
};

export default InfluHomePage;
