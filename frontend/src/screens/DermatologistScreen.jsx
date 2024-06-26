import React, { useState } from 'react';
import '../css/Doctor.css';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaShuttleVan } from 'react-icons/fa';
import { BsCapsule } from 'react-icons/bs';
import profile from '../images/doctor.png';
import Modal from '../components/Modal';

const DermatologistScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    service: '',
    date: '',
  });

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
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <h2 className="doctorCaption">APPOINTMENTS</h2>
            <button className="bookApppointments" onClick={openModal}>
              Book Appointment
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <form className="appointmentForm" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Your Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
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
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Book Appointment</button>
              </form>
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
