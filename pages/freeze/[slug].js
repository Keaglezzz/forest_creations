import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineCloudDownload } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Freeze  } from '../../components';
import { useStateContext } from '../../context/StateContext';

const FreezeDetails = ({ freeze, freezes, products }) => {
  const { image, name, details, price } = freeze;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [selectedVolumePrice, setSelectedVolumePrice] = useState(0);


  const handleBuyNow = () => {
    onAdd(freeze, qty, selectedVolume.price, selectedVolume);
    setShowCart(true);
  }
  

    // New state variable
    const [selectedVolume, setSelectedVolume] = useState(null);

    // Update selectedVolume on freeze change
    useEffect(() => {
      if (selectedVolume) {
        setSelectedVolumePrice(selectedVolume.price);
      }
    }, [selectedVolume]);
    
  
    // ...
  
    // Add a new function to handle volume selection
    const handleVolumeClick = (volume) => {
      setSelectedVolume(volume);
    };

    useEffect(() => {
      if (freeze.volumes && freeze.volumes.length > 0) {
        setSelectedVolume(freeze.volumes[0]);
      }
    }, [freeze]);
    


  return (
    <div>
      <div className="product-detail-container">
        <div>
        <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt={name}/>
            <div className="volume-options">
            {freeze.volumes?.map((volume, i) => (
              <button
                key={i}
                className={`volume-option ${selectedVolume === volume ? 'selected-volume' : ''}`}
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
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt={name}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
        <h1>{name}</h1>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">R{selectedVolume && selectedVolume.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
          <button type="button" className="add-to-cart" onClick={() => onAdd(freeze, qty, selectedVolume.price)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
          <button type="button" className="specsheet" >
            <AiOutlineCloudDownload className='specsheet__icon' /> 
            <a href="https://react-icons.github.io/react-icons/search?q=download" target="_blank">Spec Sheet</a>
            </button>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {freezes?.map((item) => (
                <Freeze key={item._id} freeze={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "freeze"] {
    slug {
      current
    }
  }
  `;

  const freezes = await client.fetch(query);

  const paths = freezes.map((freeze) => ({
    params: { 
      slug: freeze.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "freeze" && slug.current == '${slug}'][0]`;
  const freezesQuery = '*[_type == "freeze"]'
  
  const freeze = await client.fetch(query);
  const freezes = await client.fetch(freezesQuery);

  console.log(freeze);

  return {
    props: { freezes, freeze }
  }
}

export default FreezeDetails