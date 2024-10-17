import React, { useState, useEffect } from 'react';
import '../css/Treatment.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  useGetDataQuery,
  useGetQuestionQuery,
} from '../slices/questionnairesApiSlice';

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

  console.log(question);
  console.log(treatments);
  console.log(disease);

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
        <h1>Recommend Treatments</h1>
        <div className="recommendBox">
          {disease.map((item) => (
            <div className="boxes" key={item._id}>
              <h3>{item.name}</h3>
              <strong onClick={() => handleDermatologist(item._id)}>
                See More
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentScreen;
