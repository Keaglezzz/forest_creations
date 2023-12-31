import React, { useState, useEffect } from "react";
import TableCreations from "../components/TableCreations";
import Link from "next/link";
import { Product, StepperContainer } from "../components"; // Import the Product component
import { client } from "../lib/client"; // Import groq for GraphQL queries
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prevHover) => !prevHover);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !isHovered, // Stop autoplay on hover
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const handleHover = () => {
      setIsHovered((prevHover) => !prevHover);
    };

    return () => {
      setIsHovered(false);
    };
  }, []);

  return (
    <Slider {...settings} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index + 1}`} className="tcg-image" />
        </div>
      ))}
    </Slider>
  );
};

const Home = ({ products }) => {
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [showStepper, setShowStepper] = useState(false);

  const handleProductTypeSelect = (productType) => {
    setSelectedProductType(productType);
    setShowStepper(true); // Show the stepper when a product type is selected
    console.log("Product Type Home Page", productType);
  };

  const handleCloseStepper = () => {
    setShowStepper(false);
    // Additional actions if needed
  };

  return (
    <div>
      {/* Check if a product type is selected, if not, show product type selection */}
      {!showStepper ? (
        <>
          <div className="works-heading">
            <h2>Table Creations</h2>
            <p>Select the type of custom table you would like to create</p>
          </div>
          <div className="tc-container">
            <div
              className="tc-link"
              onClick={() => handleProductTypeSelect("Dining Table")}
            >
              <img
                src="/images/dining-table.png"
                alt="Dining Table"
                className="tc-image"
              />
              <span className="tc-caption">Dining Table</span>
            </div>

            <div
              className="tc-link"
              onClick={() => handleProductTypeSelect("Conference Table")}
            >
              <img
                src="/images/conference-table.png"
                alt="Conference Table"
                className="tc-image"
              />
              <span className="tc-caption">Conference Table</span>
            </div>

            <div
              className="tc-link"
              onClick={() => handleProductTypeSelect("Coffee Table")}
            >
              <img
                src="/images/coffee-table.png"
                alt="Coffee Table"
                className="tc-image"
              />
              <span className="tc-caption">Coffee Table</span>
            </div>

            <div
              className="tc-link"
              onClick={() => handleProductTypeSelect("Side Table")}
            >
              <img
                src="/images/side-table.png"
                alt="Side Table"
                className="tc-image"
              />
              <span className="tc-caption">Side Table</span>
            </div>
          </div>
        </>
      ) : (
        // Display the Table Creations component with the selected product type
        <div className="table-creations">
          <StepperContainer
            selectedProductType={selectedProductType}
            onClose={handleCloseStepper}
          />
        </div>
      )}

      {/* Component with 3 Images */}
      <div className="works-heading">
        <h2>Eco-Friendly Timber Solutions</h2>
        <p>Click on the links below for more information</p>
      </div>
      <div className="tcg-container">
        <Link href="/stackAways">
          <div className="tcg-link">
            <ImageCarousel
              images={[
                "/images/stackawaydoors1.png",
                "/images/stackawaydoors2.png",
                "/images/stackawaydoors3.png",
                // Add more images as needed
              ]}
            />
            <span className="tcg-caption">Frameless Doors</span>
          </div>
        </Link>

        <Link href="/product/stone-pine-flooring">
          <div className="tcg-link">
            <ImageCarousel
              images={[
                "/images/hardwood-floor1.png",
                "/images/hardwood-floor2.png",
                "/images/hardwood-floor3.png",
                // Add more images as needed
              ]}
            />
            <span className="tcg-caption">Flooring</span>
          </div>
        </Link>

        <Link href="/product/eucalyptus-gum-decking">
          <div className="tcg-link">
            <ImageCarousel
              images={[
                "/images/decking1.png",
                "/images/decking2.png",
                "/images/decking3.png",
                // Add more images as needed
              ]}
            />
            <span className="tcg-caption">Decking</span>
          </div>
        </Link>
      </div>

      {/* "Best Selling Products" Section */}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Fill your space with this fine furniture</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const productQuery = `
  *[_type == "product" && productType == $selectedProductType]{
    "id": _id,
    "name": name,
    "slug": slug.current,
    "price": price,
    "stock": stock,
    "image": image[0]
  }
`;

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]{
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
  }`;

  const products = await client.fetch(query);

  // Group by parent category
  const groupedProducts = products.reduce((acc, product) => {
    if (product.parentCategory) {
      (acc[product.parentCategory.name] =
        acc[product.parentCategory.name] || []).push(product);
    }
    return acc;
  }, {});

  // Select one product from each group
  const selectedProducts = Object.values(groupedProducts).map(
    (products) => products[0]
  );

  return {
    props: { products: selectedProducts },
  };
};

export default Home;
