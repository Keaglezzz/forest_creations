import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import Image from 'next/image';


const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h1>{heroBanner.largeText1}</h1>
        {/* <h3>{heroBanner.midText}</h3> */}
        <img src={urlFor(heroBanner.image)} alt="Synkhem Product" className="hero-banner-image" />

        <div>
          <Link href="/services">
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner