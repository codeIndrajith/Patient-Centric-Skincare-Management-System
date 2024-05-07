import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mainImage from "../images/mainImage.png";
import { AiFillPlusCircle } from "react-icons/ai";
import aiImage from "../images/ai.png";

const Hero = () => {
  const navigate = useNavigate();
  const handleConsultationClick = () => {
    navigate("/login");
  };

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
          <Col
            md={6}
            style={{
              marginTop: "13%",
            }}
          >
            <div>
              <div className="title">
                <h1>Find Your perfect Skincare</h1>
              </div>
              <div className="welcomeDetails">
                <p>
                  <AiFillPlusCircle /> Take our quiz to discover personalized
                  skincare recommendations.
                </p>
                <p>
                  {" "}
                  <AiFillPlusCircle /> Skincare treatment recommendation
                </p>
                <p>
                  {" "}
                  <AiFillPlusCircle /> Dermatologist recommendation
                </p>
                <p>
                  {" "}
                  <AiFillPlusCircle /> You have to schedule appointments with
                  dermatologists.
                </p>
                <p>
                  {" "}
                  <AiFillPlusCircle /> Find treatment details and recommended
                  videos
                </p>
              </div>
              <button
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  width: "70%",
                  border: "none",
                  backgroundColor: "#286cc9",
                  borderRadius: "30px",
                  fontWeight: "600",
                }}
                onClick={handleConsultationClick}
              >
                Get Started
              </button>
            </div>
          </Col>

          <Col md={6}>
            <div>
              <img
                src={mainImage}
                className="img-fluid"
                alt="Responsive image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
