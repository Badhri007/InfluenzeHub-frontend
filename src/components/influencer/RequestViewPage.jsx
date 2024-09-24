import React,{useState,useEffect} from 'react'

const RequestViewPage = ({}) => {


    const [advertisement,setAdvertisement]=useState({
        name:'',
        campaign_id:'',
        requirements:'',
        payment_amount:'',
        status:'',
        campaignName:'',
        sponsorName:''
    })

    useEffect(() => {
    const getAdRequests=async()=>{
        const url='http://localhost:5000/getAllInfluAdRequests/'
        try{
            const response = await fetch(url,{
              method:"GET",
              headers:{
                'Content-Type':'Application/JSON',
                'influencer_id':influencer_id
              }
            })
            const data = await response.json();
            setAdvertisement(data);
            console.log("Ad requests:",data);
        }
        catch(err)
        {
          console.log("Error in getting all adrequests");
        }
      }
  
      getAdRequests();

    }, [influencer_id]);


  return (
    <div className="fixed inset-0 flex items-center justify-center transition-colors duration-300 visible:bg-black/30">
        <div className='bg-gray-200'>
            <p>{advertisement.name}</p>
            <p>{advertisement.requirements}</p>
            <p>{advertisement.payment_amount}</p>
            <p>{advertisement.campaignName}</p>
            <p>{advertisement.sponsorName}</p>
        </div>
    </div>
  )
}

export default RequestViewPage