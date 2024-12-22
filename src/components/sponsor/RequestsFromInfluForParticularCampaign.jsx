import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import SponsoNavbar from './SponsoNavbar';
import eyeIcon from '../../assets/eye.png'
import acceptIcon from '../../assets/accept.png'
import rejectIcon from '../../assets/cancel.png'
import previousIcon from '../../assets/previous.png'
import InfluencerRequestViewModal from './InfluencerRequestViewModal';

const RequestsFromInfluForParticularCampaign = () => {


  const campaignId = useParams();

  let campaign_id = campaignId.id;


  const [sponsorName, setSponsorName] = useState('');

  const [allAdRequestOfInfluencers, setAllAdRequestOfInfluencers] = useState([]);
  const [selectedAd,setSelectedAd]=useState();

  const [isModalOpen,setIsModalOpen] = useState(false);

  const navigate  = useNavigate();


  const [campaign,setCampaign] = useState([{
    _id:'',
    name:'',
    budget:0,
    description:'',
    sponsorId:'',
    visibility:'',
    niche:'',
    imageUrl:'',
    startDate:'',
    endDate:''
  }]);

  const goBack=()=>{
    window.history.back();
  }


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


  const getSponsorNameById = async (sponsorId) => {
    try {
      console.log('Sponsor Id:', sponsorId);
      const url = 'http://localhost:5000/getSponsorById';
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          sponsorid: sponsorId,
        },
      });

      if (response.ok) {
        const sponsor_name = await response.json();
        console.log('Data from Backend for Sponsor name:', sponsor_name);
        setSponsorName(sponsor_name); // Update the sponsorName state
      } else {
        console.log('Error in fetching the sponsor name');
      }
    } catch (err) {
      console.log('Error in fetching the sponsor name:', err);
    }
  };

  // Fetch ad requests from influencers
  const getAdRequestsFromInfluencers = async () => {
    try {
      const url = 'http://localhost:5000/getAdRequestsFromInfluencersForParticularCampaign';
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          sponsorname: sponsorName,
          campaignid: campaign_id
        },
      });

      if (response.ok) {
        const allAdRequestsFromInfluencers = await response.json();
        console.log('Influencers Requests:', allAdRequestsFromInfluencers);
        setAllAdRequestOfInfluencers(allAdRequestsFromInfluencers);
      } else {
        console.log('Error in getting the ad requests from influencers...');
      }
    } catch (err) {
      console.log('Error in getting the ad requests from influencers...', err);
    }
  };

  // Fetch sponsor name and ad requests
  useEffect(() => {
    const sponsorId = localStorage.getItem('sponsorId');
    console.log(sponsorId);
    if (sponsorId) {
      getSponsorNameById(sponsorId);
    }
  }, []);


  useEffect(()=>{
    getCampaignDetails();
  },[campaignId])

  // Fetch ad requests after sponsorName is updated
  useEffect(() => {
    if (sponsorName) {
      getAdRequestsFromInfluencers();
    }
  }, [sponsorName]); // Dependency on sponsorName



  const navigateToInfluencerProfile = async(influencerName) =>{
    try {
      const url = 'http://localhost:5000/getInfluencerIdFromUsername';
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          influencerusername: influencerName,
        },
      });

      if (response.ok) {
        const influencerId = await response.json();
        console.log('Data for Influencer id:', influencerId.influencer_id);
        navigate(`/influencer/${influencerId.influencer_id}`)
      } else {
        console.log('Error in fetching the sponsor name');
      }
    } catch (err) {
      console.log('Error in fetching the sponsor name:', err);
    }
  }



  const handleAdStatus = async (newStatus,adRequest) => {


    let value = newStatus;
    console.log("New Value:", value);

    let newAd;
    let ad_id = adRequest._id
    console.log("Editable Ad:", ad_id);

    const updatedAds = allAdRequestOfInfluencers.map((ad) => {
      if (ad._id === ad_id) {
        console.log("id:",ad_id);
        console.log("press:",value);
        newAd={ ...ad, status: value };
        console.log("Upd Ad:", newAd);
        return newAd;
      }
      return ad;
    });

    setAllAdRequestOfInfluencers(updatedAds);

    console.log("Up:",newAd);

    try {
      const url = "http://localhost:5000/updateAdRequestFromInfluencer";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'Application/JSON',
          // 'influencer_id': influencer_id
        },
        body: JSON.stringify(newAd)
      });

      const data = await response.json();
      if (response.ok) {
        setAllAdRequestOfInfluencers(data); // Update the advertisement state with the new data
      }

      console.log("Updated status data:", data);
      getAdRequestsFromInfluencers();

      if(isModalOpen===true)
      {
        setIsModalOpen(false);
      }

    } catch (err) {
      console.log("Error in updating:", err);
    }
  };


  const handleAdView=(newStatus,adRequest)=>{
    if(!isModalOpen)
    {
      setIsModalOpen(true);
    }

    setSelectedAd(adRequest);
  }


  const closeModal=()=>{
    setIsModalOpen(false);

  }






  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
    <SponsoNavbar />
    <p className="text-center font-bold text-3xl my-4">Influencers Requests for "{campaign[0].name}"</p>
    <button className='p-2 rounded-2xl bg-yellow-600 text-white hover:bg-yellow-700 flex flex-row gap-1 w-[7%] ml-10 mb-2 ' onClick={goBack}>
          <img src={previousIcon} alt="" className='w-10 h-10'></img>
          <p className='mt-2'>Go back</p>
    </button>

    <div className="flex-grow relative overflow-auto">
      <div className="w-[95%] m-auto shadow-lg rounded-xl overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-black-500">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 text-lg">INFLUENCER</th>
              <th scope="col" className="px-4 py-3 text-lg">AD</th>
              <th scope="col" className="px-4 py-3 text-lg">MESSAGE</th>
              <th scope="col" className="px-4 py-3 text-lg">PAY</th>
              <th scope="col" className="px-4 py-3 text-lg">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allAdRequestOfInfluencers) && allAdRequestOfInfluencers?.map((adRequest, index) => (
              adRequest.name && (adRequest.status==="pending")&& (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-3 text-lg text-blue-500 underline cursor-pointer hover:bg-blue-600 hover:text-white" onClick={()=>{navigateToInfluencerProfile(adRequest.requested_influencer)}}>{adRequest.requested_influencer}</td>
                <td className="px-4 py-3">{adRequest.name}</td>
                <td className="px-4 py-3">{adRequest.message}</td>
                <td className="px-4 py-3">{adRequest.payment_amount}</td>
                <td>
                  <div className='flex flex-row justify-evenly'>
                      <img src={eyeIcon} onClick={()=>{handleAdView("view",adRequest)}} alt="" className='w-10 h-10 cursor-pointer'/>
                      <img src={acceptIcon} onClick = {()=>{handleAdStatus("accept",adRequest)}} alt="" className='w-8 h-8 cursor-pointer'/>
                      <img src={rejectIcon} onClick = {()=>{handleAdStatus("reject",adRequest)}} alt="" className='w-8 h-8 cursor-pointer'/>
                  </div>

                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
    <br/>
    <br/>



    <div className="flex-grow relative overflow-auto">
      <div className="w-[95%] m-auto shadow-lg rounded-xl overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-black-500">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 text-lg">INFLUENCER</th>
              <th scope="col" className="px-4 py-3 text-lg">AD</th>
              <th scope="col" className="px-4 py-3 text-lg">MESSAGE</th>
              <th scope="col" className="px-4 py-3 text-lg">PAY</th>
              <th scope="col" className="px-4 py-3 text-lg">STATUS</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(allAdRequestOfInfluencers) && allAdRequestOfInfluencers?.map((adRequest, index) => (
              adRequest.name && (adRequest.status==="accept" || adRequest.status==="view")&& (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-3 text-lg text-blue-500 underline cursor-pointer hover:bg-blue-600 hover:text-white" onClick={()=>{navigateToInfluencerProfile(adRequest.requested_influencer)}}>{adRequest.requested_influencer}</td>
                <td className="px-4 py-3">{adRequest.name}</td>
                <td className="px-4 py-3">{adRequest.message}</td>
                <td className="px-4 py-3">{adRequest.payment_amount}</td>
                <td>
                  <div className='flex flex-row justify-evenly'>
                      <img src={eyeIcon} alt="" onClick={()=>{handleAdView("view",adRequest)}} className='w-10 h-10 cursor-pointer'/>
                  </div>

                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>




    {isModalOpen && (
        <InfluencerRequestViewModal onClose={closeModal} adDetails={selectedAd} handleStatus={handleAdStatus} campaign={campaign}/> // Pass a close function as a prop
    )}

  </div>

  );
};

export default RequestsFromInfluForParticularCampaign;
