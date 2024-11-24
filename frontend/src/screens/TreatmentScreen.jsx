import React, { useState, useEffect } from 'react';
import '../css/Treatment.css';
import { useSelector } from 'react-redux';
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  useGetDataQuery,
  useGetQuestionQuery,
} from '../slices/questionnairesApiSlice';
import treatment from '../images/treatment.gif';

const TreatmentScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const params = useParams();
  const [disease, setDisease] = useState([]);
  const { data: question, isLoading, error } = useGetQuestionQuery(params.id);
  const {
    data: treatments,
    isLoading: treatmentLoading,
    error: treatmentError,
  } = useGetDataQuery();
  const [randomItems, setRandomItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (question && treatments) {
      // Filter to find all diseases that match the predicted disease
      const matchingDiseases = treatments.data.filter(
        (treatment) => treatment.disease === question.data.predictResult.disease
      );

      if (matchingDiseases.length > 0) {
        setDisease(matchingDiseases); // Store all matching diseases in the state
      }
    }
  }, [question, treatments]);

  if (isLoading || treatmentLoading) {
    return <Loader />;
  }

  if (error || treatmentError) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }

  // handle to dermatologist function
  const handleDermatologist = (id) => {
    navigate(`/diseases/${id}`);
  };
  return (
    <div className="treatmentContainer">
      <div className="imageContainer">
        <h2>Our Model Help You Find Your Treatment. Check it out</h2>
      </div>
      <div className="recommendationContainer">
        <div className='vectorImage'>
          <img src={treatment} alt="treatment-gif" />
        </div>
        <div className='recommendation-details'>
        <div className="recommendBox">
  {disease.map((item) => (
    <div className="boxes" key={item._id}>
      
      {/* Disease Name */}
      <strong className='titleTreatment'>{item.name}</strong>

      {/* Short Description */}
      <p className="description">
        {item.description}
      </p>

      {/* Action Buttons */}
      <div className="actionButtons">
        <button onClick={() => handleDermatologist(item._id)}>
          See More <IoIosArrowDropright />
        </button>
        <span>⭐⭐⭐⭐⭐</span> 
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default TreatmentScreen;
