import React from 'react';
import { Ptest, Decor, Kitchen, Seating, LivingAreas  } from '../components';
import { client } from '../lib/client';
import { motion } from "framer-motion";



const catalog = ( {kitchens, decors, seatings, livingareas } ) => {
 

  return (
    <div>
    <Ptest />
    <motion.div
        className="top-nav"
        style={{ y: `${-scrollY}px` }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav>
          <div className='top__nav-center'>
          <a href="#decor">Decor</a>
          <a href="#kitchens">Kitchens</a>
          <a href="#seatings">Seatings</a>
          <a href="#livingareas">Living Areas</a>
          </div>
        </nav>
      </motion.div>
        <h2 id='decor' className="head-text" style={{paddingTop: '100px'}}><span className='head__span'>Decor</span></h2>
        <motion.div>
        <div className="products-container" id='decor'>
      {decors && decors.map((decor) => <Decor key={decor._id} decor={decor} />)}
    </div>
    </motion.div>
        <h2 id='kitchens' className="head-text">Maintain your <span className='head__span'>Kitchen</span> &  <span className='head__span'>Bathroom</span> </h2>
        <div className="products-container" >
      {kitchens && kitchens.map((kitchen) => <Kitchen key={kitchen._id} kitchen={kitchen} />)}
    </div>
      <h2 id='seatings' className="head-text">We offer <span className='head__span'>Seating</span> <br /> &  <span className='head__span'>Benches</span> for all homes.</h2>
      <motion.div>
    <div className="products-container">
      {seatings && seatings.map((seating) => <Seating key={seating._id} seating={seating} />)}
    </div>
    </motion.div>
    <h2 id='livingareas' className="head-text">We offer <span className='head__span'>Living Area</span> <br /> solutions  <span className='head__span'>directly</span> to your house.</h2>
    <motion.div>
    <div className="products-container">
      {livingareas && livingareas.map((livingarea) => <LivingAreas key={livingarea._id} livingarea={livingarea} />)}
    </div>
    </motion.div>
   
    </div>
  )
}


export const getServerSideProps = async () => {
  const query = '*[_type == "kitchen" ]';
  const kitchens = await client.fetch(query);

  const decorsQuery = '*[_type == "decor"]';
  const decors = await client.fetch(decorsQuery);

  const seatingsQuery = '*[_type == "seating"]';
  const seatings = await client.fetch(seatingsQuery);

  const livingareasQuery = '*[_type == "livingarea"]';
  const livingareas = await client.fetch(livingareasQuery);
  

  return {
    props: { kitchens, decors, seatings, livingareas }
  }
}

export default catalog