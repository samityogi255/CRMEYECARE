import { useState } from 'react';

const Patients = () => {
  // Mock patient data
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 35, gender: 'Male' },
    { id: 2, name: 'Jane Smith', age: 28, gender: 'Female' },
    { id: 3, name: 'Michael Johnson', age: 42, gender: 'Male' },
    { id: 4, name: 'Emily Brown', age: 30, gender: 'Female' },
  ]);

  // State for form inputs
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
  });

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission for adding a new patient
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new patient object
    const newPatient = {
      id: patients.length + 1, // Generate a new ID (in a real application, this should be handled by a database or backend)
      ...formData,
    };
    // Update state with the new patient added
    setPatients([...patients, newPatient]);
    // Reset form data
    setFormData({
      id: '',
      name: '',
      age: '',
      gender: '',
    });
  };

  // Function to handle patient deletion
  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
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
