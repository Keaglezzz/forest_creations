import React from 'react';

const Step = ({ isVisible, stepContent, onSelect }) => {
    if (!isVisible) return null;
  
    return (
      <div>
        {React.cloneElement(stepContent, { onSelect })}
      </div>
    );
  };
  

export default Step;
