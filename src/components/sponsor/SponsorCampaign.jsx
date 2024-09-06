import React, { useState,useEffect } from 'react';
import SponsoNavbar from './SponsoNavbar';
import addIcon from '../../assets/addIcon.png';
import loadingIcon from '../../assets/loadingIcon.png';
import ListCampaigns from './listCampaigns';


const SponsorCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    sponsorId:'',
    description: '',
    niche: '',
    budget:'',
    visibility:'',
    startDate: '',
    endDate:'',
    campaignFile: null,
  });


  const [imageUrl, setImageUrl] = useState('');
  const [displayCampaignForm, setDisplayCampaignForm] = useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    if (name === 'campaignFile') {
      setCampaignData((prevData) => ({
        ...prevData,
        sponsorId:localStorage.getItem("sponsorId"),
        campaignFile: files[0],
      }));
    } else {
      setCampaignData((prevData) => ({
        ...prevData,
        sponsorId:localStorage.getItem("sponsorId"),
        [name]: value,
      }));
    }
  };



  const handleImageUpload = async () => {
    if (!campaignData.campaignFile) {
      console.error('No file selected');
      return null;
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const formData = new FormData();
    formData.append('file', campaignData.campaignFile);
    formData.append('timestamp', timestamp);
    formData.append('upload_preset', 'influencer-upload');
    formData.append('api_key', '153934842354119');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dg3brbocw/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url); // Save the uploaded image URL
        return data.secure_url;
      } else {
        console.error('Upload failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Error uploading the image:', error);
      return null;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    

    setIsSubmitting(true);

    const uploadedImageUrl = await handleImageUpload();

    if (uploadedImageUrl) {
      const formData = {
        ...campaignData,
        imageUrl: uploadedImageUrl,
      };

      console.log(formData);

      try {
        const url = "http://localhost:5000/storeCampaign";
        const response=await fetch(url,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      const data = await response.json();
      setIsSubmitting(false);
      setDisplayCampaignForm(false);
      fetchCampaigns();
      console.log("Data response got:",data);

      }
      catch (err) {
        console.log("Error storing campaign Data:", err);
      }
    }
  };

  const [campaigns,setCampaigns]=useState([]);



const fetchCampaigns = async () => {
    try {
        const sponsor_Id = localStorage.getItem("sponsorId");
        console.log("In frontend: ", sponsor_Id);
        if (!sponsor_Id) {
            console.error('User ID not found in localStorage');
            return;
        }

        const url = `http://localhost:5000/getAllCampaigns`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'sponsorid': sponsor_Id
            }
        });

        if (response.ok) {
            const data = await response.json();
            setCampaigns(data);
            console.log("Data from backend:",data);

        } else {
            console.error('Error fetching expenses:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};
useEffect(() => {
    fetchCampaigns();
},[]);


  return (
    <div className='bg-gray-100'>
      <SponsoNavbar />
      <br />
      <ListCampaigns data={campaigns}/>
      <div className="flex flex-col justify-center items-center bg-gray-100">
       
        <img
          src={addIcon}
          onClick={() => setDisplayCampaignForm(true)}
          className="w-20 h-20"
          alt="Add Campaign"
        />
         Add Campaign
      </div>
      <br />
      {displayCampaignForm && (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={campaignData.title}
              onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Samsung s23 Ultra"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Description/Requirements
            </label>
            <textarea
              name="description"
              value={campaignData.description}
              onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Category/Niche
            </label>
            <select
              name="niche"
              value={campaignData.niche}
              onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Chips">Chips</option>
              <option value="Nestle-Food">Nestle-Food</option>
              <option value="Mutual Funds">Mutual Funds</option>
            </select>
          </div>


          <div className='mb-5'>
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">Budget</label>
            <input type="number" name="budget" value={campaignData.budget} onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              required></input>
          </div>

          <div className='mb-5'>
          <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">Visibility</label>
            <input type="radio" name="visibility" id="visible" value="public" onChange={handleChanges} className="mx-3 w-10 h-5 align-middle"/>Public
            <input type="radio" name="visibility" id="visible" value="private" onChange={handleChanges} className="mx-3 w-10 h-5 align-middle"/>Private<br/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={campaignData.startDate}
              onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={campaignData.endDate}
              onChange={handleChanges}
              className="bg-gray-50 mx-2 w-[90%] md:w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Image
            </label>
            <input
              name="campaignFile"
              type="file"
              onChange={handleChanges}
              className="mx-2"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      )}

{isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <img src={loadingIcon} className="w-10 h-10 animate-spin" alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default SponsorCampaign;
