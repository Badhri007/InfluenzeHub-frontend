import React, { useState } from 'react';

const SearchBar = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({ category: '', searchText: '' });

  const [allCampaigns,setAllCampaigns]=useState([]);
  
  const handleCategoryChange = async (e) => {
    const { name, value } = e.target;

    const updatedFilter = {
      ...filter,
      [name]: value,
    };

    // Update the filter state
    setFilter(updatedFilter);

    console.log('Category filter:', updatedFilter.category);
    console.log('Search Text:', updatedFilter.searchText);

    try {
      const url = 'http://localhost:5000/getCampaignsCategoryWise/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFilter),  // Use the updated filter object
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Filtered campaigns:', data);

        // Filter campaigns based on search text
        const matchedCampaigns = data.filter((campaign) =>
          campaign.name.toLowerCase().includes(updatedFilter.searchText.toLowerCase())
        );
        
        setAllCampaigns(matchedCampaigns);
        // Pass the filtered campaigns to the parent component
        onFilterChange(matchedCampaigns);
      } else {
        console.error('Error fetching campaigns:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };


  const handleClear = () => {
    
    onFilterChange([]);
    window.location.reload();
  };

  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center'>
      <select
        className='rounded-xl w-[40%] h-10 p-1 shadow-lg md:w-[20%] lg:w-[10%]'
        name='category'
        value={filter.category}
        onChange={handleCategoryChange}  
      >
        <option value="">All Categories</option>
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
        name="searchText"
        value={filter.searchText}
        onChange={handleCategoryChange}
        className='w-[70%] h-10 rounded-xl p-2 flex items-center bg-white shadow-lg lg:w-[30%]'
      />

      <button
        onClick={handleClear}
        className='bg-red-500 text-white p-2 rounded-xl shadow-lg'
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
