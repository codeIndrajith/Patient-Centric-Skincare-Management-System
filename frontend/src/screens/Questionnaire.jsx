import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useSendQuestionsMutation } from '../slices/questionnairesApiSlice';
import { setCredentials } from '../slices/questionsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import questionImage from '../images/question.png';

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [skinIssues, setSkinIssues] = useState([]);
  const [isPregnantBreastfeeding, setIsPregnantBreastfeeding] = useState('');
  const [hasHistoryOfHeartAttacks, setHasHistoryOfHeartAttacks] = useState('');

  const [questions, { isLoading }] = useSendQuestionsMutation();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setSkinIssues((prevIssues) =>
        checked
          ? [...prevIssues, value]
          : prevIssues.filter((issue) => issue !== value)
      );
    } else if (type === 'file') {
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
      skinIssues.length === 0 ||
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
    formData.append('skinIssues', JSON.stringify(skinIssues));
    formData.append('skinImage', file);
    formData.append('isPregnantBreastfeeding', isPregnantBreastfeeding);
    formData.append('hasHistoryOfHeartAttacks', hasHistoryOfHeartAttacks);

    console.log([...formData]);

    try {
      const res = await questions(formData).unwrap();
      dispatch(setCredentials(res));
      navigate('/predict');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            height: '90px',
          }}
        >
          <h1>Hey, Help us with some quick questions</h1>
        </div>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="mt-3 mt-md-0">
          <div className="text-center">
            <img
              className="img-fluid rounded"
              src={questionImage}
              alt="question"
            />
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <Card
            className="rounded p-5"
            style={{
              width: '100%',
              height: '100vh',
            }}
          >
            <Card.Body className>
              <Card.Title className="text-center bg-dark text-white p-3 rounded ">
                SKIN QUIZE
              </Card.Title>
              <Form className="p-3" onSubmit={submitData}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your age"
                    name="age"
                    value={age}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Skin Type</Form.Label>
                      <Form.Control
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
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Skin Allergies</Form.Label>
                      <Form.Control
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
                        <option value="Contact-dermatitis">
                          Contact dermatitis
                        </option>
                        <option value="Rashes">Rashes</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Skin Issues</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      id="acne"
                      label="Acne"
                      name="skinIssues"
                      value="Acne"
                      checked={skinIssues.includes('Acne')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      id="pigmentation"
                      label="Pigmentation"
                      name="skinIssues"
                      value="Pigmentation"
                      checked={skinIssues.includes('Pigmentation')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      id="wrinkles"
                      label="Wrinkles"
                      name="skinIssues"
                      value="Wrinkles"
                      checked={skinIssues.includes('Wrinkles')}
                      onChange={handleChange}
                    />

                    <Form.Check
                      type="checkbox"
                      id="fineLines"
                      label="Fine Lines"
                      name="skinIssues"
                      value="Fine Lines"
                      checked={skinIssues.includes('Fine Lines')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      id="sunDamage"
                      label="Sun Damage"
                      name="skinIssues"
                      value="Sun Damage"
                      checked={skinIssues.includes('Sun Damage')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      id="stretchMarks"
                      label="Stretch Marks"
                      name="skinIssues"
                      value="Stretch Marks"
                      checked={skinIssues.includes('Stretch Marks')}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Row>
                  <Form.Group>
                    <Form.Label>Add Your Skin Issue Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Are u pregnat or breastfeeding?</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Yes or No"
                        name="isPregnantBreastfeeding"
                        value={isPregnantBreastfeeding}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        Is there a history of heart attacks?
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Yes or No"
                        name="hasHistoryOfHeartAttacks"
                        value={hasHistoryOfHeartAttacks}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <button
                  type="submit"
                  style={{
                    marginTop: '15px',
                    padding: '10px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: '#3e8704',
                    borderRadius: '30px',
                    fontWeight: '600',
                  }}
                >
                  Send
                </button>
                {isLoading && <Loader />}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;
