import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from "@material-ui/core";
import Step1 from "./Step1"; // Selection of size and table style
import Step2 from "./Step2"; // Selection of wood species and stain
import Step3 from "./Step3"; // Leg style and leg material
import Step4 from "./Step4"; // Review

const TableCreations = ({ selectedProductType, products }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    // Filter products based on the selected subCategory and parent category
    const filteredProducts = products.filter(
      (product) =>
        product.subCategory &&
        product.subCategory.name === selectedProductType &&
        product.parentCategory &&
        product.parentCategory.name === "Table Creations"
    );
    // Extract images for the carousel
    const images = filteredProducts.flatMap((product) =>
      product.image.map((img) => img.asset.url)
    );
    setDisplayedImages(images);
  }, [selectedProductType, products]);

  const steps = [
    {
      label: "Step 1: Select Size and Table Style",
      content: (
        <Step1
          selectedTableType={selectedProductType}
          onNext={(data) => {
            setSelectedOptions({ ...selectedOptions, ...data });
            handleNext();
          }}

        />
      ),
    },
    {
      label: "Step 2: Select Wood Species and Stain",
      content: (
        <Step2
          selectedTableType={selectedProductType}
          onNext={(data) => {
            setSelectedOptions({ ...selectedOptions, ...data });
            handleNext();
          }}
        />
      ),
    },
    {
      label: "Step 3: Select Leg Style and Leg Material",
      content: (
        <Step3
          selectedTableType={selectedProductType}
          onNext={(data) => {
            setSelectedOptions({ ...selectedOptions, ...data });
            handleNext();
          }}
        />
      ),
    },
    {
      label: "Step 4: Review Your Selection",
      content: <Step4 selectedOptions={selectedOptions} />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedOptions({});
  };

  console.log("Products", products);
  // console.log("Selected Product Type", selectedProductType);

  const renderStepContent = (step) => {
    return (
      <div>
        {step.content}
        <div>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button variant="contained" color="primary" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="stepper-container">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{renderStepContent(step)}</StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default TableCreations;
