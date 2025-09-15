import React from 'react';
import './contact.css';
import maintenanceImg from '../../assets/maintenance.png';

const Contact: React.FC = () => {
  return (
    <section className="contact-maintenance">
      <div className="maintenance-inner">
        <img
          src={maintenanceImg}
          alt="Site under maintenance"
          className="maintenance-image"
        />
        <p className="maintenance-text">This page is under maintenance.</p>
      </div>
    </section>
  );
};

export default Contact;
