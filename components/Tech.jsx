import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { urlFor, client } from '../lib/client';

const Tech = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const query = '*[_type == "about"] | order(position asc)';

    client.fetch(query).then((data) => {
      setAbout(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">We understand the <span className='head__span'>demand</span> <br />for   <span className='head__span'>Local Supply</span></h2>

      <div className="app__profiles">
        {about.reverse().map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>


    </>
  );
};

export default Tech