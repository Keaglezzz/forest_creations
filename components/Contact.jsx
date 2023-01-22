import React, { useState } from 'react';
import { client } from '../lib/client';
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import emailjs from 'emailjs-com';


const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    // Send email using emailjs
    emailjs
      .send('service_dwha7l7', 'template_929a96r', contact, 'cc3fMVov-fNqXzV1b')
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
    <div className='contact'>
      <h2 className="head-text">Have a <span className='head__span'>question</span> or a</h2>
      <h2 className="head-text">Custom  <span className='head__span'>Request</span> for us?</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card ">
        <AiOutlineMail className='app__footer-svg'/>
          <a href="mailto:sales@forestcreations.co.za" className="p-text">sales@forestcreations.co.za</a>
        </div>
        <div className="app__footer-card">
        <AiFillPhone className='app__footer-svg'/>
          <a href="tel:+27100208385" className="p-text">+27 81 893 7337</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" required={true} placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" required={true} placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
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
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            <span className='head__span'>Thank you</span> for getting in touch <span className='head__span'>{username}</span>!
          </h3>
        </div>
      )}
      </div>
    </>
  );
};

export default Contact