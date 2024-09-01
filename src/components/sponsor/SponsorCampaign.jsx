import React, { useState } from 'react';
import SponsoNavbar from './SponsoNavbar';
import addIcon from '../../assets/addIcon.png';


const SponsorCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    niche: '',
    date: '',
    campaignFile: null, 
  });

  const [imageUrl, setImageUrl] = useState('');
  const [displayCampaignForm, setDisplayCampaignForm] = useState(false);

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    if (name === 'campaignFile') {
      setCampaignData((prevData) => ({
        ...prevData,
        campaignFile: files[0], 
      }));
    } else {
      setCampaignData((prevData) => ({
        ...prevData,
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
    setDisplayCampaignForm(false);

    const uploadedImageUrl = await handleImageUpload();

    if (uploadedImageUrl) {
      const formData = {
        ...campaignData,
        imageUrl: uploadedImageUrl,
      };

      console.log(formData);
      // Here you can send the form data to your backend server using fetch if needed
    }
  };

  return (
    <div>
      <SponsoNavbar />
      <br />
      <div className="flex flex-col justify-center items-center">
        SponsorCampaign
        <img
          src={addIcon}
          onClick={() => setDisplayCampaignForm(true)}
          className="w-20 h-20"
          alt="Add Campaign"
        />
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
              Description
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
          <div className="mb-5">
            <label className="block mb-2 mx-2 text-sm font-medium text-gray-900">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={campaignData.date}
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
    </div>
  );
};

export default SponsorCampaign;
