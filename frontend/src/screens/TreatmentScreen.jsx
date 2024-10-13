import React, { useState, useEffect } from 'react';
import '../css/Treatment.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useGetDataQuery } from '../slices/questionnairesApiSlice';

const TreatmentScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetDataQuery();
  const [randomItems, setRandomItems] = useState([]);
  const navigate = useNavigate();

  const getRandomItems = (items) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  useEffect(() => {
    if (data && data.data) {
      const selectedItems = getRandomItems(data.data);
      setRandomItems(selectedItems);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }

  // handle to dermatologist function
  const handleDermatologist = (id) => {
    // console.log(id);
    navigate(`/diseases/${id}`);
  };
  return (
    <div className="treatmentContainer">
      <div className="imageContainer">
        <h2>Our Model Help You Find Your Treatment. Check it out</h2>
      </div>
      <div className="recommendationContainer">
        <h1>
          Hey! <span>{userInfo.name}</span>. This is your Recommendations
        </h1>
        <div className="recommendBox">
          {randomItems.map((item) => (
            <div className="boxes" key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
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
