import React, { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, volume }, formatPrice }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id={slug}>
      <Link href={`/product/${slug}`}>
        <div
          className={`product-card ${isHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="product-image-container">
            <img
              src={image && urlFor(image[isHovered ? 1 : 0])}
              className={`product-image ${isHovered ? "hovered-image" : ""}`}
              alt={name}
            />
          </div>
          <div className="product-details">
            <p className="product-price">R {price}</p>
            <p className="product-name">{name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
