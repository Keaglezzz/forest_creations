import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDown, AiOutlineArrowUp } from 'react-icons/ai'

const Accordion = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <motion.div className='accordion__flex'>
    <div className='accordion__right'>
      <AnimatePresence >
        <motion.div
          key="time"
          className="accordion"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div className="accordion__question">
            How long does a project take from start to finish?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            key={['time']}
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
            A typical Aqua Development client can expect their project to go live in five to seven business days from start to finish. Our process involves:
            <br/><br/>
            Initial client vision discussion.
            <br/>
            Skeleton mockup and approval.
            <br/>
            Design and Development of your website.
            <br/>
            Final approval by the client.
            <br/>
            Finally, we are ready to launch your website.
            <br/><br/>
            We recommend our clients have a clear vision and intention for their website before we begin. Doing so will help the process flow.

          </motion.div>
        )};
        </AnimatePresence>
    <AnimatePresence>
        <motion.div
          key="update"
          className="accordion"
          onClick={() => setIsOpen1(!isOpen1)}
        >
          <motion.div className="accordion__question">
            Will I be able to update my website?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen1 && (
          <motion.div
            key={['update']}
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
            Sure! We build all of our sites so that you can update them as you wish. We will walk you through our Content Management System (CMS), making it as easy to update as posting on your fave social.
          </motion.div>
        )};
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          key="support"
          className="accordion"
          onClick={() => setIsOpen3(!isOpen3)}
        >
          <motion.div className="accordion__question">
            What kind of support do you offer?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen3 && (
          <motion.div
            key={['support']}
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
            We strive to answer any question you may have, and our clients can reach out to us at any time for support questions. 
          </motion.div>
        )};
      </AnimatePresence>
      </div>
      <div className='accordion__left'>
      <AnimatePresence >
        <motion.div
          key="cms"
          className="accordion"
          onClick={() => setIsOpen2(!isOpen2)}
        >
          <motion.div className="accordion__question">
            What CMS do you use?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen2 && (
          <motion.div
            key={['cms']}
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
            Aqua Development has developed websites in most major CMS, although we now favor Sanity. Sanity is highly adaptable and allows any authorized user to edit and publish content to their website.
          </motion.div>
        )};
        </AnimatePresence>
    <AnimatePresence>
        <motion.div
          key="stats"
          className="accordion"
          onClick={() => setIsOpen4(!isOpen4)}
        >
          <motion.div className="accordion__question">
            Do I get Stats or Analytics with my website?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen4 && (
          <motion.div
            key={['stats']}
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
            Absolutely. Aqua Development will install Google Analytics, an analytic tool you prefer, and Facebook Pixel. In addition, we will help set up conversion tracking on your website to know exactly where your visitors are coming from and when they are leaving your site.
            <br/>
             We do this so that you can easily spot potential business opportunities, streamline your online strategy, and increase targeted visibility to ensure more successful online campaigns.
          </motion.div>
        )};
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          key="templates"
          className="accordion"
          onClick={() => setIsOpen5(!isOpen5)}
        >
          <motion.div className="accordion__question">
            Do you use templates?
            <AiOutlineDown className='accordion__icon'/>
          </motion.div>
        </motion.div>

        {isOpen5 && (
          <motion.div
            key={['templates']}
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
            Aqua Development takes design very seriously. We create every site from a blank canvas, making it unique and tailored to your needs. We pride ourselves on offering beautiful websites built on solid foundations, are highly functional, and well-integrated for daily business use. 
          </motion.div>
        )};
      </AnimatePresence>
      </div>
    </motion.div>

    

    
  );
};

export default Accordion;