import React,{useState} from 'react'
import maleIcon from '../../assets/male.jpg';
import femaleIcon from '../../assets/female.jpg';
const InfluHomePage = () => {

  const [adrequest,setAdRequest]=useState({
    
  })

  const [profile,setProfile]=useState({
    'name':'',
    'gender':'',
    'niche':'',
    'email':'',
    'platform':''
  })

  const [requests,setRequests]=useState([]);


  return (
    <div>
    <div>InfluHomePage</div>
    <div className='md:ml-10 flex items-center justify-center md:justify-start' >
    <img src={maleIcon} className='w-40 h-40 md:w-60 md:h-60 rounded-[50%]'/>
    <p></p>
    </div>
    </div>

  )
}

export default InfluHomePage