import React from 'react';
import '../css/Doctor.css';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaShuttleVan } from 'react-icons/fa';
import { BsCapsule } from 'react-icons/bs';
import profile from '../images/doctor.png';

const DermatologistScreen = () => {
  // form submit function
  const submitHandler = (e) => {
    e.preventDefault();
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
            <form className="appointmentForm" onSubmit={submitHandler}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                required
              />
              <select name="service" required>
                <option value="">Select Service</option>
                <option value="checkup">Medical Check Up</option>
                <option value="emergency">Emergency</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
              <input type="date" name="date" required />
              <button type="submit">Book Appointment</button>
            </form>
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
