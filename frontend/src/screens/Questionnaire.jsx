import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSendQuestionsMutation } from '../slices/questionnairesApiSlice';
import { setCredentials } from '../slices/questionsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [questions, { isLoading }] = useSendQuestionsMutation();

  const initialFormData = {
    gender: '',
    age: '',
    skinType: '',
    allergies: '',
    skinIssues: [],
    isPregnantBreastfeeding: '',
    hasHistoryOfHeartAttacks: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === 'checkbox') {
      newValue = checked
        ? [...formData.skinIssues, value]
        : formData.skinIssues.filter((issue) => issue !== value);
    } else {
      newValue = value;
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (
      formData.gender === '' &&
      formData.age === '' &&
      formData.skinType === '' &&
      formData.allergies === '' &&
      formData.skinIssues === null &&
      formData.isPregnantBreastfeeding === '' &&
      formData.hasHistoryOfHeartAttacks === ''
    ) {
    }

    try {
      const res = await questions(formData).unwrap();
      dispatch(setCredentials(formData));
      navigate('/predict');
    } catch (err) {
      console.log(formData);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <Form onSubmit={submitData}>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Skin Type</Form.Label>
          <Form.Control
            as="select"
            placeholder="What is your Skin Type"
            name="skinType"
            value={formData.skinType}
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
          <Form.Label>Skin Allergies</Form.Label>
          <Form.Control
            as="select"
            name="allergies"
            value={formData.allergies}
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
            <option value="Seborrheic-dermatitis">Seborrheic dermatitis</option>
            <option value="Hives">Hives</option>
            <option value="Scabies">Scabies</option>
            <option value="Allergen">Allergen</option>
            <option value="Contact-dermatitis">Contact dermatitis</option>
            <option value="Rashes">Rashes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Skin Issues</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              id="acne"
              label="Acne"
              name="skinIssues"
              value="Acne"
              checked={formData.skinIssues.includes('Acne')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="pigmentation"
              label="Pigmentation"
              name="skinIssues"
              value="Pigmentation"
              checked={formData.skinIssues.includes('Pigmentation')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="wrinkles"
              label="Wrinkles"
              name="skinIssues"
              value="Wrinkles"
              checked={formData.skinIssues.includes('Wrinkles')}
              onChange={handleChange}
            />

            <Form.Check
              type="checkbox"
              id="fineLines"
              label="Fine Lines"
              name="skinIssues"
              value="Fine Lines"
              checked={formData.skinIssues.includes('Fine Lines')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="sunDamage"
              label="Sun Damage"
              name="skinIssues"
              value="Sun Damage"
              checked={formData.skinIssues.includes('Sun Damage')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="stretchMarks"
              label="Stretch Marks"
              name="skinIssues"
              value="Stretch Marks"
              checked={formData.skinIssues.includes('Stretch Marks')}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Are u pregnat or breastfeeding?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Yes or No"
            name="isPregnantBreastfeeding"
            value={formData.isPregnantBreastfeeding}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Is there a history of heart attacks?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Yes or No"
            name="hasHistoryOfHeartAttacks"
            value={formData.hasHistoryOfHeartAttacks}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Send</Button>
        {isLoading && <Loader />}
      </Form>
    </Container>
  );
};

export default Questionnaire;
