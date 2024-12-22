import React from "react";
import closeIcon from "../../assets/close.png"
import acceptIcon from '../../assets/accepted.webp'

const InfluencerRequestViewModal = ({ onClose, adDetails , campaign ,handleStatus }) => {


    console.log("AD:",adDetails);

    return (
      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white h-auto w-[90%]  md:w-[50%] lg:w-[30%] p-4 rounded-lg shadow-lg ">
        <div className="flex flex-row">
          {(adDetails.status === 'accept' && <img src={acceptIcon} alt="" className="w-20 h-20 rounded-[50%]" />)}
          <h2 className="text-xl font-semibold mb-4 text-center bg-amber-100 p-1 rounded-md mt-top h-[50%] ml-10">{campaign[0].name} Advertisement Details</h2>

          <img src={closeIcon} alt="" className="h-9 w-9 bg-red-500 text-white rounded-[50%] ml-auto cursor-pointer" onClick={onClose}/>

        </div>

          <div className="flex flex-row gap-5">
                <label className=" p-1.5 font-semibold ">Ad name </label>
                <p className="bg-gray-100 font-semibold  rounded-full p-1.5 align-middle">{adDetails.name}</p>
          </div >
          <br/>
          <div className="flex flex-row gap-5 ">
                <label className=" rounded-full p-1.5 font-semibold ">Campaign</label>
                <p className="bg-gray-100 font-semibold  rounded-full p-1.5 align-middle">{campaign[0].name}</p>
            </div>

            <br/>
            <div className="flex flex-row gap-5">
                  <label className=" rounded-full align-middle p-1.5 font-semibold ">Message</label>
                  <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">{adDetails.message}</p>
            </div>
            <br/>
            <div className="flex flex-row gap-5">
                <label className=" rounded-full p-1.5 font-semibold ">Campaign Budget </label>
                <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">${campaign[0].budget}</p>
            </div><br/>
            <div className="flex flex-row gap-5">
                <label className=" rounded-full p-1.5 font-semibold ">Amount </label>
                <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">${adDetails.payment_amount}</p>
            </div>
            <br/>
            <div className="flex flex-row gap-5 ">
                <label className=" rounded-full p-1.5 font-semibold ">Start Date </label>
                <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">{campaign[0].startDate.slice(0,10).split("-").reverse().join("/")}</p>
            </div>
            <br/>

            <div className="flex flex-row gap-5">
                <label className=" rounded-full p-1.5 font-semibold ">End Date </label>
                <p className="bg-gray-100 font-semibold  rounded-xl p-1.5 align-middle">{campaign[0].endDate.slice(0,10).split("-").reverse().join("/")}</p>

            </div>
            <br/>


            <div className="flex flex-row gap-5">
            {adDetails.status==="pending" && (
            <button className="rounded-xl bg-red-500 p-2 text-white text-md " value="reject" onClick={()=>{handleStatus("reject",adDetails)}}>Reject</button>
            )}
            {/* <button className="rounded-xl bg-amber-500 p-2 text-white  text-md">Negotiate</button> */}
            {adDetails.status==="pending" && (
            <button className="rounded-xl bg-green-500 p-2 text-white  text-md" value="accept" onClick={()=>{handleStatus("accept",adDetails)}}>Accept</button>
            )}

            </div>


        </div>x
      </div>
    );
  };

  export default InfluencerRequestViewModal;
