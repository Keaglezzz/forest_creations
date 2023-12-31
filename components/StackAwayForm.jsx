import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";

const StackAwayForm = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    size: "",
    address: "",
    plans: "",
    areaImage: null, // Update to handle file separately
    speciesRequest: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    name,
    email,
    number,
    size,
    address,
    plans,
    areaImage, // Update to handle file separately
    speciesRequest,
    message,
  } = formData;

  const [areaImageFile, setAreaImageFile] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAreaImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = "service_0g5l2vd";
    const templateID = "template_3jc0l31";
    const userID = "I0nJghASCbiwlYwHT";

    const formDataWithFiles = new FormData();
    formDataWithFiles.append("name", name);
    formDataWithFiles.append("email", email);
    formDataWithFiles.append("number", number);
    formDataWithFiles.append("size", size);
    formDataWithFiles.append("address", address);
    formDataWithFiles.append("plans", plans);
    formDataWithFiles.append("areaImage", areaImageFile);
    formDataWithFiles.append("speciesRequest", speciesRequest);
    formDataWithFiles.append("message", message);

    emailjs
      .sendForm(serviceID, templateID, formDataWithFiles, userID)
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
      <div ref={ref} className="stack-away-form">
        <h2 className="head-text">
          Request a Quote for{" "}
          <span className="head__span">Stack Away Doors</span>
        </h2>

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
              <div div className="app-flex">
                <input
                  required
                  className="p-text"
                  placeholder="Size of the area (height x length)"
                  value={size}
                  name="size"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="app-flex">
                <input
                  required
                  className="p-text"
                  placeholder="Installation Address"
                  value={address}
                  name="address"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="app-flex">
                <label htmlFor="areaImage" className="p-text">
                  Upload plans, an image of the area or a sketch:
                </label>
                <input
                  type="file"
                  id="areaImage"
                  name="areaImage"
                  accept="image/png, image/jpg, image/jpeg, application/pdf"
                  onChange={handleFileChange}
                />
              </div>
              <div div className="app-flex">
                <textarea
                  className="p-text"
                  placeholder="Species of timber requested"
                  value={speciesRequest}
                  name="speciesRequest"
                  onChange={handleChangeInput}
                />
              </div>
              <button type="submit" className="p-text">
                {!loading ? "Submit Request" : "Submitting..."}
              </button>
            </div>
          ) : (
            <div>
              <h3 className="head-text">
                <span className="head__span">Thank you</span> for your request,{" "}
                <span className="head__span">{name}</span>!
              </h3>
            </div>
          )}
        </form>
      </div>
    </>
  );
});

export default StackAwayForm;
