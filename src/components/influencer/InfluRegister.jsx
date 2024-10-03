import React, { useState, useEffect } from 'react';
import background from '../../assets/b2.avif';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar'

const InfluRegister = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    'username': '',
    'gender': '',
    'niche': '',
    'reach': '',
    'email': '',
    'password': '',
    'platform': '',
    'profile_photo_url': ''
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("In frontend:", formData);

    const url = 'http://localhost:5000/influencerRegister/';
    try {
      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      navigate('/influencerLogin');
    }

    catch (error) {
      console.log("Error in storing data:", error);
    }
  }


  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row flex-grow">
          <div className="hidden  lg:block w-[50%] ">
            <img src={background} className='h-[80%]' alt="background" />
          </div>
          <div className=" w-full bg-gray-100 lg:w-[50%]">
            <br />
            <p className="font-bold text-center text-xl mt-0 lg:text-xl">INFLUENCER REGISTRATION</p>
            <form className="flex flex-col justify-center items-center h-[100%]" onSubmit={handleSubmit}>

              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <div>
                  <label className='ml-4'>Username</label>
                  <br />
                  <input type="text" name="username" value={formData.username} className="rounded-lg shadow-lg w-2/3 md:w-[80%] h-10 mb-3 ml-4 p-2" placeholder="Profile name" onChange={handleChanges} />
                  <br />

                  <br />
                  <label className='ml-4'>Gender</label>
                  <br />
                  <div>
                    <input type="radio" name="gender" id="gender" value="Male" onChange={handleChanges} className="mx-3 w-10 h-5 align-middle" checked={formData.gender === "Male"} />Male
                    <br />
                    <input type="radio" name="gender" id="gender" value="Female" onChange={handleChanges} className="mx-3 w-10 h-5 align-middle" checked={formData.gender === "Female"} />Female
                    <br />
                    <input type="radio" name="gender" id="gender" value="Others" onChange={handleChanges} className="mx-3 w-10 h-5 align-middle" checked={formData.gender === "Others"} />Others
                    <br />
                  </div>

                  <br />
                  <label className='ml-4'>Niche</label>
                  <br />
                  <select type="text" name="niche" value={formData.niche} className="rounded-lg bg-white shadow-lg w-2/3 h-10 mb-3 ml-4 p-2 md:w-[80%]" placeholder='Category' onChange={handleChanges}>
                      <option value="">All Categories</option>
                      <option value="Sports">Sports</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Dance">Dance</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Dance/Music">Dance/Music</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Celebrities">Celebrities</option>
                      <option value="Other">Other</option>
                  </select>
                  <br />
                  <label className='ml-4'>Reach</label>
                  <br />
                  <input type="number" name="reach" value={formData.reach} className="rounded-lg shadow-lg w-2/3 h-10 mb-3 ml-4 p-2 md:w-[80%]" placeholder="Followers/Subscribers" onChange={handleChanges} />

                </div>
                <div>
                  <label className='ml-4 md:ml-2'>Email</label>
                  <br />
                  <input type="email" name="email" value={formData.email} className="rounded-lg shadow-lg w-2/3 h-10 m-3 ml-4 md:ml-2 p-2 md:w-[80%]" onChange={handleChanges} />
                  <br />
                  <label className='ml-4 md:ml-2'>Password</label>
                  <br />
                  <input type="password" name="password" value={formData.password} className="rounded-lg shadow-lg w-2/3 md:w-[80%] ml-4 h-10 m-3 md:ml-2 p-2" onChange={handleChanges} />
                  <br />
                  <label className='ml-4 md:ml-2'>Platform Presence</label>
                  <br />
                  <select name="platform" value={formData.platform} className="rounded-lg shadow-lg w-2/3 h-10 m-3 ml-4 md:ml-2 p-2 md:w-[80%]" onChange={handleChanges}>
                    <option value="" disabled>Select type</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Youtube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                  <br />
                  <label className='ml-4 md:ml-2'>{formData.platform} Account's URL</label>
                  <br />
                  <input type="text" name="social_media_url" value={formData.social_media_url} className="rounded-lg shadow-lg w-2/3 h-10 m-3 ml-4 md:ml-2 p-2 md:w-[80%]" placeholder="Account Link" onChange={handleChanges} />
                  <br />
                </div>
              </div>
              <br />
              <button className="bg-blue-500 rounded-xl p-2 mt-2 text-white" type="submit">Register</button>
              <br />
              <a href="/influencerLogin" className="underline">Already Registered? Click to Login</a>
              <br />
              <a href="/sponsosignup" className='bg-yellow-400 rounded-lg p-3'>Click to Sponsor Registration</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluRegister