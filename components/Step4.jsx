import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const Step4 = ({ selectedOptions }) => {
  // You can display a summary of the selected options in Step 4
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Step 4: Review Your Selection
      </Typography>
      <Typography variant="subtitle1">Selected Options:</Typography>
      <Typography variant="body1">
        Table Style: {selectedOptions.tableStyle}
      </Typography>
      <Typography variant="body1">
        Table Size: {selectedOptions.tableSize}
      </Typography>
      <Typography variant="body1">
        Wood Species: {selectedOptions.woodSpecies}
      </Typography>
      <Typography variant="body1">Stain: {selectedOptions.stain}</Typography>
      <Typography variant="body1">
        Leg Style: {selectedOptions.legStyle}
      </Typography>
      <Typography variant="body1">
        Leg Material: {selectedOptions.legMaterial}
      </Typography>
      <Button variant="contained" color="primary">
        Confirm Selection
      </Button>
    </div>
  );
};

export default Step4;
