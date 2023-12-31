import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDown, AiOutlineArrowUp } from "react-icons/ai";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <motion.div className="accordion__flex">
      <div className="accordion__right">
        <AnimatePresence>
          <motion.div
            key="time"
            className="accordion"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div className="accordion__question">
              Do you offer delivery services for furniture purchases?
              <AiOutlineDown className="accordion__icon" />
            </motion.div>
          </motion.div>
          {isOpen && (
            <motion.div
              key={["time"]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className="accordion__answer"
            >
              Yes, Forest Creations offers free delivery services in the Cape
              Town areas as well as nationwide delivery at a fee.
            </motion.div>
          )}
          ;
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key="update"
            className="accordion"
            onClick={() => setIsOpen1(!isOpen1)}
          >
            <motion.div className="accordion__question">
              Are your furniture products made from sustainable materials?
              <AiOutlineDown className="accordion__icon" />
            </motion.div>
          </motion.div>
          {isOpen1 && (
            <motion.div
              key={["update"]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className="accordion__answer"
            >
              Yes, Forest Creations is a fully-sustainable company that offers
              an alternative to timber sourced through deforestation.
            </motion.div>
          )}
          ;
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key="support"
            className="accordion"
            onClick={() => setIsOpen3(!isOpen3)}
          >
            <motion.div className="accordion__question">
              Do you have a showroom where I can view your furniture products?
              <AiOutlineDown className="accordion__icon" />
            </motion.div>
          </motion.div>
          {isOpen3 && (
            <motion.div
              key={["support"]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className="accordion__answer"
            >
              Yes, we currently have a showroom on premises based in the Wetton
              industrial area, Cape Town.
            </motion.div>
          )}
          ;
        </AnimatePresence>
      </div>
      <div className="accordion__left">
        <AnimatePresence>
          <motion.div
            key="cms"
            className="accordion"
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <motion.div className="accordion__question">
              How does Forest Creations source timber?
              <AiOutlineDown className="accordion__icon" />
            </motion.div>
          </motion.div>
          {isOpen2 && (
            <motion.div
              key={["cms"]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className="accordion__answer"
            >
              Forest Creations sources timber in an eco-friendly and sustainble
              manner. All timber comes from...
            </motion.div>
          )}
          ;
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key="stats"
            className="accordion"
            onClick={() => setIsOpen4(!isOpen4)}
          >
            <motion.div className="accordion__question">
              Does Forest Creations sell raw timber?
              <AiOutlineDown className="accordion__icon" />
            </motion.div>
          </motion.div>
          {isOpen4 && (
            <motion.div
              key={["stats"]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className="accordion__answer"
            >
              Yes, Forest Creations sells raw timber. We have a wide variety of
              different species of wood. Feel free to contact us with what you
              are looking for and one of our helpful sales assistants will be in
              touch soon!
            </motion.div>
          )}
          ;
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Accordion;
