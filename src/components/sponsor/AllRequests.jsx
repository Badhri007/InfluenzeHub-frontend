import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import SponsoNavbar from './SponsoNavbar';
import backPage from '../../assets/backpage.png';

const AllRequests = () => {
  const location = useLocation();
  const allAdRequests = location.state?.allAdRequests;
  const campaignName = location.state?.CampaignName;


  const navigate=useNavigate();

//   const handleBackPage=()=>{
//     const campaignId = allAdRequests[0].campaignId; 
//     console.log("Campaign ID:", campaignId);
//     navigate(`/campaign/${campaignId}`);
//   }

  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <SponsoNavbar />
      <p className="text-center font-bold text-lg my-4">All Requests</p>
      
      <div className="flex-grow relative overflow-auto">
        {/* <img src={backPage} alt="backIcon" onClick = {handleBackPage} className=' w-12 h-12 ml-5 md:w-16 md:h-16 md:ml-20 mb-1'/> */}
        <div className="w-[90%] m-auto shadow-lg rounded-xl overflow-auto">
          <table className="w-full text-sm text-left rtl:text-right text-black-500">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">INFLUENCER</th>
                <th scope="col" className="px-6 py-3">CAMPAIGN</th>
                <th scope="col" className="px-6 py-3">AD</th>
                <th scope="col" className="px-6 py-3">PAY</th>
                <th scope="col" className="px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {allAdRequests?.map((adRequest, index) => (
                
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-3">{adRequest.influencer_username}</td>
                  <td className="px-6 py-3">{campaignName}</td>
                  <td className="px-6 py-3">{adRequest.name}</td>
                  <td className="px-6 py-3">{adRequest.payment_amount}</td>
                  <td className="px-6 py-3">{adRequest.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllRequests;
