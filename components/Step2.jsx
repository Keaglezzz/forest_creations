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

const Step2 = ({ selectedTableType, selectedOptions, onNext }) => {
  const [woodSpecies, setWoodSpecies] = useState("");
  const [stain, setStain] = useState("");
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

  const handleWoodSpeciesChange = (event) => {
    setWoodSpecies(event.target.value);
  };

  const handleStainChange = (event) => {
    setStain(event.target.value);
  };

  const handleNext = () => {
    // Validate selections (add validation logic here if needed)

    // Pass selected data to the next step
    onNext({
      woodSpecies,
      stain,
    });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Step 2: Select Wood Species and Stain
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Wood Species</InputLabel>
            <Select value={woodSpecies} onChange={handleWoodSpeciesChange}>
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
            <InputLabel>Select Stain</InputLabel>
            <Select value={stain} onChange={handleStainChange}>
              <MenuItem value="">Select an option</MenuItem>
              {/* Add stain options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!woodSpecies || !stain}
      >
        Next
      </Button>
    </div>
  );
};

export default Step2;
