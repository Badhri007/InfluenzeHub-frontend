import React from 'react'


const SearchBar = () => {
  return (
    <div className=' flex flex-col'>
        <select className='rounded-xl w-[40%] h-8  p-1 m-auto'>
            <option>Electronics</option>
            <option>Food</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Other</option>
        </select>
        <br/>
        <input className='w-[80%] h-8 rounded-xl p-2 flex items-center m-auto bg-white shadow-lg'/>
        <br/>
        
    </div>
  )
}

export default SearchBar