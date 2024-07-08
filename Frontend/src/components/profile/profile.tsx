import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    groupName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    demographics: '',
    groupSize: '',
    specificRequirements: ''
  });

  // Function to fetch profile data from API
  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming you store token in localStorage
        }
      });
      const profileFromApi = response.data;
      console.log(profileFromApi.id)
      setProfileData(profileFromApi); // Update state with data fetched from API
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
      // Handle error gracefully, e.g., show error message to user
    }
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/profile/', profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming you store token in localStorage
        }
      });
      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error gracefully, e.g., show error message to user
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Group Name */}
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="groupName"
              type="text"
              name="groupName"
              value={profileData.groupName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="contactName"
              type="text"
              name="contactName"
              value={profileData.contactName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="contactEmail"
              type="email"
              name="contactEmail"
              value={profileData.contactEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="contactPhone"
              type="tel"
              name="contactPhone"
              value={profileData.contactPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Demographics */}
          <div>
            <label htmlFor="demographics" className="block text-sm font-medium text-gray-700 mb-1">
              Member Information
            </label>
            <textarea
              id="demographics"
              name="demographics"
              value={profileData.demographics}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Group Size */}
          <div>
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
              Group Size
            </label>
            <input
              id="groupSize"
              type="text"
              name="groupSize"
              value={profileData.groupSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Specific Requirements */}
          <div>
            <label htmlFor="specificRequirements" className="block text-sm font-medium text-gray-700 mb-1">
              Specific Requirements
            </label>
            <textarea
              id="specificRequirements"
              name="specificRequirements"
              value={profileData.specificRequirements}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
