import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineCloudDownload } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { LivingAreas  } from '../../components';
import { useStateContext } from '../../context/StateContext';

const LivingAreaDetails = ({ livingarea, livingareas, stock }) => {
  const { image, name, details, price } = livingarea;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(livingarea, qty);

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
        <h3>In Stock: </h3>
          <p>{stock}</p>
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
            <button type="button" className="add-to-cart" onClick={() => onAdd(livingarea, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {livingareas?.map((item) => (
                <LivingAreas key={item._id} livingarea={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "livingarea"] {
    slug {
      current
    }
  }
  `;

  const livingareas = await client.fetch(query);

  const paths = livingareas.map((livingarea) => ({
    params: { 
      slug: livingarea.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "livingarea" && slug.current == '${slug}'][0]`;
  const livingareasQuery = '*[_type == "livingarea"]'
  
  const livingarea = await client.fetch(query);
  const livingareas = await client.fetch(livingareasQuery);

  console.log(livingarea);

  return {
    props: { livingareas, livingarea }
  }
}

export default LivingAreaDetails