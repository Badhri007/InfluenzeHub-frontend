import React,{useState} from 'react'

const FilterPage = ({handleFilterChange}) => {

    const [filter, setFilter] = useState({ category: '', searchText: '' });
    const [allInfluencers,setAllInfluencers]=useState([]);


    const handleCategoryChange = async (e) => {
        const { name, value } = e.target;
    
        const updatedFilter = {
          ...filter,
          [name]: value,
        };

        setFilter(updatedFilter);
    
        console.log('Category filter:', updatedFilter.category);
        console.log('Search Text:', updatedFilter.searchText);
    

        try {
          const url = 'http://localhost:5000/getInfluencersCategoryWise/';
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFilter), 
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Filtered influencers:', data);

            setAllInfluencers(data);
            handleFilterChange(data);
          } else {
            console.error('Error fetching influencers:', response.status, response.statusText);
          }
        } catch (err) {
          console.error('Error fetching influencers:', err);
        }
      };


      const handleClear = () => {
        handleCategoryChange([]);
        window.location.reload();
      };

  return (
    <div>
        <br/>
        <br/>
    <div className='flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center'>
    <p></p>

    <select className='rounded-xl w-[40%] h-10 p-1 shadow-lg md:w-[20%] lg:w-[10%]' name='category' value={filter.category} onChange={handleCategoryChange} >
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
  
    <input
      type="text"
      placeholder="Find Influencers..."
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
  </div>
  )
}

export default FilterPage