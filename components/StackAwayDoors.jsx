import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../lib/client";
import StackAwayForm from "./StackAwayForm";

const StackAwayDoors = () => {
  const [stackAways, setStackAways] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const contactRef = useRef(null);

  useEffect(() => {
    const query = '*[_type == "stackAway"]';

    client.fetch(query).then((data) => {
      setStackAways(data);
    });
  }, []);

  const handleCardClick = () => {
    // Scroll to the Contact component when a card is clicked
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <h2 className="head-text" style={{ marginTop: "1.4rem" }}>
        Frameless/Stack Away Doors by{" "}
        <span className="head__span">Forest Creations!</span>
      </h2>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__stack-portfolio"
      >
        {stackAways.map((stackAway, index) => (
          <div
            className={`app__stack-item app__flex`}
            key={index}
            onClick={handleCardClick}
          >
            <div className="app__work-img app__flex">
              <img src={urlFor(stackAway.imgUrl)} alt={stackAway.name} />
            </div>

            <div className="app__stack-content app__flex">
              <h4 className="bold-text">{stackAway.name}</h4>
              <h5
                className="bold-text stackaway-head"
                style={{ color: "#000" }}
              >
                {stackAway.title}
              </h5>
              <p className="p-text" title={stackAway.description}>
                {stackAway.description}
              </p>
              <div className="app__stack-tag app__flex">
                <p className="stack-text">{stackAway.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      <StackAwayForm ref={contactRef} />
    </>
  );
};

export default StackAwayDoors;
