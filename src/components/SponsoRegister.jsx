import React from 'react';
import background from '../assets/b2.avif';
import '../index.css';

const SponsoRegister = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="hidden  lg:block w-[50%] ">
          <img src={background} className='h-[80%]' alt="background" />
        </div>
        <div className="block w-full lg:w-[50%]">
          <form className="flex flex-col justify-center items-center h-[80%] bg-gray-100">
            <br />
            <p className="font-bold text-xl lg:text-2xl">SPONSOR REGISTRATION</p>
            <br />
            <label>Username</label>
            <input type="text" className="rounded-lg shadow-lg w-1/3 h-8" />
            <label>Email</label>
            <input type="email" className="rounded-lg shadow-lg w-1/3 h-8" />
            <label>Password</label>
            <input type="password" className="rounded-lg shadow-lg w-1/3 h-8" />
            <br />
            <button className="bg-blue-500 rounded-xl p-2 mt-2 text-white">Register</button>
            <br />
            <a href="/" className="underline">Already Registered? Click to Login</a>
            <br/>
            <a href="/signup" className='bg-yellow-400 rounded-lg p-3'>Click to Influencer Registration</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SponsoRegister