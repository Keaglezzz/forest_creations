import React, { useRef } from "react";
import { Ptest, SideNav, Product } from "../components";
import { client } from "../lib/client";
import { motion } from "framer-motion";

const services = ({ products }) => {
  const filteredProducts = products.filter(
    (product) =>
      product.parentCategory !== null &&
      product.parentCategory.name !== "Table Creations" && // Exclude "Table Creations"
      product.subCategory !== null
  );

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const parentKey = product.parentCategory.name;
    const subcategoryKey = product.subCategory.name;

    if (!acc[parentKey]) {
      acc[parentKey] = {
        name: product.parentCategory.name,
        slug: product.parentCategory.slug,
        subcategories: {},
      };
    }

    if (!acc[parentKey].subcategories[subcategoryKey]) {
      acc[parentKey].subcategories[subcategoryKey] = {
        name: product.subCategory.name,
        slug: product.subCategory.slug,
        products: [],
      };
    }

    acc[parentKey].subcategories[subcategoryKey].products.push(product);
    return acc;
  }, {});

  const subCategoryRefs = useRef({});

  Object.values(groupedProducts).forEach(({ subcategories }) => {
    Object.values(subcategories).forEach((subcategory) => {
      subCategoryRefs.current[`${subcategory.slug}`] = useRef(null);
    });
  });

  const scrollToSubCategory = (parentSlug, subSlug) => {
    const ref = subCategoryRefs.current[`${subSlug}`];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <SideNav
        parents={Object.values(groupedProducts)}
        onSubCategoryClick={scrollToSubCategory}
      />

      <Ptest />
      {Object.values(groupedProducts).map(({ name, slug, subcategories }) => (
        <div key={slug} id={slug}>
          <h2 className="head-text" style={{ paddingTop: "50px" }}>
            <span className="head__span">{name}</span>
          </h2>
          {Object.values(subcategories).map(({ name, slug, products }) => (
            <div
              ref={subCategoryRefs.current[`${slug}`]}
              key={slug}
              id={`${slug}-${name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <h3 className="sub-head-text" style={{ paddingTop: "30px" }}>
                <span className="head__span">{name}</span>
              </h3>
              <motion.div>
                <div className="products-container">
                  {products.map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      id={product.slug}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
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
  const products = await client.fetch(productsQuery);

  // Use a Set to filter out duplicates
  const seen = new Set();
  const uniqueProducts = products.filter((product) => {
    if (!seen.has(product.id)) {
      seen.add(product.id);
      return true;
    }
    return false;
  });

  return {
    props: { products: uniqueProducts },
  };
};

export default services;
