import React, { useState, useEffect } from 'react';
import ListCampaigns from './listCampaigns';
import SponsoNavbar from './SponsoNavbar';

const SponsorCampaign = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const sponsorId=localStorage.getItem('sponsorId');
        const response = await fetch('http://localhost:5000/getAllCampaigns', {
          headers: { 'Content-Type': 'application/json','sponsorid':sponsorId }
        });
        if (response.ok) {
          const data = await response.json();
          setAllCampaigns(data);
          setFilteredCampaigns(data);  // Initially display all campaigns
        } else {
          console.error('Error fetching campaigns:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  const handleFilterChange = (filteredData) => {
    setFilteredCampaigns(filteredData);  // Update the filtered campaigns based on search
  };

  return (
    <div>
      <SponsoNavbar/>
      <ListCampaigns campaigns={filteredCampaigns} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default SponsorCampaign;
