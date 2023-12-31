// // pages/TableCreations.js
// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
// } from "@material-ui/core";
// import Step1 from "../components/Step1";

// const steps = [
//   "Step 1",
//   "Step 2",
//   "Step 3",
//   "Step 4",
//   "Step 5",
//   "Step 6",
//   "Step 7",
//   "Step 8",
//   "Step 9",
//   "Confirmation",
// ];

// const TableCreations = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleStepChange = (step) => () => {
//     setActiveStep(step);
//   };

//   // Create an array of step components to render dynamically
//   const stepComponents = [
//     <Step1 key="Step1" />, // Render Step1 component
//     // <Step2 key="Step2" />, // Render Step2 component
//     /* Add other step components */
//   ];

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Custom Table Creations
//       </Typography>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel onClick={handleStepChange(index)}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       {stepComponents[activeStep]}
//       {/* Implement the carousel of example images here based on activeStep */}
//       <Carousel
//         showThumbs={false}
//         selectedItem={activeStep}
//         dynamicHeight={false}
//       >
//         {/* Add example images corresponding to each step */}
//         <div>
//           <img src="image_for_step_1.jpg" alt="Step 1 Example" />
//         </div>
//         <div>
//           <img src="image_for_step_2.jpg" alt="Step 2 Example" />
//         </div>
//         {/* ... Repeat for all steps */}
//         <div>
//           <img src="image_for_confirmation.jpg" alt="Confirmation Example" />
//         </div>
//       </Carousel>
//     </Container>
//   );
// };

// export default TableCreations;
