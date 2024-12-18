import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dollarIcon from '../../assets/money.png'

const SponsoHomePage = () => {
  const sponsorId = localStorage.getItem('sponsorId');
  const [sponsorName, setSponsorName] = useState('Loading...');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allAdsList, setAllAdsList] = useState([]);
  const [pendingAds, setPendingAds] = useState([]);
  const [acceptAds, setAcceptAds] = useState([]);
  const [rejectedAds, setRejectedAds] = useState([]);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [currentCampaignBudget, setCurrentCampaignBudget] = useState(0);
  const [profitableCampaigns, setProfitableCampaigns] = useState([]);
  const [failedCampaigns, setFailedCampaigns] = useState([]);
  const [mostProfitableCampaign, setMostProfitableCampaign] = useState(null);
  const [mostProfit,setMostProfit] = useState(0);

  const [budgetFriendlyInfluencer,setBudgetFriendlyInfluencer] = useState([]);

  const [mostLossCampaign, setMostLossCampaign] = useState(null);
  const [mostLoss,setMostLoss] = useState(0);

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const headers = {
    'Content-Type': 'application/json',
    sponsorid: sponsorId,
  };

  const getSponsor = async () => {
    try {
      const response = await fetch('http://localhost:5000/getSponsorById', { headers });
      if (response.ok) {
        const sponsor = await response.json();
        setSponsorName(sponsor || 'Unknown Sponsor');
      } else {
        setError('Failed to fetch sponsor details.');
      }
    } catch (error) {
      setError('Error fetching sponsor details.');
      console.error(error);
    }
  };

  const getAllCampaignsOfSponsor = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllCampaignsSponsorWise', { headers });
      if (response.ok) {
        const campaigns = await response.json();
        setAllCampaigns(campaigns);

        const totalBudget = campaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
        setTotalBudget(totalBudget);
      } else {
        setError('Failed to fetch campaigns.');
      }
    } catch (error) {
      setError('Error fetching campaigns.');
      console.error(error);
    }
  };

  const getAdsForCurrentCampaign = async (campaignId) => {
    try {
      const response = await fetch('http://localhost:5000/getAllAdRequests', {
        headers: { 'Content-Type': 'application/json', campaign_id: campaignId },
      });

      const campaignResponse = await fetch('http://localhost:5000/getParticularCampaign', {
        headers: { 'Content-Type': 'application/json', campaignid: campaignId },
      });

      // console.log(campaignId);

      if (response.ok) {
        const ads = await response.json();
        if(campaignResponse.ok)
        {
          const campaignData = await campaignResponse.json();

          // console.log(campaignData);

          setCurrentCampaignBudget(campaignData[0].budget);
          let adsCostForCurrentCampaign = 0;

          ads.forEach((ad) => {
            adsCostForCurrentCampaign += ad.payment_amount;
          });

          const profit = campaignData[0].budget - adsCostForCurrentCampaign;

          // Update most profitable campaign
          if (profit > 0) {
            setProfitableCampaigns((prevCampaigns) => {
              const isAlreadyAdded = prevCampaigns.some((campaign) => campaign._id === campaignData._id);
              if (!isAlreadyAdded) {
                return [...prevCampaigns, campaignData];
              }
              return prevCampaigns;
            });

            setMostProfitableCampaign((prevMostProfitable) => {
              if (!prevMostProfitable || profit > (prevMostProfitable.profit || 0)) {
                setMostProfit(profit);
                return { ...campaignData, profit };
              }
              return prevMostProfitable;
            });
          }

          else{

            setFailedCampaigns((prevCampaigns) => {
              const isAlreadyAdded = prevCampaigns.some((campaign) => campaign._id === campaignData._id);
              if (!isAlreadyAdded) {
                return [...prevCampaigns, campaignData];
              }
              return prevCampaigns;
            });


            let loss = profit;
            // console.log("Loss:",loss);
            setMostLossCampaign((prevMostLossable) => {
              if (!prevMostLossable || loss > (prevMostLossable.loss || 0)) {
                setMostLoss(loss);
                return { ...campaignData, loss };
              }
              return prevMostLossable;
            });
          }
        }


        // Update ads list
        setAllAdsList((prevAdsList) => {
          const combinedAds = [...prevAdsList, ...ads];
          const uniqueAds = Array.from(new Set(combinedAds.map((ad) => JSON.stringify(ad)))).map(
            (adString) => JSON.parse(adString)
          );
          return uniqueAds;
        });
      } else {
        console.error('Failed to fetch ads or campaign data for campaign:', campaignId);
      }
    } catch (error) {
      console.error('Error fetching ads for campaign:', campaignId, error);
    }
  };






  const fetchAllAds = async () => {
    try {
      await Promise.all(allCampaigns.map((campaign) => getAdsForCurrentCampaign(campaign._id)));
    } catch (error) {
      console.error('Error fetching all ads:', error);
    }
  };

  const filterAds = () => {
    const pending = allAdsList.filter((ad) => ad.status === 'pending');
    const accepted = allAdsList.filter((ad) => ad.status === 'accept');
    const rejected = allAdsList.filter((ad) => ad.status === 'reject');

    setPendingAds(pending);
    setAcceptAds(accepted);
    setRejectedAds(rejected);

    const totalSpent = accepted.reduce((acc, ad) => acc + ad.payment_amount, 0);
    setTotalAmountSpent(totalSpent);

    console.log("Accepted:",accepted);

  };


  const getInfluencerId = async(influencer_username) =>{
    try {
      console.log("Query name:",influencer_username)
      const response = await fetch('http://localhost:5000/getInfluencerIdFromUsername', {
        headers: { 'Content-Type': 'application/json', influencerusername: influencer_username },
      });


      if (response.ok) {
        const { influencer_id, profile_photo_url, platform } = await response.json();
        return { influencer_id, profile_photo_url, platform };
      }
    }
    catch(err)
    {
      console.log("Error in getting influencer id by username:", err)
    }
  }

  const getBestInfluencerFromAllCampaigns = async() => {
    console.log("All Ads List:", allAdsList);

    if (allAdsList.length === 0) {
      console.log("No ads available to calculate the best influencer.");
      return null; // Handle the case where no ads exist
    }

    const result = allAdsList.reduce((accumulator, ad) => {
      const username = ad.influencer_username;
      if (!accumulator[username]) {
        accumulator[username] = { username, totalAmount: 0, frequency: 0, average: 0.0 };
      }

      accumulator[username].totalAmount += ad.payment_amount;
      accumulator[username].frequency += 1;
      accumulator[username].average =
        accumulator[username].totalAmount / accumulator[username].frequency;

      return accumulator;
    }, {});

    const influencersWithPaymentStats = Object.values(result);

    console.log("Influencers Payment Stats:", influencersWithPaymentStats);

    if (influencersWithPaymentStats.length === 0) {
      console.log("No influencer stats available.");
      return null; // Handle case where no influencers have payment stats
    }

    const bestInfluencer = influencersWithPaymentStats.reduce((min, influencer) => {
      return influencer.average < min.average ? influencer : min;
    });

    console.log("Best Influencer:", bestInfluencer);

    const influencerDetails = await getInfluencerId(bestInfluencer.username);

    if (influencerDetails) {
      bestInfluencer.influencer_id = influencerDetails.influencer_id;
      bestInfluencer.profile_photo_url = influencerDetails.profile_photo_url;
      bestInfluencer.platform = influencerDetails.platform;
      console.log("Best Influencer with Details:", bestInfluencer);

      setBudgetFriendlyInfluencer(bestInfluencer);

    } else {
      console.error("Failed to fetch additional details for the best influencer.");
    }

    return bestInfluencer;
  };


  const handleCampaignNavigation = (campaign_id) => {
    navigate(`/campaign/${campaign_id}`);
  };

  useEffect(() => {
    (async () => {
      await getSponsor();
      await getAllCampaignsOfSponsor();
    })();
  }, []);

  useEffect(() => {
    if (allCampaigns.length > 0) {
      fetchAllAds();
    }
  }, [allCampaigns]);

  useEffect(()=>{
    getBestInfluencerFromAllCampaigns();
  },[allAdsList])

  useEffect(() => {
    if (allAdsList.length > 0) {
      filterAds();
    }
  }, [allAdsList]);

  return (
    <div className='bg-gray-200 w-full h-full'>
      <div className='p-4 w-full h-full'>
        <div className='p-4'>
          <h1 className='text-3xl ml-5'>Welcome, {sponsorName}!</h1>
        </div>

        <div className='sm:grid grid-cols-1 sm:w-full md:grid-cols-3 lg:flex flex-row w-full h-[25%] justify-around'>
          <StatCard title="Total Campaigns" value={allCampaigns.length} color="bg-cyan-300" />
          <StatCard title="Total Advertisements" value={allAdsList.length} color="bg-violet-300" />
          <StatCard title="Total Accepted Ads" value={acceptAds.length} color="bg-green-400" />
          <StatCard title="Total Rejected Ads" value={rejectedAds.length} color="bg-red-300" />
          <StatCard title="Total Pending Ads" value={pendingAds.length} color="bg-yellow-300" />
        </div>

        <div className='flex flex-row justify-between p-[8%]'>
          <div>
            <BudgetSummary label="TOTAL BUDGET" value={totalBudget} />
            <BudgetSummary label="EXPENSES" value={totalAmountSpent} />
            <BudgetSummary label="BALANCE" value={totalBudget - totalAmountSpent} />
          </div>
          <div>
            <p className='font-bold mb-2'>MOST PROFITABLE CAMPAIGN:</p>
            {mostProfitableCampaign ? (
              <CampaignCard
                campaign={mostProfitableCampaign[0]}
                mostProfit={mostProfit}
                onClick={() => handleCampaignNavigation(mostProfitableCampaign[0]._id)}
              />
            ):
            (<p className='bg-white rounded-xl p-2'>No Profit Campaign</p>)}

            <br/>

          <p className='font-bold mb-2'>MOST LOSS CAMPAIGN:</p>
            {mostLossCampaign ?  (
              <CampaignCard
                campaign={mostLossCampaign[0]}
                mostProfit={mostLoss}
                onClick={() => handleCampaignNavigation(mostLossCampaign[0]._id)}
              />
            ):
            (<p className='bg-white rounded-xl p-2'>No Loss Campaign</p>)}


          </div>
          <div>
            <a href="#" className='font-bold'>BEST PROFITABLE FREQUENT INFLUENCER</a>

            <div className='bg-white rounded-xl p-2'>
              {/* <div className='flex flex-col'>

              </div> */}
              <div>
                <div className='flex flex-row justify-center items-center'>
                    <img src={budgetFriendlyInfluencer.profile_photo_url} alt="" className='w-20 h-20' />
                    <p className='mt-5 ml-10'>{budgetFriendlyInfluencer.username}</p>
                </div>


                <div className='flex flex-row justify-center items-center'>

                <label>Platform : </label>
                <p className=''>  {budgetFriendlyInfluencer.platform}</p>
                </div>
                <div className='flex flex-row justify-center items-center'>
                <label>Average Pay : $   </label>
                <p> {budgetFriendlyInfluencer.average}/Ad</p>
                </div>
                <div className='flex flex-row justify-center items-center'>
                <label> Frequency :   </label>
                <p> {budgetFriendlyInfluencer.frequency}</p>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`shadow-md bg-white rounded-xl p-4 m-2 w-[15%]`}>
    <p className={`p-1 text-center ${color} rounded-xl`}>{title}</p>
    <p className='text-9xl text-center'>{value}</p>
  </div>
);

const BudgetSummary = ({ label, value }) => (
  <div className='mb-3'>
    <label className='p-1 font-bold rounded-xl'>{label}: </label>
    <p className='text-3xl mt-2 p-1.5 bg-white rounded-xl shadow-md'>${value}</p>
  </div>
);

const CampaignCard = ({ campaign, mostProfit, onClick }) => (

    <div className="flex flex-row gap-3 bg-white rounded-xl p-6 shadow-md" onClick={onClick}>
      <img
        src={campaign.imageUrl}
        alt=""
        className="rounded-[50%] bg-white border-black border-2 w-20 h-20 p-1.5"
      />
      <div>
        <p className="mt-4">{campaign.name}</p>
        <div className="flex flex-row">
          <img src={dollarIcon} alt="" className="w-8 h-8" />
          <p className="mt-1 ml-1">${mostProfit}</p>
        </div>
      </div>
    </div>
);


export default SponsoHomePage;
