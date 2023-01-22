import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, Ptest } from '../components';

const Home = ({ products, bannerData }) => (
  
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Selected specifically for you.</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

  

    <FooterBanner footerBanner={bannerData && bannerData[0]} />

    <div style={{position: 'relative', background: 'rgba(0, 0, 0, 0)'}}>
    <Ptest  style={{zIndex: '-1', position: 'absolute', top: '0', left: '0'}} />
  </div>

  </div>
);

export async function getServerSideProps() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  } 
}



export default Home;