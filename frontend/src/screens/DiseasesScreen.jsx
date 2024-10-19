import React, { useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import treatment_1 from '../images/treatment_1.jpg';
import treatment_2 from '../images/treatment_2.png';
import treatment_3 from '../images/treatment_3.jpg';
import treatmentVideo_1 from '../videos/video_1.mp4';
import treatmentVideo_2 from '../videos/video_2.mp4';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReviewTreatment from '../components/ReviewTreatment';
import { useGetDataOneQuery } from '../slices/questionnairesApiSlice';
import Loader from '../components/Loader';

const DiseasesScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, error } = useGetDataOneQuery(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }

  console.log(data.data.images.img1);

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

      <div className="contentsInfo">
        <div className={`${isClicked && 'hiddenInfo'} infoTreatment`}>
          <h2>{data.data.name}</h2>
          <p>{data.data.description}</p>
          <button onClick={handleDermatologist} type="button">
            Find Dermatologists
          </button>
        </div>
        <div className="informationDetails">
          {/* Images to treatment  */}
          <div className="carouselSection">
            <div id="carouselExampleAutoplaying" className="carousel slide">
              <h1 className="heading">OUR SERVICES</h1>
              <Carousel>
                <Carousel.Item>
                  <img
                    src={data.data.images.img1}
                    className="d-block carouselImage"
                    alt="image"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src={data.data.images.img2}
                    className="d-block carouselImage"
                    alt="image"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src={data.data.images.img3}
                    className="d-block carouselImage"
                    alt="image"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          {/* Treatment video */}
          <div className="treatment-videos">
            <div className="d-flex gap-3">
              <div className="video-wrapper">
                <a href={treatmentVideo_1}>
                  <MdOndemandVideo />
                </a>
              </div>
            </div>
          </div>
          <div className="reviewTable">
            <ReviewTreatment treatmentId={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasesScreen;
