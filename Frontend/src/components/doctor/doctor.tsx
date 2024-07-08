import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  speciality: string; // Updated to match schema
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    speciality: '', // Updated to match schema
  });
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Function to fetch doctors data
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<Doctor[]>('http://localhost:3002/doctors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch doctors data on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission for adding or updating a doctor
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      let response;

      if (editingDoctor) {
        // Update existing doctor
        response = await axios.put<Doctor>(
          `http://localhost:3002/doctors/${editingDoctor.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedDoctors = doctors.map(doctor =>
          doctor.id === response.data.id ? response.data : doctor
        );
        setDoctors(updatedDoctors);
        setEditingDoctor(null);
      } else {
        // Add new doctor
        response = await axios.post<Doctor>(
          'http://localhost:3002/doctors',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDoctors([...doctors, response.data]);
      }

      // Reset form data after successful submission
      setFormData({ name: '', speciality: '' });
    } catch (error) {
      console.error('Error adding/updating doctor:', error);
    }
  };

  // Function to handle doctor deletion
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3002/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  // Function to set up form for editing a doctor
  const startEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      speciality: doctor.speciality, // Updated to match schema
    });
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingDoctor(null);
    setFormData({ name: '', speciality: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Doctors</h1>

      {/* Add/Edit Doctor Form */}
      <form className="mb-6" onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Name:</label>
        <input
          type="text"
          name="name"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Speciality:</label>
        <input
          type="text"
          name="speciality"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.speciality}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
        </button>
        {editingDoctor && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white p-2 rounded-lg w-full mt-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display Doctors Table */}
      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Speciality</th>
              <th className="border border-gray-200 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td className="border border-gray-200 px-4 py-2">{doctor.id}</td>
                <td className="border border-gray-200 px-4 py-2">{doctor.name}</td>
                <td className="border border-gray-200 px-4 py-2">{doctor.speciality}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    onClick={() => startEditDoctor(doctor)}
                    className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="bg-red-500 text-white p-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;
