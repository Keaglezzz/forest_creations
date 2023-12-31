import React, { useState } from "react";
import Step from "./Step";
import SelectTableSizeAndStyle from "./SelectTableSizeAndStyle";

const StepperContainer = ({ onClose, selectedProductType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    sizeAndStyle: null,
    woodAndStain: null,
    legStyleAndMaterial: null,
    review: null,
  });

  const handleSelect = (stepName, data) => {
    console.log(`handleSelect: stepName - ${stepName}, data - `, data);
    setSelections((prev) => {
      const updatedSelections = { ...prev, [stepName]: data };
      console.log("Updated selections after handleSelect:", updatedSelections);
      return updatedSelections;
    });
    setCurrentStep(currentStep + 1);
  };

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      content: (
        <SelectTableSizeAndStyle
          selectedProductType={selectedProductType}
          onSelect={(data) => handleSelect("sizeAndStyle", data)}
          step={1}
        />
      ),
    },
    {
      content: (
        <SelectTableSizeAndStyle
          selectedProductType={selectedProductType}
          onSelect={(data) => handleSelect("woodAndStain", data)}
          step={2}
        />
      ),
    },
    {
      content: (
        <SelectTableSizeAndStyle
          selectedProductType={selectedProductType}
          onSelect={(data) => handleSelect("woodAndStain", data)}
          step={3}
        />
      ),
    },
    {
      content: (
        <SelectTableSizeAndStyle
          selectedProductType={selectedProductType}
          onSelect={(data) => handleSelect("review", data)}
          step={4}
        />
      ),
    },
  ];

  const stepperStyle = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "linearGradient(90deg, #0f9b0f, #012c11)",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      margin: "20px 0",
    },
    stepIndicatorContainer: {
      display: "flex",
      justifyContent: "center",
      listStyle: "none",
      padding: 0,
      marginBottom: "20px",
    },
    stepIndicator: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontWeight: "bold",
      margin: "0 10px",
    },
    activeStepIndicator: {
      backgroundColor: "#007bff",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
    },
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={stepperStyle.container}>
    <div style={{ 
        textAlign: "right", 
        background: 'linear-gradient(90deg, #0f9b0f, #012c11)' 
      }} >
        <button
          onClick={handleCancel}
          style={{
            ...stepperStyle.button,
            backgroundColor: "transparent", // Red color for the cancel/close button
          }}
        >
          ❌
        </button>
      </div>
      {/* <ul style={stepperStyle.stepIndicatorContainer}>
        {steps.map((_, index) => (
          <li
            key={index}
            style={{
              ...stepperStyle.stepIndicator,
              ...(currentStep >= index && stepperStyle.activeStepIndicator),
            }}
          >
            {index + 1}
          </li>
        ))}
      </ul> */}

      {steps.map((step, index) => (
        <Step
          key={index}
          isVisible={index === currentStep}
          stepContent={step.content}
        />
      ))}

      <div>
        {/* <button
          onClick={goToPrev}
          style={{ 
            ...stepperStyle.button,
            ...(currentStep === 0 && stepperStyle.buttonDisabled)
          }}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          style={{
            ...stepperStyle.button,
            ...(currentStep >= steps.length - 1 && stepperStyle.buttonDisabled)
          }}
          disabled={currentStep >= steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button> */}
      </div>
    </div>
  );
};

export default StepperContainer;
