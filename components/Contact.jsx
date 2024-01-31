import React, { useState } from "react";
import emailjs from "emailjs-com";
import { AiOutlineMail, AiFillPhone, AiOutlineWhatsApp } from "react-icons/ai";
import workers from "../assets/workers.png";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message, number } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = "service_0g5l2vd";
    const templateID = "template_3jc0l31";
    const userID = "I0nJghASCbiwlYwHT";

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="contact">
        <h2 className="head-text" style={{ marginTop: "1.4rem" }}>
          Have an <span className="head__span">enquiry</span> for us?
        </h2>
        <div className="app__footer-cards">
          <div className="app__footer-card ">
            <AiOutlineMail className="app__footer-svg" />
            <a href="mailto:shop@forestcreations.co.za" className="p-text">
              shop@forestcreations.co.za
            </a>
          </div>
          <div className="app__footer-card card-two ">
            <AiOutlineWhatsApp className="app__footer-svg" />
            <a href="https://wa.me/27795582312" className="p-text">
              079 558 2312
            </a>
          </div>
          <div className="app__footer-card">
            <AiFillPhone className="app__footer-svg" />
            <a href="tel:+27217037082" className="p-text">
              021 703 7082
            </a>
          </div>
        </div>

        {/* {/* <h2 className="head-text">Our  <span className='head__span'>National</span> Offices</h2>
        <div className='contact-locations'>
          <div className="app__work-item">
            <Image src={workers} alt="Nik" className="app__office-image" />
            <div className="app__office-details">
              <h4 className="app__office-heading">Head Office</h4>
              <div className="app__office-icons">
                <AiOutlineEnvironment className="app__office-icon" />
                <p className="app__office-text">Jhb</p>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlinePhone className="app__office-icon" />
                  <p className="app__office-text">Phone 1</p>
                </a>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlineMail className="app__office-icon" />
                  <p className="app__office-text">Email 1</p>
                </a>
              </div>
            </div>
          </div> */}

        {/* <div className="app__work-item">
            <Image src={workers} alt="Nik" className="app__office-image" />
            <div className="app__office-details">
              <h4 className="app__office-heading">Distribution Office</h4>
              <div className="app__office-icons">
                <AiOutlineEnvironment className="app__office-icon" />
                <p className="app__office-text">Cpt</p>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlinePhone className="app__office-icon" />
                  <p className="app__office-text">Phone 2</p>
                </a>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlineMail className="app__office-icon" />
                  <p className="app__office-text">Email 2</p>
                </a>
              </div>
            </div>
          </div>

          <div className="app__work-item">
            <Image src={workers} alt="Nik" className="app__office-image" />
            <div className="app__office-details">
              <h4 className="app__office-heading">Distribution</h4>
              <div className="app__office-icons">
                <AiOutlineEnvironment className="app__office-icon" />
                <p className="app__office-text">KZN</p>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlinePhone className="app__office-icon" />
                  <p className="app__office-text">Phone 2</p>
                </a>
              </div>
              <div className="app__office-icons">
                <a style={{ display: 'flex' }} href=''>
                  <AiOutlineMail className="app__office-icon" />
                  <p className="app__office-text">Email 2</p>
                </a>
              </div>
            </div>
          </div>
        </div> */}

        <form onSubmit={handleSubmit} className="form">
          {!isFormSubmitted ? (
            <div className="app__footer-form app__flex">
              <div className="app__flex">
                <input
                  className="p-text"
                  type="text"
                  required={true}
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="app__flex">
                <input
                  className="p-text"
                  type="email"
                  required={true}
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="app__flex">
                <input
                  className="p-text"
                  type="text"
                  required={true}
                  placeholder="Your Number"
                  name="number"
                  value={number}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <textarea
                  required
                  className="p-text"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                />
              </div>
              <button type="submit" className="p-text">
                {!loading ? "Send Message" : "Sending..."}
              </button>
            </div>
          ) : (
            <div>
              <h3 className="head-text">
                <span className="head__span">Thank you</span> for getting in
                touch <span className="head__span">{name}</span>!
              </h3>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Contact;
