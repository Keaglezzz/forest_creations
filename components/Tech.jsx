import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../lib/client";

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const query = '*[_type == "about"]';

    client.fetch(query).then((data) => {
      setAbout(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        <span className="head__span">Our Roots</span>
      </h2>
      <div className="about-grid">
        {about.map((aboutItem, index) => (
          <motion.div
            className={`about-item ${index === 2 ? "bottom-item" : ""}`}
            initial="hidden"
            animate="show"
            key={index}
          >
            <div
              className="about-image"
              style={{
                backgroundImage: `url(${urlFor(aboutItem.imgUrl).url()})`,
              }}
            >
              <div className="about-content">
                <h2 className="head-text-tree">{aboutItem.title}</h2>
                <motion.p className="text-lg leading-relaxed">
                  {aboutItem.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default About;
