import React, { useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReviewTreatment from '../components/ReviewTreatment';
import { useGetDataOneQuery } from '../slices/questionnairesApiSlice';
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

  console.log(data)

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
      <div className={`infoTreatment ${isClicked ? 'hiddenInfo' : ''}`}>
  <h2 className="treatmentTitle">{data.data.name}</h2>
  <p className="treatmentDescription">{data.data.description}</p>
  
  <h4 className="stepsTitle">Treatment Guide</h4>
  <ul className="treatmentSteps">
    {data.data.treatmentSteps && data.data.treatmentSteps.map((item, index) => (
      <li key={index} className="treatmentStepItem">
        <span className="stepNumber"></span> {item}
      </li>
    ))}
  </ul>

  <h5 className="treatmentCost">Cost: {data.data.treatmentCost}</h5>
  <button onClick={handleDermatologist} type="button" className="dermatologistButton">
    Dermatologists
  </button>
</div>

        <div className="informationDetails">
          {/* Images to treatment  */}
          <div className="carouselSection">
            <div id="carouselExampleAutoplaying" className="carousel slide">
              <h1 className="heading">Treatments</h1>
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
                {videos.find((video) => data.data._id === video.id) && (
                  <a
                    href={
                      videos.find((video) => data.data._id === video.id).url
                    }
                  >
                    <MdOndemandVideo />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="reviewTable">
            <ReviewTreatment treatmentId={1} name={userInfo.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasesScreen;
