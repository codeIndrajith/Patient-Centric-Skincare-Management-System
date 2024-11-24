import React, { useEffect } from 'react';
import '../css/Dashboard.css'; // Add your styles in a separate CSS file
import { useGetAppointmentQuery } from '../slices/appointmentApiSlice';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetAppointmentQuery(userInfo._id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }
  return (
    <div className="dashboard-container">
  <h1>User Appointments</h1>
  <div className="appointments-section">
    <div className="table-responsive">
      <table className="pro-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((appointment) => (
            <tr key={appointment._id}>
              <td>
                {new Date(appointment.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td>{appointment.patientTime}</td>
              <td>{appointment.service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  
  
  );
};

export default Dashboard;
