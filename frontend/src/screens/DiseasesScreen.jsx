import React, { useState } from 'react';
import '../css/Dermatologist.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import treatment_1 from '../images/treatment_1.jpg';
import treatment_2 from '../images/treatment_2.png';
import treatment_3 from '../images/treatment_3.jpg';
import treatmentVideo_1 from '../videos/video_1.mp4';
import treatmentVideo_2 from '../videos/video_2.mp4';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const DiseasesScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // handle information function
  const handleInformation = () => {
    setIsClicked(true);
  };

  // handle the Dermatologist function
  const handleDermatologist = () => {
    navigate('/dermatologist/doctorId');
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
          <h1>Treatment Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            corrupti qui ea optio velit, iste fugiat ex a minima, dolores,
            necessitatibus sint harum. Distinctio, omnis! Ratione, excepturi
            eos. Debitis, soluta.
          </p>
          <button onClick={handleDermatologist} type="button">
            Find your Dermatologist
          </button>
        </div>
        <div className="informationDetails">
          {/* Images to treatment  */}
          <div className="carouselSection">
            <div id="carouselExampleAutoplaying" className="carousel slide">
              <h1 className="heading">OUR SERVICES</h1>
              <Carousel>
                <Carousel.Item>
                  <img src={treatment_1} className="d-block" alt="image" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={treatment_2} className="d-block" alt="image" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={treatment_3} className="d-block" alt="image" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          {/* Treatment video */}
          <div className="treatment-videos">
            <h3>Treatments</h3>
            <div className="d-flex gap-3">
              <div className="video-wrapper">
                <a href={treatmentVideo_1}>
                  <MdOndemandVideo />
                </a>
              </div>
              <div className="video-wrapper">
                <a href={treatmentVideo_2}>
                  <MdOndemandVideo />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="reviewSection">
              <form>
                <textarea
                  placeholder="Write your message"
                  name="review"
                  id="userReviews"
                ></textarea>
                <button type="submit">Review</button>
              </form>
            </div> */}
    </div>
  );
};

export default DiseasesScreen;
