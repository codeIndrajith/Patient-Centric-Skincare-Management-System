import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Doctor.css';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaShuttleVan } from 'react-icons/fa';
import { BsCapsule } from 'react-icons/bs';
import { AiFillSchedule } from 'react-icons/ai';
import profile from '../images/doctor.png';
import Modal from '../components/Modal';
import { useAddAppointmentsMutation } from '../slices/usersApiSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const DermatologistScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // doctor id
  const doctorId = useParams();

  // user information
  const { userInfo } = useSelector((state) => state.auth);

  const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
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
        email: formData.email,
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
  return (
    <div className="doctorContainer">
      <div className="doctorInfoSection">
        {/* First box section */}
        <div className="doctorInfo">
          <div className="doctorPersonalDetails">
            <h1>Doctor Name</h1>
            <strong>Doctor degree</strong>
          </div>
          <h5>OUR HEALTH CLINIC</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            dolorem quos assumenda deserunt non dolores, nemo ducimus
            consequuntur reiciendis sequi veniam placeat, maiores corrupti
            sapiente? Dolor exercitationem error natus esse.
          </p>

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
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
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
                  <p>Get your appointment with our specialists.</p>
                </div>
              </div>
            </Modal>
          </div>
          <div className="contacts">
            <div className="social">
              <FaWhatsapp className="socialIcon text-success" />
              <label className="text-success">WhatsApp</label>
            </div>
            <div className="social">
              <MdOutlineEmail className="socialIcon text-danger" />
              <label className="text-danger">Email</label>
            </div>
          </div>
        </div>
        {/* Second Box section */}
        <div className="doctorService">
          <div className="doctorProfileImage">
            <img src={profile} alt="" />
            <div className="mobileShow">
              <h1>Doctor Name</h1>
              <strong>Doctor degree</strong>
            </div>
          </div>

          <h2>SERVICES</h2>
          <div className="serviceList">
            <div className="services">
              <FaBriefcaseMedical className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Medical check Up</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="services">
              <FaShuttleVan className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Emergency</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="services">
              <BsCapsule className="serviceIcon" />
              <div className="servicesInfo">
                <h5>Pharmacy</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DermatologistScreen;
