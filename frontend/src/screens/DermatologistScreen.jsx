import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Doctor.css';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaShuttleVan } from 'react-icons/fa';
import { BsCapsule } from 'react-icons/bs';
import { AiFillSchedule } from 'react-icons/ai';
import profile from '../images/docProfile1.jpg';
import Modal from '../components/Modal';
import { useAddAppointmentMutation } from '../slices/appointmentApiSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ReviewDoctor from '../components/ReviewDoctor';
import { useGetOneDoctorQuery } from '../slices/doctorApiSlice';
import { useAddRatingDoctorMutation, useGetRatingLengthDoctorQuery } from '../slices/ratingDoctorApiSlice';

const DermatologistScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackDoctor, setFeedbackDoctor] = useState('');

  // doctor id
  const params = useParams();

  // user information
  const { userInfo } = useSelector((state) => state.auth);
  const [addRatingDoctor, {isLoading: ratingLoading}] = useAddRatingDoctorMutation();
  const {data: ratingLengthDoctor, isLoading: loadingForLength, error: lengthError, refetch} = useGetRatingLengthDoctorQuery(params.id);

  const initialFormData = {
    name: '',
    phoneNumber: '',
    time: '',
    service: '',
    date: '',
  };

  // state to store user appointments data
  const [formData, setFormData] = useState(initialFormData);

  // call the appointments route to send the data in backend
  const [appointment, { isLoading: loadingAppointment }] =
    useAddAppointmentMutation();

  // Model open
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Model close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // get input data handle function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  // form submit function
  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData === '') {
      toast.error('Add all fields');
    } else if (formData.service === '') {
      toast.error('Select service');
    } else if(formData.time === '') {
      toast.error('Select Time');
    } else {
      const res = await appointment({
        patientId: userInfo._id,
        patientName: formData.name,
        patientTime: formData.time,
        patientPhoneNumber: formData.phoneNumber,
        service: formData.service,
        date: formData.date,
      });

      if (res.error) {
        toast.error("Appointment Reject");
        setFormData(initialFormData);
      } else {
        toast.success('Confirm Appointments');
        setFormData(initialFormData);
      }
    }

    closeModal();
  };

  const {
    data: doctorData,
    isLoading,
    error,
  } = useGetOneDoctorQuery(params.id);


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to fetch competition data. Please try again later.</p>;
  }

  const submitFeedbackDoctor = async (e) => {
    e.preventDefault();
    try {
      if(feedbackDoctor === '') {
        return toast.error("Please add feedback")
      }
      const res = await addRatingDoctor({
        doctor_id: params.id,
        user_id: userInfo._id,
        feedback: feedbackDoctor
      })
      if(res.error) {
        return toast.error("Feedback not send")
      } else {
        toast.success("Thank for your Feedback!")
        setFeedbackDoctor('')
        refetch()
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="doctorContainer">
  {/* Doctor Profile Section */}
  <div className="doctorProfile">
    <div className="profileCard">
      <img
        src={doctorData.data.profileImage}
        alt="Doctor Profile"
        className="profileImage"
      />
      <div className="profileDetails">
        <h2 className="doctorName">{doctorData.data.name}</h2>
        <p className="doctorSpecialization">
          <strong>Specialization:</strong> {doctorData.data.specialization || "General Physician"}
        </p>
        <p className="doctorEmail">{doctorData.data.email}</p>
        <span>Ratings {ratingLengthDoctor ? ratingLengthDoctor.length/1000 : 0}K</span>
      </div>
    </div>
  </div>

  {/* Clinic Description Section */}
  <div className="clinicDetails">
    <div className="clinicInfo">
      <h3>Welcome to {doctorData.data.name}'s Clinic</h3>
      <p>{doctorData.data.description}</p>
      <button className="appointmentButton" onClick={openModal}>
        Book an Appointment
      </button>
    </div>
  </div>

  {/* Appointment Modal */}
  <Modal isOpen={isModalOpen} onClose={closeModal}>
    <div className="modalContent">
      <h2>Schedule an Appointment</h2>
      <form className="appointmentForm" onSubmit={submitHandler}>
        <div className="formGroup">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
        <label>
        Channeling Time - 
        <strong style={{ color: 'gray', fontWeight: '500' }}>
          Doctor Available {doctorData.data.channeling_time}
        </strong>
      </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a Time</option>
            <option value={doctorData.data.availableTimes.time1}>{doctorData.data.availableTimes.time1}</option>
            <option value={doctorData.data.availableTimes.time2}>{doctorData.data.availableTimes.time2}</option>
            <option value={doctorData.data.availableTimes.time3}>{doctorData.data.availableTimes.time3}</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="checkup">Medical Checkup</option>
            <option value="emergency">Emergency</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="date">Appointment Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submitButton">
          Confirm Appointment
        </button>
        {loadingAppointment && <Loader />}
      </form>
    </div>
  </Modal>

  {/* Services Section */}
  <div className="servicesSection">
    <h3>Doctor Services</h3>
    <div className="servicesGrid">
      <div className="serviceCard">
        <FaBriefcaseMedical className="serviceIcon" />
        <h4>Medical Checkup</h4>
        <p>Comprehensive health evaluations to ensure your well-being.</p>
      </div>
      <div className="serviceCard">
        <FaShuttleVan className="serviceIcon" />
        <h4>Emergency</h4>
        <p>24/7 critical care for urgent medical needs.</p>
      </div>
      <div className="serviceCard">
        <BsCapsule className="serviceIcon" />
        <h4>Pharmacy</h4>
        <p>On-site pharmacy for prescriptions and health advice.</p>
      </div>
    </div>
  </div>

  {/* Review Section */}
  <div className="review-section doc-review">
      <h4 className="reviewHeading">Why did you leave this rating?</h4>
      <p className="reviewText">Amazing, above expectations?</p>
      <textarea 
      value={feedbackDoctor}
      onChange={(e) => setFeedbackDoctor(e.target.value)}
        className="feedback-textarea"
        placeholder="Tell us about your own personal experience with doctors. Was it a good match for you?"
      />
      <button className="submit-button" onClick={submitFeedbackDoctor}>Save and Continue</button>
    </div>
</div>


  );
};

export default DermatologistScreen;
