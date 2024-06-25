import React, { useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const DiseasesScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  // handle information function
  const handleInformation = () => {
    setIsClicked(true);
  };

  // handle the Dermatologist function
  const handleDermatologist = () => {
    navigate('/dermatologist');
  };
  return (
    <div className="dermatologistContainer">
      <div className="informationToggle">
        <button
          className={`${isClicked && 'hiddenBtn'}`}
          type="button"
          onClick={handleInformation}
        >
          Read Details
        </button>

        <AiFillCloseCircle
          className={`${isClicked && 'visibleClose'} closeBtn`}
          onClick={() => setIsClicked(false)}
        />
      </div>

      <div className={`${isClicked && 'hiddenInfo'} infoTreatment`}>
        <h1>Treatment Name</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          corrupti qui ea optio velit, iste fugiat ex a minima, dolores,
          necessitatibus sint harum. Distinctio, omnis! Ratione, excepturi eos.
          Debitis, soluta.
        </p>
        <button onClick={handleDermatologist} type="button">
          Find your Dermatologist
        </button>
      </div>
    </div>
  );
};

export default DiseasesScreen;
