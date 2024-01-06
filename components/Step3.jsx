import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { client } from "../lib/client";

const Step3 = ({ selectedTableType, selectedOptions, onNext }) => {
  const [legStyle, setLegStyle] = useState("");
  const [legMaterial, setLegMaterial] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedTableType) {
          const query = `*[_type == "product" && references("${selectedTableType}")]{ 
            "id": _id,
            "name": title,
            "slug": slug.current,
            "price": price,
            "stock": stock,
            "image": image[0],  
          }`;

          const result = await client.fetch(query);
          setProducts(result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedTableType]);

  const handleLegStyleChange = (event) => {
    setLegStyle(event.target.value);
  };

  const handleLegMaterialChange = (event) => {
    setLegMaterial(event.target.value);
  };

  const handleNext = () => {
    // Validate selections (add validation logic here if needed)

    // Pass selected data to the next step
    onNext({
      legStyle,
      legMaterial,
    });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Step 3: Select Leg Style and Leg Material
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Leg Style</InputLabel>
            <Select value={legStyle} onChange={handleLegStyleChange}>
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
            <InputLabel>Select Leg Material</InputLabel>
            <Select value={legMaterial} onChange={handleLegMaterialChange}>
              <MenuItem value="">Select an option</MenuItem>
              {/* Add leg material options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!legStyle || !legMaterial}
      >
        Next
      </Button>
    </div>
  );
};

export default Step3;
