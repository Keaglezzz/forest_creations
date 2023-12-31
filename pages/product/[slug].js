import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlineCloudDownload,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, volume } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [selectedVolumePrice, setSelectedVolumePrice] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, qty, selectedVolume.price, selectedVolume);
    setShowCart(true);
  };

  // New state variable
  const [selectedVolume, setSelectedVolume] = useState(null);

  // Update selectedVolume on product change
  useEffect(() => {
    if (selectedVolume) {
      setSelectedVolumePrice(selectedVolume.price);
    }
  }, [selectedVolume]);

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  // Add a new function to handle volume selection
  const handleVolumeClick = (volume) => {
    setSelectedVolume(volume);
  };

  useEffect(() => {
    if (product.volumes && product.volumes.length > 0) {
      const sortedVolumes = [...product.volumes].sort(
        (a, b) => b.size - a.size
      );
      setSelectedVolume(sortedVolumes[0]);
    }
  }, [product]);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              alt={name}
            />
            <div className="volume-options volume-options-mobile">
              {product.volumes?.map((volume, i) => (
                <button
                  key={i}
                  className={`volume-option ${
                    selectedVolume === volume ? "selected-volume" : ""
                  }`}
                  onClick={() => handleVolumeClick(volume)}
                >
                  {volume.size}
                </button>
              ))}
            </div>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={name}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h4>Details: </h4>
          <p>
            {details &&
              details
                .map((block) => block.children.map((child) => child.text))
                .join(" ")}
          </p>
          <p className="price">
            R{selectedVolume && formatPrice(selectedVolume.price)}
          </p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty, selectedVolume.price)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const productsQuery = `
    *[_type == "product"]{
      "id": _id,
      "name": name,
      "slug": slug.current,
      "price": price,
      "stock": stock,
      "parentCategory": parentCategory->{
        "name": parentCategory,
        "slug": slug.current
      },
      "subCategory": subCategory->{
        "name": productType,
        "slug": slug.current
      },
      image,
      volumes,
      details,
      specSheet
    }
  `;

  let product = await client.fetch(query, { slug });
  const products = await client.fetch(productsQuery);

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Modify slug to be a string
  product = { ...product, slug: product.slug.current };

  return {
    props: { products, product },
  };
};

export default ProductDetails;
