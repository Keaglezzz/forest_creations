import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Seating = ({ seating: { image, name, slug, price, stock, subcategory } }) => {
  return (
    <div>
      <Link href={`/seating/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            alt={name}
          />
           <p className="product-name">{name} 
            <br />• {subcategory}
            <br /> • In Stock: {stock}</p>
          <p className="product-price">R{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Seating