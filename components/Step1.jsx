import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { client } from "../lib/client";

const Step1 = ({ selectedTableType, updateSelectedTableType, onNext }) => {
  const [tableStyle, setTableStyle] = useState("");
  const [tableSize, setTableSize] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const query = `*[_type == "productType"]`;
        const result = await client.fetch(query);
        setProductTypes(result);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        "id": _id,
        "name": name,
        "slug": slug.current,
        "price": price,
        "stock": stock,
        "image": image[0].asset->url,
        "productType": productType,
        "parentCategory": parentCategory->{
          name,
          "slug": slug.current
        },
        "subCategory": subCategory->{
          "name": name.current,
          "slug": slug.current
        }
      }`;
        
      try {
        const result = await client.fetch(query);
        console.log("Fetched all products:", result);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the selected table type
    const filtered = products.filter(product => product.subCategory && product.subCategory.name === selectedTableType);
    setFilteredProducts(filtered);
  }, [selectedTableType, products]);

  const handleTableStyleChange = (event) => {
    setTableStyle(event.target.value);
  };

  const handleTableSizeChange = (event) => {
    setTableSize(event.target.value);
  };

  const handleNext = () => {
    // Validate selections (add validation logic here if needed)

    // Pass selected data to the next step
    onNext({
      tableStyle,
      tableSize,
    });
  };

  console.log("Selected Table", selectedTableType)
  console.log(`Query: *[_type == "product" && subCategory.name == "${selectedTableType}"]`);


  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Step 1: Select Size and Table Style
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>*Select Table Style*</InputLabel>
            <Select value={tableStyle} onChange={handleTableStyleChange}>
              <MenuItem value="">Select an option</MenuItem>
              {filteredProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} ({product.parentCategory ? product.parentCategory.name : 'No Category'})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Table Style</InputLabel>
            <Select value={tableStyle} onChange={handleTableStyleChange}>
              <MenuItem value="">Select an option</MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Table Size</InputLabel>
            <Select value={tableSize} onChange={handleTableSizeChange}>
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!tableStyle || !tableSize}
      >
        Next
      </Button>
    </div>
  );
};

export default Step1;
