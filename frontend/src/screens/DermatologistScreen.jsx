import React, { useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';

const DermatologistScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  // handle information function
  const handleInformation = () => {
    setIsClicked(true);
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
        <button type="button">Find your Dermatologist</button>
      </div>
    </div>
  );
};

export default DermatologistScreen;
