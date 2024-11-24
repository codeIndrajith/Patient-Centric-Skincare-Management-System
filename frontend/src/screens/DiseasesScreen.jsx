import React, { useEffect, useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaVideo } from "react-icons/fa";
import { MdRateReview } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReviewTreatment from '../components/ReviewTreatment';
import { useGetDataOneQuery } from '../slices/questionnairesApiSlice';
import { useAddRatingTreatmentMutation, useGetRatingLengthTreatmentQuery } from '../slices/ratingTreatmentApiSlice';
import Loader from '../components/Loader';
import v1 from '../videos/670a73e785b00b8432bcf68c.mp4';
import v2 from '../videos/670a73d085b00b8432bcf68b.mp4';
import v3 from '../videos/670a73bf85b00b8432bcf68a.mp4';
import v4 from '../videos/670a73af85b00b8432bcf689.mp4';
import v5 from '../videos/670a73a185b00b8432bcf688.mp4';
import v6 from '../videos/670a738f85b00b8432bcf687.mp4';
import v7 from '../videos/670a737c85b00b8432bcf686.mp4';
import v8 from '../videos/670a736a85b00b8432bcf685.mp4';
import v9 from '../videos/670a734485b00b8432bcf684.mp4';
import v10 from '../videos/670a72e785b00b8432bcf683.mp4';
import toast from 'react-hot-toast';

const videos = [
  { id: '670a73e785b00b8432bcf68c', url: v1 },
  { id: '670a73d085b00b8432bcf68b', url: v2 },
  { id: '670a73bf85b00b8432bcf68a', url: v3 },
  { id: '670a73af85b00b8432bcf689', url: v4 },
  { id: '670a73a185b00b8432bcf688', url: v5 },
  { id: '670a738f85b00b8432bcf687', url: v6 },
  { id: '670a737c85b00b8432bcf686', url: v7 },
  { id: '670a736a85b00b8432bcf685', url: v8 },
  { id: '670a734485b00b8432bcf684', url: v9 },
  { id: '670a72e785b00b8432bcf683', url: v10 },
];

const DiseasesScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [feedbackTreatment, setFeedbackTreatment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, error } = useGetDataOneQuery(params.id);
  const [addRatingTreatment, {isLoading: ratingLoading}] = useAddRatingTreatmentMutation();
  const {data: ratingLengthTreatment, isLoading: loadingForLength, error: lengthError, refetch} = useGetRatingLengthTreatmentQuery(params.id);

  if (isLoading || loadingForLength) {
    return <Loader />;
  }

  if (error || lengthError) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }
  
  const submitFeedbackTreatment = async (e) => {
    e.preventDefault();
    try {
      if(feedbackTreatment === '') {
        return toast.error("Please add feedback")
      }

      const res = await addRatingTreatment({
        treatment_id: params.id,
        user_id: userInfo._id,
        feedback: feedbackTreatment
      })
      if(res.error) {
        return toast.error("Feedback not send")
      } else {
        toast.success("Thank for your Feedback!")
        setFeedbackTreatment('')
        refetch();
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  // handle information function
  const handleInformation = () => {
    setIsClicked(true);
  };
  // handle the Dermatologist function
  const handleDermatologist = () => {
    navigate(`/all-dermatologists/${params.id}`);
  };
  return (
    <div className="dermatologistContainer">

  <div className="contentsInfo">
    <div className={`infoTreatment ${isClicked ? 'hiddenInfo' : ''}`}>
      <h2 className="treatmentTitle">{data.data.name}</h2>
      <p className="treatmentDescription">{data.data.description}</p>
      <span>Ratings {ratingLengthTreatment ? ratingLengthTreatment.length/1000 : 0}K</span>

      <h4 className="stepsTitle">Treatment Guide</h4>
      <ul className="treatmentSteps">
        {data.data.treatmentSteps &&
          data.data.treatmentSteps.map((item, index) => (
            <li key={index} className="treatmentStepItem">
              <span className="stepNumber">{index + 1}</span> {item}
            </li>
          ))}
      </ul>

      <h5 className="treatmentCost">Cost: {data.data.treatmentCost}</h5>
      <button onClick={handleDermatologist} type="button" className="dermatologistButton">
        Find Dermatologists
      </button>
    </div>

    <div className="informationDetails">
      {/* Carousel Section for Treatment Images */}
      <div className="carouselSection">
        <div id="carouselExampleAutoplaying" className="carousel slide">
          <h1 className="heading">Treatment Images</h1>
          <Carousel>
            {data.data.images &&
              Object.values(data.data.images).map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} className="d-block carouselImage" alt="Treatment" />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </div>

      {/* Treatment Video */}
      <div className="treatment-videos">
  <h4 className="videoHeading">Watch Treatment Video</h4>
  <div className="d-flex gap-3">
    <div className="videoWrapper">
      {videos.find((video) => data.data._id === video.id) && (
        <video
          controls
          className="videoElement"
          src={videos.find((video) => data.data._id === video.id).url}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  </div>
</div>


      {/* Review Section */}
      <div className="review-section">
      <h4 className="reviewHeading">Why did you leave this rating?</h4>
      <p className="reviewText">Amazing, above expectations?</p>
      <textarea 
      value={feedbackTreatment}
      onChange={(e) => setFeedbackTreatment(e.target.value)}
        className="feedback-textarea"
        placeholder="Tell us about your own personal experience taking this treatment. Was it a good match for you?"
      />
      <button type="submit" className="submit-button" onClick={submitFeedbackTreatment}>Save and Continue</button>
    </div>
    </div>
  </div>
</div>

  );
};

export default DiseasesScreen;
