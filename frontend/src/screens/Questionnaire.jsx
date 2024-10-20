import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useSendQuestionsMutation } from '../slices/questionnairesApiSlice';
import { setCredentials } from '../slices/questionsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';
import '../css/Question.css';
import quizDoc from '../images/quizDoc.png';

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [isPregnantBreastfeeding, setIsPregnantBreastfeeding] = useState('');
  const [hasHistoryOfHeartAttacks, setHasHistoryOfHeartAttacks] = useState('');

  const [questions, { isLoading }] = useSendQuestionsMutation();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFile(files[0]);
    } else {
      switch (name) {
        case 'gender':
          setGender(value);
          break;
        case 'age':
          setAge(value);
          break;
        case 'skinType':
          setSkinType(value);
          break;
        case 'allergies':
          setAllergies(value);
          break;
        case 'isPregnantBreastfeeding':
          setIsPregnantBreastfeeding(value);
          break;
        case 'hasHistoryOfHeartAttacks':
          setHasHistoryOfHeartAttacks(value);
          break;
        default:
          break;
      }
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (
      !gender ||
      !age ||
      !skinType ||
      !allergies ||
      !file ||
      !isPregnantBreastfeeding ||
      !hasHistoryOfHeartAttacks
    ) {
      toast.error('Add all fields');
      return;
    }

    const formData = new FormData();
    formData.append('gender', gender);
    formData.append('age', age);
    formData.append('skinType', skinType);
    formData.append('allergies', allergies);
    formData.append('skinImage', file);
    formData.append('isPregnantBreastfeeding', isPregnantBreastfeeding);
    formData.append('hasHistoryOfHeartAttacks', hasHistoryOfHeartAttacks);

    console.log([...formData]);

    try {
      const res = await questions(formData).unwrap();
      dispatch(setCredentials(res));
      navigate('/predict');
    } catch (err) {
      toast.error('Something issue');
    }
  };

  return (
    <Container fluid className="background-image">
      <Row className="justify-content-center twoSection">
        <Col xs={10} lg={6} className="formSection">
          <Card
            className="rounded p-2 card-custom"
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card.Body className="cardBody">
              <Card.Title className="questionTitle">Information</Card.Title>
              <Form className="formBody" onSubmit={submitData}>
                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    type="number"
                    placeholder="Enter your age"
                    name="age"
                    value={age}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    as="select"
                    placeholder="What is your Skin Type"
                    name="skinType"
                    value={skinType}
                    onChange={handleChange}
                  >
                    <option value="">Select Skin Type</option>
                    <option value="Dry">Dry</option>
                    <option value="Oily">Oily</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    as="select"
                    name="allergies"
                    value={allergies}
                    onChange={handleChange}
                  >
                    <option value="">Select Skin Allergies</option>
                    <option value="None">None</option>
                    <option value="Eczema">Eczema</option>
                    <option value="Rosacea">Rosacea</option>
                    <option value="Psoriasis">Psoriasis</option>
                    <option value="Angioedema">Angioedema</option>
                    <option value="Lupus">Lupus</option>
                    <option value="Shingles">Shingles</option>
                    <option value="Seborrheic-dermatitis">
                      Seborrheic dermatitis
                    </option>
                    <option value="Hives">Hives</option>
                    <option value="Scabies">Scabies</option>
                    <option value="Allergen">Allergen</option>
                    <option value="Rashes">Rashes</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Add Your Skin Issue Image</Form.Label>
                  <Form.Control
                    className="inputFields"
                    type="file"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    type="text"
                    placeholder="Pregnat or breastfeeding? (Yes or No)"
                    name="isPregnantBreastfeeding"
                    value={isPregnantBreastfeeding}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="inputFields"
                    type="text"
                    placeholder="Heart attacks? (Yes or No)"
                    name="hasHistoryOfHeartAttacks"
                    value={hasHistoryOfHeartAttacks}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <button
                  type="submit"
                  className="btn-custom"
                  style={{
                    marginTop: '5px',
                    padding: '5px',
                    width: '100%',
                  }}
                >
                  SEND
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        {isLoading && <Loader />}
        <Col className="imageSectionDoc">
          <div className="doctorPng">
            <img src={quizDoc} alt="doctor" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;
