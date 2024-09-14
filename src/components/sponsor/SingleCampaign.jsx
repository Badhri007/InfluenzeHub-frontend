import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import SponsoNavbar from './SponsoNavbar';
import AdRequestFormModal from './AdRequestFormModal';
import inboxIcon from '../../assets/inbox.png'
import { useNavigate } from 'react-router-dom';



const SingleCampaign = () => {
  const location = useLocation();
  const currentCampaign = location.state?.currentCampaign;

  const[open,setOpen]=useState(false);

  const[campaignId,setCampaignId]=useState('');

  const navigate=useNavigate();

  useEffect(() => {
    if (currentCampaign && currentCampaign.length > 0) {
      setCampaignId(currentCampaign[0]._id);
    }
  }, [currentCampaign]);

  const [influencers,setInfluencers]=useState([]);

  if (!currentCampaign) {
    return <div>No campaign data available</div>;
  }


  const handleSubmit=async(e)=>{

    e.preventDefault();
    setOpen(true);

    const url="http://localhost:5000/getAllInfluencers"

    try{
      const response= await fetch(url,{
          headers:{
              'Content-Type': 'application/json',
          }
      })
      if (response.ok) {
          const data = await response.json();
          setInfluencers(data);
          console.log("Data from backend:", data);
  
        } else {
          console.error('Error fetching campaigns:', response.status, response.statusText);
        }
  
      }
  
      catch (err) {
        console.log("Error in getting particular campaign:", err);
      }
  }

  
  
  const handleAdRequests=async(e)=>{
    e.preventDefault();
    let campaign_id=campaignId;
    console.log("Campaign id:",campaign_id);

    const url="http://localhost:5000/getAllAdRequests"
    try
    { 
        const response=await fetch(url,{
          method:"GET",
          headers:{
            "Content-Type":"Application/JSON",   
            "campaign_id":campaign_id       
          }
        });

        const data=await response.json();
        console.log("Ad Requests got:",data);
        navigate('/AllAdRequests',{ state: { allAdRequests: data , CampaignName:currentCampaign[0].name} })
    }
    catch(err)
    {
      console.log("Error in getting adrequests:", err);
    }
  }


  

  return (
    <div className='bg-white'>
     <SponsoNavbar/>
     
     <div className="flex flex-col  md:flex-row">
     <div className='flex-shrink-0 flex-grow-0 md:w-[50%]'>
    <img src={currentCampaign[0].imageUrl} 
         className='w-full h-auto rounded-xl p-2' 
         style={{ objectFit: 'cover' }} 
    />
  </div>
        <div className='flex flex-row m-5 items-start justify-between w-[100%]'>
          <div>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>Campaign </label>
            <p className='text-black text-lg ml-1'>{currentCampaign[0].name}</p>
            <br/>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>Category </label>
            <p className='text-black text-lg ml-1'>{currentCampaign[0].niche}</p>
            <br/>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>Description </label>
            <p className='text-black text-md ml-1'>{currentCampaign[0].description}</p>
            {/* <p className='text-black text-md ml-1'>Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors, including Pages and Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web content managers such as Joomla! and WordPress, and CSS libraries such as Semantic UI.</p> */}
            <br/>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>Budget </label>
            <p className='text-black text-xl ml-1 '>${currentCampaign[0].budget}</p>
            <br/>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>StartDate </label>
            <p className='text-black text-lg ml-1 '>{currentCampaign[0].startDate.slice(0,10).split("-").reverse().join("/")}</p>
            <br/>
            <label className='bg-gray-200 rounded-md p-1 font-semibold'>EndDate </label>
            <p className='text-black text-lg ml-1'>{currentCampaign[0].endDate.slice(0,10).split("-").reverse().join("/")}</p>
            </div>
            <div className='flex p-2 gap-2 rounded-xl bg-green-500 flex-row hover:scale-110 hover:border-black  transition-all' onClick={handleAdRequests} >
            <button className='text-white text-sm md:font-semibold md:text-lg'>My Requests</button>
            <img src={inboxIcon} className='w-8 h-8 md:w-10 md:h-10'></img>
            </div>

        </div>
    </div>

    

    <div className='flex justify-center'>
      <button className=' bg-amber-300 rounded-xl p-2 hover:scale-110 transition-all duration-200 text-black shadow-lg' onClick={handleSubmit}>Request Influencers</button>
    </div>

    <AdRequestFormModal open={open} onClose={()=>{setOpen(false)}} setOpen={setOpen} influencers={influencers}  campaignId={campaignId}/>

    </div>
  );
}

export default SingleCampaign;
