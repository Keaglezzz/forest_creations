import React from 'react';
import { Ptest, Tech, Work } from '../components';

const mapUrl = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJX4UsqIFEzB0RA8ZxcL10O7I&key=AIzaSyC_gUn0zmMhN-hmz7A0MsrdMpazIm3noUI"

const About = () => {
  return (
    <>
    <Ptest />
    <Tech />
    <Work />
    <iframe 
      url={mapUrl} 
        width="100%" 
        height="500px" 
        display="initial"
        position="relative"
        allowFullScreen
    />
    </>
  )
}

export default About
