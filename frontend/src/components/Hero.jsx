import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mainImage from "../images/mainImage.png";

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
              marginTop: "20%",
            }}
          >
            <div>
              <h1>Find Your Perfect Skincare</h1>
              <p>
                Take our quiz to discover personalized skincare recommendations.
              </p>
              <Button variant="primary" onClick={handleConsultationClick}>
                Get Started
              </Button>
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
