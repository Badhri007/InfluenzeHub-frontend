import React, { useState } from 'react'
import background from '../../assets/b2.avif'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

const InfluLogin = () => {


    const [loginData, setLoginData] = useState(
        {
            'email': '',
            'password': ''
        }
    );


    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Details:", loginData);

        const url = 'http://localhost:5000/influLogin'

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            if (data["success"] === true) {
                const influencerId = data["influencerId"];
                localStorage.setItem("influencerId", influencerId);
                console.log("User Id:", influencerId);
                console.log("Login successful!")
                navigate('/');
            }
            else {
                console.log("Invalid credentials!!");
            }

        }
        catch (err) {
            console.log("Error in influencer login:", err);
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
                    <div className="block w-full lg:w-[50%]">
                        <form className="flex flex-col justify-center items-center h-[80%] bg-gray-100" onSubmit={handleSubmit}>
                            <br />
                            <p className="font-bold text-xl lg:text-2xl">INFLUENCER LOGIN</p>
                            <br />
                            <label>Email</label>
                            <input type="email" name="email" value={loginData.email} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
                            <label>Password</label>
                            <input type="password" name="password" value={loginData.password} className="rounded-lg shadow-lg w-1/3 h-8" onChange={handleChanges} />
                            <br />
                            <button type="submit" className="bg-blue-500 rounded-xl p-2 mt-2 text-white">Login</button>
                            <br />
                            <a href="/signup" className="underline">Want to Register? Click here</a>
                            <br />
                            <a href="/sponsorLogin" className='bg-yellow-400 rounded-lg p-3'>Click to Sponsor Login</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfluLogin