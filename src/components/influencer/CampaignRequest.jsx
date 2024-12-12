import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CampaignRequest = ({ open, onClose, setOpen, campaign }) => {

  const [sponsorId,setSponsorId]=useState();
  const [campaignSponsor,setCampaignSponsor] = useState();

  const [formData, setFormData] = useState({
    adname: '',
    message: '',
    payment_amount: '',
    campaignSponsor: campaignSponsor ||'',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const influencerid= localStorage.getItem("influencerId");
  // console.log("Influencer Id:", influencerid);



  const getSponsor = async()=>{
    const url = 'http://localhost:5000/getSponsorById';
  
    try {
    const response = await fetch(url, {
        headers: {
        'Content-Type': 'application/json',
        'sponsorid':campaign.sponsorId
        },
    });

    if(response.ok)
    {
        const data = await response.json();
        console.log('Sponsor name:', data);
        setCampaignSponsor(data);
        setOpen(false);
    }
   
    else {
        console.error('Error:', response.status, response.statusText);
      }

    } catch (err) {
    console.log('Error in storing ad request:', err);
    }

}

useEffect(()=>{
  setSponsorId(campaign.sponsorId);
  getSponsor();
},[])



  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const storeAdRequestForInfluencer = async (e) => {
    e.preventDefault();
    const requestData = {
      adname:formData.adname,
      message:formData.message,
      campaignSponsor : campaignSponsor,
      payment_amount: formData.payment_amount,
      status: 'pending',
      campaignId: campaign._id,
      influencerid: influencerid
    };


    console.log("Ad data:",requestData);

    const url = 'http://localhost:5000/adRequestSaveFromInfluencer';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Saved Ad Request:', data);
      alert("Hurray!! Ad Request send successfully!!")
      setOpen(false);

    } catch (err) {
      console.log('Error in storing ad request:', err);
      alert("Oops!!! Error in sending ad request!!")
    }
  };

  

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors duration-300 ${open ? 'visible bg-black/30' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 w-80 lg:w-96 transform ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <p className="text-xl font-semibold mb-5 text-gray-800">Ad Request</p>


        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Sponsor</label>
            <p> </p>
            <button
              type="text"
              name="campaignSponsor"
              value={formData.campaignSponsor}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-amber-400 mt-2"
              placeholder="Selected Influencer"
            >
              {campaignSponsor}
            
              </button>
              
          </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Ad Name</label>
            <input
              type="text"
              name="adname"
              value={formData.adname}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-amber-400"
              placeholder="Enter ad name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:border-amber-400"
              placeholder="Enter message/requirements"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Payment Amount</label>
            <input
              type="number"
              name="payment_amount"
              value={formData.payment_amount}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-amber-400"
              placeholder="Enter payment"
            />
          </div>


        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-700 transition-all" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-all" onClick={storeAdRequestForInfluencer}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignRequest;
