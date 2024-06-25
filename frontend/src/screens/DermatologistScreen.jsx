import React from 'react';
import '../css/Doctor.css';

const DermatologistScreen = () => {
  return (
    <div className="doctorContainer">
      <div className="doctorInfoSection">
        {/* First box section */}
        <div className="doctorInfo">
          <h1>Doctor Name</h1>
          <h5>My Health Clinic</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            dolorem quos assumenda deserunt non dolores, nemo ducimus
            consequuntur reiciendis sequi veniam placeat, maiores corrupti
            sapiente? Dolor exercitationem error natus esse.
          </p>

          <div className="doctorCaption">
            <p>My desire is to provide the best service</p>
          </div>
          <div className="contacts">
            <p>WhatsApp</p>
            <p>Email</p>
          </div>
        </div>
        {/* Second Box section */}
        <div className="doctorService">
          <div>
            <p>Doctor Image</p>
          </div>

          <h2>Our Service</h2>
          <div className="serviceList">
            <div className="services">
              <p>Icone</p>
              <div className="servicesInfo">
                <h5>Service Name 1</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus ipsa quibusdam veritatis id iste modi aut nihil quod,
                  vitae accusantium ex aliquid ipsam. Cupiditate tempore atque
                  harum, ad recusandae nam.
                </p>
              </div>
            </div>
            <div className="services">
              <p>Icone</p>
              <div className="servicesInfo">
                <h5>Service Name 2</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus ipsa quibusdam veritatis id iste modi aut nihil quod,
                  vitae accusantium ex aliquid ipsam. Cupiditate tempore atque
                  harum, ad recusandae nam.
                </p>
              </div>
            </div>
            <div className="services">
              <p>Icone</p>
              <div className="servicesInfo">
                <h5>Service Name 3</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus ipsa quibusdam veritatis id iste modi aut nihil quod,
                  vitae accusantium ex aliquid ipsam. Cupiditate tempore atque
                  harum, ad recusandae nam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <div className="footerInfo">
        <h5>Service Center</h5>
        <div>
          <p>24 Hours Emergency</p>
          <p>Contact Number</p>
          <a href="#">service center web site</a>
        </div>
      </div>
    </div>
  );
};

export default DermatologistScreen;
