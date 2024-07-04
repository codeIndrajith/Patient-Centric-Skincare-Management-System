import React from 'react';
import '../css/AllDoctors.css';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

const AllDermatologistsScreen = () => {
  // search dermatologist function
  const searchDermatologists = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="doctorsMainSection">
        <form onSubmit={searchDermatologists} className="searchForm">
          <IoIosSearch className="searchIcon" />
          <input placeholder="Search Dermatologist" type="text" />
        </form>
      </div>
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
              <Link to="/dermatologist/doctorId" className="linkToDoctor">
                <tr>
                  <td>Dr. Michel Jonathan</td>
                  <td>3.00pm - 6.00pm</td>
                </tr>
              </Link>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
              <tr>
                <td>Dr. Michel Jonathan</td>
                <td>3.00pm - 6.00pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDermatologistsScreen;
