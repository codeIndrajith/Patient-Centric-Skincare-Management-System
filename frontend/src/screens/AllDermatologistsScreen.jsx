import React from 'react';
import '../css/AllDoctors.css';

const AllDermatologistsScreen = () => {
  // search dermatologist function
  const searchDermatologists = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container-fluid">
      <div className="doctorsMainSection">
        <form onSubmit={searchDermatologists} className="searchForm">
          <button type="submit">search</button>
          <input placeholder="Search Dermatologist" type="text" />
        </form>
      </div>
      <div className="allDoctors"></div>
    </div>
  );
};

export default AllDermatologistsScreen;
