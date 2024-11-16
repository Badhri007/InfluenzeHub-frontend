import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdRequestFormModal = ({ open, onClose, campaignId, setOpen,selectedInfluencer }) => {
  const [formData, setFormData] = useState({
    adname: '',
    requirements: '',
    payment_amount: '',
    influencer_requested: selectedInfluencer ||'',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.selectedInfluencer) {
      setFormData((prevData) => ({
        ...prevData,
        influencer_requested: location.state.selectedInfluencer,
      }));
    }
  }, [location.state]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const storeAdRequest = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      status: 'pending',
      campaignId: campaignId,
    };

    const url = 'http://localhost:5000/adRequestSave';
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
      setOpen(false);

    } catch (err) {
      console.log('Error in storing ad request:', err);
    }
  };

  const handleChooseInfluencer = () => {
    navigate('/find', { state: { campaignId, formData } }); // Pass campaignId and formData
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
            <label className="text-sm text-gray-600 mb-1">Influencer</label>
            <p> </p>
            <button
              type="text"
              name="influencer_requested"
              value={formData.influencer_requested}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-amber-400 mt-2"
              placeholder="Selected Influencer"
            >
              {formData.influencer_requested}
            
              </button>
              <label onClick={handleChooseInfluencer} className='rounded-lg text-center p-2 text-md underline'> Choose Influencer </label>
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
            <label className="text-sm text-gray-600 mb-1">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:border-amber-400"
              placeholder="Enter ad requirements"
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
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-all" onClick={storeAdRequest}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdRequestFormModal;
