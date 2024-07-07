import { useState } from 'react';

const Appointments = () => {
  // Mock appointment data
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', doctor: 'Dr. Smith', date: '2024-07-01', time: '10:00 AM' },
    { id: 2, patientName: 'Jane Smith', doctor: 'Dr. Brown', date: '2024-07-02', time: '11:00 AM' },
    { id: 3, patientName: 'Michael Johnson', doctor: 'Dr. White', date: '2024-07-03', time: '09:30 AM' },
  ]);

  // State for form inputs
  const [formData, setFormData] = useState({
    id: '',
    patientName: '',
    doctor: '',
    date: '',
    time: '',
  });

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission for adding a new appointment
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new appointment object
    const newAppointment = {
      id: appointments.length + 1, // Generate a new ID (in a real application, this should be handled by a database or backend)
      ...formData,
    };
    // Update state with the new appointment added
    setAppointments([...appointments, newAppointment]);
    // Reset form data
    setFormData({
      id: '',
      patientName: '',
      doctor: '',
      date: '',
      time: '',
    });
  };

  // Function to handle appointment deletion
  const handleDelete = (id: number) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>

      {/* Add Appointment Form */}
      <form className="mb-6" onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Patient Name:</label>
        <input
          type="text"
          name="patientName"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Doctor:</label>
        <input
          type="text"
          name="doctor"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.doctor}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Date:</label>
        <input
          type="date"
          name="date"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Time:</label>
        <input
          type="time"
          name="time"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Add Appointment
        </button>
      </form>

      {/* Display Appointments Table */}
      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Doctor</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Time</th>
              <th className="border border-gray-200 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border border-gray-200 px-4 py-2">{appointment.id}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.patientName}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.doctor}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.date}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.time}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(appointment.id)}
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

export default Appointments;
