import React, { useState } from 'react';

const SearchBar = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({ category: '' });

  const handleChanges = async (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));

    console.log("Category filter:", value);

    try {
      const url = 'http://localhost:5000/getCampaignsCategoryWise/';
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          category: value,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Filtered campaigns:", data);
        onFilterChange(data);  // Pass the filtered data back to parent
      } else {
        console.error('Error fetching campaigns:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center'>
      <select
        className='rounded-xl w-[40%] h-10 p-1 shadow-lg md:w-[20%] lg:w-[10%]'
        name='category'
        value={filter.category}
        onChange={handleChanges}
      >
        <option value="Electronics">Electronics</option>
        <option value="Food">Food</option>
        <option value="Clothing">Clothing</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Mutual-Funds">Mutual-Funds</option>
        <option value="Accessories">Accessories</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        className='w-[70%] h-10 rounded-xl p-2 flex items-center bg-white shadow-lg lg:w-[30%]'
      />
    </div>
  );
};

export default SearchBar;
