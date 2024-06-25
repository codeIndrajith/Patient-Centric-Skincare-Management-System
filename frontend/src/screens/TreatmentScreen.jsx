import React from 'react';
import '../css/Treatment.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TreatmentScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // handle to dermatologist function
  const handleDermatologist = () => {
    navigate('/diseases');
  };
  return (
    <div className="treatmentContainer">
      <div className="imageContainer">
        <h2>Our Machine Learning Model Help You Find Your Treatment</h2>
      </div>
      <div className="recommendationContainer">
        <h1>
          Hey! <span>{userInfo.name}</span>. This is your Recommendations
        </h1>
        <div className="recommendBox">
          <div className="boxes">
            <h3>Treatment Name</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus rerum debitis quasi deserunt, architecto facilis aut
              deleniti cumque similique id, cupiditate, autem quos corrupti
              beatae maiores tenetur nam! Provident, facere.
            </p>
            <strong onClick={handleDermatologist}>See More</strong>
          </div>
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
