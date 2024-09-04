import React from 'react';
import { useLocation } from 'react-router-dom';
import SponsoNavbar from './SponsoNavbar';

const AdRequests = () => {
  const location = useLocation();
  const currentCampaign = location.state?.currentCampaign;

  if (!currentCampaign) {
    return <div>No campaign data available</div>;
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
        <div className='flex flex-col m-5 items-start'>
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
    </div>
    </div>
  );
}

export default AdRequests;
