import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineCloudDownload } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Seating  } from '../../components';
import { useStateContext } from '../../context/StateContext';

const SeatingDetails = ({ seating, seatings, products }) => {
  const { image, name, details, price } = seating;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(seating, qty);

    setShowCart(true);
  }


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt={name}/>
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
          <p className="price">R{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(seating, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {seatings?.map((item) => (
                <Seating key={item._id} seating={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "seating"] {
    slug {
      current
    }
  }
  `;

  const seatings = await client.fetch(query);

  const paths = seatings.map((seating) => ({
    params: { 
      slug: seating.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "seating" && slug.current == '${slug}'][0]`;
  const seatingsQuery = '*[_type == "seating"]'
  
  const seating = await client.fetch(query);
  const seatings = await client.fetch(seatingsQuery);

  console.log(seating);

  return {
    props: { seatings, seating }
  }
}

export default SeatingDetails