import React, { useEffect } from 'react';
import '../css/Dashboard.css'; // Add your styles in a separate CSS file
import { useGetAppointmentQuery } from '../slices/appointmentApiSlice';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const appointments = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-10-21',
    time: '10:30 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Lee',
    date: '2024-10-22',
    time: '2:00 PM',
    status: 'Pending',
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Davis',
    date: '2024-10-23',
    time: '9:00 AM',
    status: 'Completed',
  },
];

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetAppointmentQuery(userInfo._id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }
  console.log(data);
  return (
    <div className="dashboard-container">
      <h1>User Appointments</h1>
      <div className="appointments-section">
        {data.data.map((appointment) => (
          <div className="appointment-card" key={appointment._id}>
            <p>
              Date:{' '}
              {new Date(appointment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
            <p>Time: {appointment.patientTime}</p>
            <p>Time: {appointment.service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
