import React from 'react';
import '../css/AllDoctors.css';

const AllDermatologistsScreen = () => {
  // search dermatologist function
  const searchDermatologists = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="doctorsMainSection">
        <form onSubmit={searchDermatologists} className="searchForm">
          <button type="submit">search</button>
          <input placeholder="Search Dermatologist" type="text" />
        </form>
      </div>
      <div className="allDoctors">
        <div className="tableSection">
          <table className="docTable">
            <thead>
              <td>Name</td>
              <td>Time</td>
            </thead>

            <tbody>
              <td>Dr. Michel Jonathan</td>
              <td>3.00pm - 6.00pm</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDermatologistsScreen;
