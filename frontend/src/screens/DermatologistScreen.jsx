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
import { useAddAppointmentsMutation } from '../slices/usersApiSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ReviewDoctor from '../components/ReviewDoctor';
import { useGetOneDoctorQuery } from '../slices/doctorApiSlice';

const DermatologistScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // doctor id
  const doctorId = useParams();

  // user information
  const { userInfo } = useSelector((state) => state.auth);

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
    useAddAppointmentsMutation();

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
    } else {
      const res = await appointment({
        id: userInfo._id,
        name: formData.name,
        time: formData.time,
        phoneNumber: formData.phoneNumber,
        service: formData.service,
        date: formData.date,
      });

      if (res) {
        toast.success('Appointments success');
        setFormData(initialFormData);
      } else {
        toast.error('Appointments Reject');
        setFormData(initialFormData);
      }
    }

    closeModal();
  };

  const params = useParams();
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

  return (
    <div className="doctorContainer">
      <div className="doctorInfoSection">
        {/* First box section */}
        <div className="doctorInfo">
          <div className="doctorPersonalDetails">
            {/* Profile image */}
            <div className="profileImageSection">
              <img
                src={doctorData.data.profileImage}
                alt="Doctor Profile"
                className="profileImage"
              />
              <h6>{doctorData.data.name}</h6>
            </div>
          </div>
          <h5>OUR HEALTH CLINIC</h5>
          <p>{doctorData.data.description}</p>

          <div className="appointments">
            <button className="bookApppointments" onClick={openModal}>
              Book Appointment
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className="appointmentModal">
                <form className="appointmentForm" onSubmit={submitHandler}>
                  <label>
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label>
                    <strong>Phone Number</strong>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Your Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <label>
                    <strong>Time</strong>
                  </label>
                  <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                  <label>
                    <strong>Service</strong>
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option value="checkup">Medical Check Up</option>
                    <option value="emergency">Emergency</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                  <label>
                    <strong>
                      <strong>Date</strong>
                    </strong>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Book Appointment</button>
                  {loadingAppointment && <Loader />}
                </form>
                <div className="schedule">
                  <AiFillSchedule className="scheduleIcon" />
                  <h1>Schedule an Appointment</h1>
                </div>
              </div>
            </Modal>
          </div>
          <div className="contacts">
            {/* <div className="social">
              <a
                href={`https://wa.me/${doctorData.data.whatsAppNo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-success"
              >
                <FaWhatsapp className="socialIcon text-success" />
                <label className="text-success">WhatsApp</label>
              </a>
            </div> */}
            <div className="social">
              <a
                href={`mailto:${doctorData.data.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger"
              >
                <MdOutlineEmail className="socialIcon text-danger" />
                <label className="text-danger">Email</label>
              </a>
            </div>
          </div>
        </div>
        {/* Second Box section */}
        <div className="doctorService">
          <h2>SERVICES</h2>
          <div className="serviceList">
            <div className="services">
              <FaBriefcaseMedical className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Medical check Up</h5>
                <p>Regular check-ups to monitor your health.</p>
              </div>
            </div>
            <div className="services">
              <FaShuttleVan className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Emergency</h5>
                <p>24/7 emergency care for urgent needs.</p>
              </div>
            </div>
            <div className="services">
              <BsCapsule className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Pharmacy</h5>
                <p>Convenient access to medications and advice.</p>
              </div>
            </div>
          </div>

          <div>
            <ReviewDoctor treatmentId={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DermatologistScreen;
