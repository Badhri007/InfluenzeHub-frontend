import React from "react";
import closeIcon from "../../assets/close.png"

const RequestViewModal = ({ onClose, adDetails }) => {


    console.log("AD:",adDetails);

    return (
      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white h-auto w-[90%]  md:w-[50%] lg:w-[30%] p-4 rounded-lg shadow-lg">
        <div className='flex flex-row'>
        <h2 className="text-xl font-semibold mb-4 text-center bg-amber-100 p-1 rounded-md">{adDetails.campaignName} Advertisement Details</h2>
          <img src={closeIcon} className="h-9 w-9 bg-red-500 text-white rounded-[50%] ml-auto cursor-pointer" onClick={onClose}>
          </img>
        </div>

           <div className="flex flex-row gap-5">
                <label className=" p-1.5 font-semibold ">Ad name </label>
                <p className="bg-gray-100 font-semibold  rounded-full p-1.5 align-middle">{adDetails.name}</p>
           </div >
           <br/>
           <div className="flex flex-row gap-5 ">
                <label className=" rounded-full p-1.5 font-semibold ">Campaign</label>
                <p className="bg-gray-100 font-semibold  rounded-full p-1.5 align-middle">{adDetails.campaignName}</p>
            </div>
            
            <br/>
            <div className="flex flex-row gap-5">
                  <label className=" rounded-full align-middle p-1.5 font-semibold ">Requirements</label>
                  <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">{adDetails.requirements}</p>
            </div>
            <br/>
            <div className="flex flex-row gap-5">
                <label className=" rounded-full p-1.5 font-semibold ">Amount </label>
                <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">{adDetails.payment_amount}</p>
            </div>
            <br/>
            <div className="flex flex-row gap-5">
            
            <button className="rounded-xl bg-red-500 p-2 text-white text-md ">Reject</button>
            <button className="rounded-xl bg-amber-500 p-2 text-white  text-md">Negotiate</button>
            <button className="rounded-xl bg-green-500 p-2 text-white  text-md">Accept</button>
            
            </div>
        
          
        </div>
      </div>
    );
  };
  
  export default RequestViewModal;
  