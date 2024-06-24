import React from 'react';
import '../css/Treatment.css';
import { useSelector } from 'react-redux';

const TreatmentScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="treatmentContainer">
      <div className="imageContainer">
        <h2>Our Machine Learning Model Help You Find Your Treatment</h2>
      </div>
      <div className="recommendationContainer">
        <h1>Recommendations</h1>
        <div className="recommendBox">
          <div className="boxes"></div>
          <div className="boxes">Second box</div>
          <div className="boxes">Third Box</div>
          <div className="boxes">Forth Box</div>
          <div className="boxes">Fifth Box</div>
          <div className="boxes">sixth Box</div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentScreen;
