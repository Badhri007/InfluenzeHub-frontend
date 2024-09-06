import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-2  items-center justify-center'>
      <select className='rounded-xl w-[40%] h-10 p-1 shadow-lg md:w-[20%] lg:w-[10%]'>
        <option>Electronics</option>
        <option>Food</option>
        <option>Clothing</option>
        <option>Accessories</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        className='w-[70%] h-10 rounded-xl p-2 flex  items-center bg-white shadow-lg lg:w-[30%]'
      />
    </div>
  )
}

export default SearchBar
