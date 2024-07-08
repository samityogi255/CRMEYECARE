import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: '',
  });

  // Function to fetch patients data
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<Patient[]>('http://localhost:3002/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Fetch patients data on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Function to handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  // Function to handle form submission for adding a new patient
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post<Patient>('http://localhost:3002/patients', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients([...patients, response.data]);
      setFormData({ name: '', age: '0', gender: '' });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // Function to handle patient deletion
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3002/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Patients</h1>

      {/* Add Patient Form */}
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

        <label className="block mb-2 font-semibold">Age:</label>
        <input
          type="number"
          name="age"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Gender:</label>
        <select
          name="gender"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Add Patient
        </button>
      </form>

      {/* Display Patients Table */}
      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Age</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Gender</th>
              <th className="border border-gray-200 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="border border-gray-200 px-4 py-2">{patient.id}</td>
                <td className="border border-gray-200 px-4 py-2">{patient.name}</td>
                <td className="border border-gray-200 px-4 py-2">{patient.age}</td>
                <td className="border border-gray-200 px-4 py-2">{patient.gender}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(patient.id)}
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

export default Patients;
