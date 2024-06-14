import React from 'react';
import { useNavigate } from 'react-router-dom';
import doctor from '../images/doctor.png';
import behindImage from '../images/back.png';
import '../css/Hero.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiPlusMedical } from 'react-icons/bi';

const Hero = () => {
  const navigate = useNavigate();
  const handleConsultationClick = () => {
    navigate('/login');
  };

  return (
    <div className="containerSection">
      <div className="heroBodySection">
        <div className="details-section">
          <div className="title">
            <h1>
              Find Your perfect <span>Skincare</span>
            </h1>
          </div>
          <div className="welcomeDetails">
            <p>
              <AiFillCheckCircle className="correct-icon" /> Take our quiz to
              discover personalized skincare recommendations.
            </p>
            <p>
              {' '}
              <AiFillCheckCircle className="correct-icon" /> Skincare treatment
              recommendation
            </p>
            <p>
              {' '}
              <AiFillCheckCircle className="correct-icon" /> Dermatologist
              recommendation
            </p>
            <p>
              {' '}
              <AiFillCheckCircle className="correct-icon" /> You have to
              schedule appointments with dermatologists.
            </p>
            <p>
              {' '}
              <AiFillCheckCircle className="correct-icon" /> Find treatment
              details and recommended videos
            </p>
          </div>
          <div className="welcomeDetail-mobile">
            <p>
              Discover personalized skincare with our quiz, get treatment and
              dermatologist recommendations, schedule appointments, and find
              treatment details and videos.
            </p>
          </div>
          <div className="get-started">
            <BiPlusMedical className="medical-icon" />
            <button onClick={handleConsultationClick}>Get Started</button>
          </div>
        </div>

        <div className="title-medium">
          <h1>
            Find Your perfect <span>Skincare</span>
          </h1>
        </div>
        <div className="image-section">
          <div>
            <img src={doctor} className="doctorImage" alt="Responsive image" />
          </div>
          <div>
            <img
              src={behindImage}
              className="behindImage"
              alt="Responsive image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
