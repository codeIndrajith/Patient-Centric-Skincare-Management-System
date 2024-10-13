import React from 'react';
import '../css/AllDoctors.css';
import { Link, useParams } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { useGetDoctorQuery } from '../slices/doctorApiSlice';
import Loader from '../components/Loader';

const AllDermatologistsScreen = () => {
  const params = useParams();
  const { data: doctorData, isLoading, error } = useGetDoctorQuery(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }
  console.log(doctorData.data);

  return (
    <div>
      <div className="doctorsMainSection"></div>
      <div className="allDoctors">
        <div className="tableSection">
          <table className="docTable">
            <thead className="theadTable">
              <tr>
                <td>Name</td>
                <td>Channeling Time</td>
              </tr>
            </thead>

            <tbody>
              <Link
                to={`/dermatologist/${doctorData.data[0]._id}`}
                className="linkToDoctor"
              >
                <tr>
                  <td>{doctorData.data[0].name}</td>
                  <td>{doctorData.data[0].channeling_time}</td>
                </tr>
              </Link>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDermatologistsScreen;
