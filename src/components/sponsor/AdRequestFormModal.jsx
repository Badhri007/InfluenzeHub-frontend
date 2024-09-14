import React, { useState } from 'react';

const AdRequestFormModal = ({ open, onClose, influencers,setOpen, campaignId }) => {
  const [formData, setFormData] = useState({
    adname: '',
    requirements: '',
    payment_amount: '',
    influencer_requested: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const storeAdRequest = async (e) => {
    e.preventDefault();
    
    // Create a new object to avoid mutating state directly
    const requestData = {
      ...formData,
      status: 'pending',
      campaignId: campaignId,
    };

    console.log('formData:', requestData);

    const url = 'http://localhost:5000/adRequestSave';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),  // Use JSON.stringify for the body
      });

      const data = await response.json();
      console.log('Saved Ad Request:', data);
      setOpen(false);

    } catch (err) {
      console.log('Error in storing ad request:', err);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors duration-300 ${
        open ? 'visible bg-black/30' : 'invisible'
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 w-80 lg:w-96 transform ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <p className="text-xl font-semibold mb-5 text-gray-800">Ad Request</p>

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

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Influencer</label>
            <select
              name="influencer_requested"
              value={formData.influencer_requested}
              onChange={handleChanges}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-amber-400"
            >
              <option value="">Select Influencer</option>
              {influencers.map((influencer, index) => (
                <option key={index} value={influencer.username}>
                  {influencer.username}
                </option>
              ))}
            </select>
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
