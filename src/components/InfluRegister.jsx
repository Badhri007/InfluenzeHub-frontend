import React,{useState,useEffect} from 'react';
import background from '../assets/b2.avif';
import '../index.css';
import { useNavigate } from "react-router-dom";

const InfluRegister = () => {

  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    'username':'',
    'niche':'',
    'reach':0,
    'email':'',
    'password':'',
    'platform':''
  });

  const handleChanges=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }));
  }


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("In frontend:",formData);

    const url='http://localhost:5000/influencerRegister/';
    try
    {
       const response=await fetch(url,
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        }
       );

       const data=await response.json();
       const user_id=data._id;
       localStorage.setItem("user_id",user_id);
       console.log("User Id:",user_id);

       navigate('/influLogin');
    }

    catch(error)
    {
       console.log("Error in storing data:",error);
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="hidden  lg:block w-[50%] ">
          <img src={background} className='h-[80%]' alt="background" />
        </div>
        <div className="block w-full lg:w-[50%]">
          <form className="flex flex-col justify-center items-center h-[80%] bg-gray-100" onSubmit={handleSubmit}>
            <br/>
            <p className="font-bold text-xl lg:text-2xl">INFLUENCER REGISTRATION</p>
            <br/>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
            <label>Niche</label>
            <input type="text" name="niche" value={formData.niche} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
            <label>Reach</label>
            <input type="number" name="reach" value={formData.reach} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
            <label>Email</label>
            <input type="email" name="email" value={formData.email} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
            <label>Password</label>
            <input type="password" name="password" value={formData.password} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
            <label>Platform Presence</label>
            <select  name="platform" value={formData.platform} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges}>
              <option value="" disabled>Select type</option>
              <option value="Twitter">Twitter</option>
              <option value="Youtube">YouTube</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            <br/>
            <button className="bg-blue-500 rounded-xl p-2 mt-2 text-white" type="submit">Register</button>
            <br/>
            <a href="/influlogin" className="underline">Already Registered? Click to Login</a>
            <br/>
            <a href="/sponsosignup" className='bg-yellow-400 rounded-lg p-3'>Click to Sponsor Registration</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InfluRegister