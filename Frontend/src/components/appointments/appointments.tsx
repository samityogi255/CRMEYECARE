import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { format, formatDistanceToNow } from 'date-fns';

interface Appointment {
  id: number;
  date: string;       // Assuming 'date' field in the schema is a string with datetime
  patient: Patient;   // Updated to include patient details
  doctor: Doctor;     // Updated to include doctor details
}

interface Doctor {
  id: number;
  name: string;
}

interface Patient {
  id: number;
  name: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: ''
  });

  const fetchPatientsAndDoctors = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const [patientsResponse, doctorsResponse] = await Promise.all([
        axios.get('http://localhost:3002/patients', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3002/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      console.error('Error fetching patients and doctors:', error);
    }
  };

  const fetchAppointmentData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const appointmentResponse = await axios.get('http://localhost:3002/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointmentResponse.data)

     

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPatientsAndDoctors();
      fetchAppointmentData();
    };

    fetchData();
  }, [patients, doctors]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const formattedData = {
        ...formData,
        // Ensure proper date format for backend (considering time zone)
        date: new Date(formData.date).toISOString(),
      };
      const response = await axios.post<Appointment>('http://localhost:3002/appointments', formattedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newAppointment: Appointment = {
        ...response.data,
        patientName: patients.find(patient => patient.id === response.data.patientId)?.name || 'Unknown',
        doctorName: doctors.find(doctor => doctor.id === response.data.doctorId)?.name || 'Unknown',
        date: new Date(response.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setAppointments([...appointments, newAppointment]);
      setFormData({ patientId: '', doctorId: '', date: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>

      <form className="mb-6" onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Patient:</label>
        <select
          name="patientId"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.patientId}
          onChange={handleChange}
          required
        >
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Doctor:</label>
        <select
          name="doctorId"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Date and Time:</label>
        <input
          type="datetime-local"
          name="date"
          className="p-2 mb-2 rounded-lg w-full"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Add Appointment
        </button>
      </form>

      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Doctor Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td className="border border-gray-200 px-4 py-2">{appointment.id}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.patient ? appointment.patient.name : 'Unknown'}</td>
                <td className="border border-gray-200 px-4 py-2">{appointment.doctor ? appointment.doctor.name : 'Unknown'}</td>
                <td className="border border-gray-200 px-4 py-2">{format(new Date(appointment.date), 'MMMM dd, yyyy, h:mm a')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Appointments;
