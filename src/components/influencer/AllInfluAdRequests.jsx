import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import InfluNavbar from './InfluNavbar';


const AllInfluAdRequests = () => {

  const  campaignId  = useParams();

  console.log("CID:",campaignId);

  const [allInfluAdRequests,setAllInfluAdRequests]=useState([]);
  const [campaign,setCampaign] = useState();


  const getCampaignDetails = async () => {
    const url = "http://localhost:5000/getParticularCampaign";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "Application/JSON",
          "campaignid": campaignId.id
        }
      });
      const data = await response.json();
      console.log("Campaign details:", data);
      setCampaign(data);

    } catch (err) {
      console.log("Error in getting ad requests:", err);
    }
  }


  const handleAdRequests = async () => {
    let influencer_id = localStorage.getItem('influencerId');
    console.log("Influencer Id:", influencer_id);

    const url = "http://localhost:5000/getAdRequestsFromInfluencersToSponsors";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "Application/JSON",
          "influencer_id": influencer_id,
          "campaign_id":campaignId.id
        }
      });
      const data = await response.json();
      console.log("Ad Requests got:", data);
      setAllInfluAdRequests(data);

    } catch (err) {
      console.log("Error in getting ad requests:", err);
    }
  }




  useEffect(()=>{
    handleAdRequests();
    getCampaignDetails();
  },[campaignId.id])


  console.log(campaign);

  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <InfluNavbar />
      <p className="text-center font-bold text-lg my-4">My Requests</p>

      <div className="flex-grow relative overflow-auto">
        <div className="w-[90%] m-auto shadow-lg rounded-xl overflow-auto">
          <table className="w-full text-sm text-left rtl:text-right text-black-500">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">INFLUENCER</th>
                <th scope="col" className="px-6 py-3">CAMPAIGN</th>
                <th scope="col" className="px-6 py-3">SPONSOR</th>
                <th scope="col" className="px-6 py-3">AD</th>
                <th scope="col" className="px-6 py-3">PAY</th>
                <th scope="col" className="px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {allInfluAdRequests?.map((adRequest, index) => (

                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="px-6 py-3">{adRequest.requested_influencer}</td>
                  <td className="px-6 py-3">{campaign[0].name}</td>
                  <td className="px-6 py-3">{adRequest.sponsor_name}</td>
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

export default AllInfluAdRequests;
