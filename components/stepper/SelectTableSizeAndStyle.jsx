import React, { useState, useEffect } from 'react';
import { client } from "../../lib/client";
import { CSSTransition } from 'react-transition-group';

import { useStateContext } from "../../context/StateContext";

function SelectTableSizeAndStyle({ selectedProductType, onSelect, step }) {
  const [tableStyle, setTableStyle] = useState('');
  const [tableSize, setTableSize] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [woodSpeciesOptions, setWoodSpeciesOptions] = useState([]);
  const [selectedWoodSpecies, setSelectedWoodSpecies] = useState('');
  const [stainOptions, setStainOptions] = useState([]);
  const [selectedStain, setSelectedStain] = useState('');
  const [legStyleOptions, setLegStyleOptions] = useState([]);
  const [selectedLegStyle, setSelectedLegStyle] = useState('');
  const [legMaterialOptions, setLegMaterialOptions] = useState([]);
  const [selectedLegMaterial, setSelectedLegMaterial] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [tableStyleName, setTableStyleName] = useState('');
const [tableSizeName, setTableSizeName] = useState('');

// State for storing selected details
const [selectedStainDetail, setSelectedStainDetail] = useState({});
const [selectedStainPrice, setSelectedStainPrice] = useState('');
const [selectedLegStyleDetail, setSelectedLegStyleDetail] = useState({});
const [selectedLegStylePrice, setSelectedLegStylePrice] = useState('');
const [selectedLegMaterialDetail, setSelectedLegMaterialDetail] = useState({});
const [selectedLegMaterialPrice, setSelectedLegMaterialPrice] = useState('');

const [selectedWoodSpeciesName, setSelectedWoodSpeciesName] = useState('');
const [selectedWoodSpeciesDescription, setSelectedWoodSpeciesDescription] = useState('');
const [selectedWoodSpeciesPrice, setSelectedWoodSpeciesPrice] = useState('');
const [selectedWoodSpeciesImageUrl, setSelectedWoodSpeciesImageUrl] = useState('');
const [selectedImageUrl, setSelectedImageUrl] = useState('');
const [selectedTableStyleDetail, setSelectedTableStyleDetail] = useState({});
const [selectedTableSizeDetail, setSelectedTableSizeDetail] = useState({});
const [step1ImageUrl, setStep1ImageUrl] = useState('');
const [step2ImageUrl, setStep2ImageUrl] = useState('');
const [step3ImageUrl, setStep3ImageUrl] = useState('');

const { qty, onAdd, setShowCart } = useStateContext();

function calculateTotalPrice() {
  let total = 0;

  // Add the price of each selected option if available
  if (selectedWoodSpeciesPrice) {
    total += parseFloat(selectedWoodSpeciesPrice);
  }
  if (selectedStainDetail.price) {
    total += parseFloat(selectedStainDetail.price);
  }
  if (selectedLegStyleDetail.price) {
    total += parseFloat(selectedLegStyleDetail.price);
  }
  if (selectedLegMaterialDetail.price) {
    total += parseFloat(selectedLegMaterialDetail.price);
  }

  // Add prices for table style and size
  if (selectedTableStyleDetail.price) {
    total += parseFloat(selectedTableStyleDetail.price);
  }
  if (selectedTableSizeDetail.price) {
    total += parseFloat(selectedTableSizeDetail.price);
  }

  return total; // return as a number
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value);
}


function renderSelectionInfo() {
  let infoContent = [];
  let imageUrl = "";

  switch (currentStep) {
    case 1:
      // Table Style and Size
      if (selectedTableStyleDetail.name) {
        infoContent.push(
          <div>
            <p><strong>Table Style:</strong> {selectedTableStyleDetail.name}</p>
            <p><strong>Description:</strong> {selectedTableStyleDetail.details || 'No description available'}</p>
            <p><strong>Price:</strong> {selectedTableStyleDetail.price ? formatPrice(selectedTableStyleDetail.price) : 'Not available'}</p>
          </div>
        );
      }
      if (selectedTableSizeDetail.size) {
        infoContent.push(
          <div>
            <p><strong>Table Size:</strong> {selectedTableSizeDetail.size}</p>
            <p><strong>Description:</strong> {selectedTableSizeDetail.details || 'No description available'}</p>
            <p><strong>Price:</strong> {selectedTableSizeDetail.price ? formatPrice(selectedTableSizeDetail.price) : 'Not available'}</p>
          </div>
        );
      }
      break;

    case 2: // Wood Species and Stain
      if (selectedWoodSpeciesName) {
        infoContent.push(
          <div>
            <p><strong>Wood Species:</strong> {selectedWoodSpeciesName}</p>
            <p><strong>Description:</strong> {selectedWoodSpeciesDescription}</p>
            <p><strong>Price:</strong> {selectedWoodSpeciesPrice ? formatPrice(selectedWoodSpeciesPrice) : 'Not available'}</p>
          </div>
        );
        imageUrl = selectedWoodSpeciesImageUrl;
      }
      if (selectedStain) {
        infoContent.push(
          <div>
            <p><strong>Stain:</strong> {selectedStainDetail.name || selectedStain}</p>
            <p><strong>Description:</strong> {selectedStainDetail.details || ''}</p>
            <p><strong>Price:</strong> {selectedStainDetail.price ? formatPrice(selectedStainDetail.price) : 'Not available'}</p>
          </div>
        );
        imageUrl = selectedStainDetail.imageUrl;
      }
      break;

    case 3: // Leg Style and Material
      if (selectedLegStyle) {
        infoContent.push(
          <div>
            <p><strong>Leg Style:</strong> {selectedLegStyleDetail.name || selectedLegStyle}</p>
            <p><strong>Description:</strong> {selectedLegStyleDetail.details || ''}</p>
            <p><strong>Price:</strong> {selectedLegStyleDetail.price ? formatPrice(selectedLegStyleDetail.price) : 'Not available'}</p>
          </div>
        );
        imageUrl = selectedLegStyleDetail.imageUrl;
      }
      if (selectedLegMaterial) {
        infoContent.push(
          <div>
            <p><strong>Leg Material:</strong> {selectedLegMaterialDetail.name || selectedLegMaterial}</p>
            <p><strong>Description:</strong> {selectedLegMaterialDetail.details || ''}</p>
            <p><strong>Price:</strong> {selectedLegMaterialDetail.price ? formatPrice(selectedLegMaterialDetail.price) : 'Not available'}</p>
          </div>
        );
        imageUrl = selectedLegMaterialDetail.imageUrl;
      }
      break;

    // Add additional cases if there are more steps
  }

  return (
    <div>
      {infoContent.length > 0 ? infoContent : <p>No selection made yet.</p>}
    </div>
  );
}


  const goToNextStep = () => {
    if (currentStep < 4) { // Assuming you have 3 steps in total
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && subCategory->productType == "${selectedProductType}"]{
          _id,
          name,
          "imageUrl": image[0].asset->url,
          "details": description,
          "price": price,
          size[]->{_id, size, "imageUrl": image[0].asset->url, "details": description, "price": price}
        }`;
        const result = await client.fetch(query);
        setFilteredProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    if (selectedProductType) {
      fetchProducts();
    }
  }, [selectedProductType]);
  

const fetchOptionsFromSelectedProduct = async () => {
  try {
    if (selectedProduct) {
      const query = `*[_type == "product" && _id == "${selectedProduct._id}"]{
        woodSpecies[]->{
          name,
          "price": price,
          "details": details[].children[].text,
          "imageUrl": image[0].asset->url // Fetching the first image URL
        },
        stain[]->{
          name,
          "price": price,
          "details": details[].children[].text,
          "imageUrl": image[0].asset->url
        },
        legMaterial[]->{
          name,
          "price": price,
          "details": details[].children[].text,
          "imageUrl": image[0].asset->url
        },
        legStyle[]->{
          name,
          "price": price,
          "details": details[].children[].text,
          "imageUrl": image[0].asset->url
        },
      }[0]`;
      const result = await client.fetch(query);

      if (result) {
        setWoodSpeciesOptions(result.woodSpecies.map(ws => ({
          ...ws,
          details: ws.details ? ws.details.join(' ') : ''
        })));
        setStainOptions(result.stain.map(stain => ({
          ...stain,
          details: stain.details ? stain.details.join(' ') : ''
        })));
        setLegStyleOptions(result.legStyle.map(ls => ({
          ...ls,
          details: ls.details ? ls.details.join(' ') : ''
        })));
        setLegMaterialOptions(result.legMaterial.map(lm => ({
          ...lm,
          details: lm.details ? lm.details.join(' ') : ''
        })));
      }
    }
  } catch (error) {
    console.error("Error fetching options from selected product:", error);
  }
};

useEffect(() => {
  fetchOptionsFromSelectedProduct();
}, [selectedProduct]);


  useEffect(() => {
    const product = filteredProducts.find(p => p._id === tableStyle);
    setSelectedProduct(product);
  }, [tableStyle, filteredProducts]);

  const handleTableStyleChange = (event) => {
    const selectedId = event.target.value;
    setTableStyle(selectedId);
    if (selectedId) {
      const product = filteredProducts.find(p => p._id === selectedId);
      setTableStyleName(product.name); // Store the name
      onSelect && onSelect({ selectedProduct: product, selectedProductId: selectedId });
    }
    const product = filteredProducts.find(p => p._id === selectedId);
    setSelectedTableStyleDetail({
      name: product.name,
      imageUrl: product.imageUrl,
      details: product.details,
      price: product.price
    });
    setStep1ImageUrl(product.imageUrl);
  };
  
  const handleTableSizeChange = (event) => {
    const selectedSizeId = event.target.value;
    setTableSize(selectedSizeId);
    setTableSize(event.target.value);
    if (selectedProduct && selectedProduct.size) {
      const size = selectedProduct.size.find(s => s._id === event.target.value);
      setTableSizeName(size ? size.size : ''); // Store the size name
    }
    const sizeDetail = selectedProduct?.size?.find(s => s._id === selectedSizeId);
    if (sizeDetail) {
      setTableSizeName(sizeDetail.size);
      setSelectedTableSizeDetail({
        size: sizeDetail.size,
        imageUrl: sizeDetail.imageUrl,
        details: sizeDetail.details,
        price: sizeDetail.price
      });
      setStep1ImageUrl(sizeDetail.imageUrl); // Update the image URL for step 1
    } else {
      setTableSizeName('');
      setSelectedTableSizeDetail({});
      setStep1ImageUrl(''); // Reset the image URL
    }
  };
  

  const handleWoodSpeciesChange = (event) => {
    const selectedName = event.target.value;
    setSelectedWoodSpecies(selectedName);
  
    const selectedDetail = woodSpeciesOptions.find(item => item.name === selectedName);
    if (selectedDetail) {
      setSelectedWoodSpeciesName(selectedDetail.name);
      setSelectedWoodSpeciesDescription(selectedDetail.details || '');
      setSelectedWoodSpeciesPrice(selectedDetail.price || '');
      setSelectedWoodSpeciesImageUrl(selectedDetail.imageUrl || '');
  
      // Update the selected image URL
      setStep2ImageUrl(selectedDetail.imageUrl || '');
    } else {
      setSelectedWoodSpeciesName('');
      setSelectedWoodSpeciesDescription('');
      setSelectedWoodSpeciesPrice('');
      setSelectedWoodSpeciesImageUrl('');
      setStep2ImageUrl(selectedDetail.imageUrl || '');
    }
  };
  
  

  const handleStainChange = (event) => {
    const selectedName = event.target.value;
    setSelectedStain(selectedName);
  
    const selectedDetail = stainOptions.find(item => item.name === selectedName);
    if (selectedDetail) {
      setSelectedStainDetail({
        name: selectedDetail.name,
        details: selectedDetail.details || '',
        price: selectedDetail.price || '',
        imageUrl: selectedDetail.imageUrl || '' // Assuming you have images for stains
      });
  
      // Update the selected image URL
      setStep2ImageUrl(selectedDetail.imageUrl || '');
    } else {
      setSelectedStainDetail({});
      setStep2ImageUrl(selectedDetail.imageUrl || '');
    }
  };
  
  const handleLegStyleChange = (event) => {
    const selectedName = event.target.value;
    setSelectedLegStyle(selectedName);
  
    const selectedDetail = legStyleOptions.find(item => item.name === selectedName);
    if (selectedDetail) {
      setSelectedLegStyleDetail({
        name: selectedDetail.name,
        details: selectedDetail.details || '',
        price: selectedDetail.price || '',
        imageUrl: selectedDetail.imageUrl || '' // If you have images for leg styles
      });
     setStep3ImageUrl(selectedDetail.imageUrl || '');
    } else {
      setSelectedLegStyleDetail({});
      setStep3ImageUrl(selectedDetail.imageUrl || '');
    }
  };
  

  const handleLegMaterialChange = (event) => {
    const selectedName = event.target.value;
    setSelectedLegMaterial(selectedName);
  
    const selectedDetail = legMaterialOptions.find(item => item.name === selectedName);
    if (selectedDetail) {
      setSelectedLegMaterialDetail({
        name: selectedDetail.name,
        details: selectedDetail.details || '',
        price: selectedDetail.price || '',
        imageUrl: selectedDetail.imageUrl || '' // If you have images for leg materials
       });
    setStep3ImageUrl(selectedDetail.imageUrl || '');
  } else {
    setSelectedLegMaterialDetail({});
   setStep3ImageUrl(selectedDetail.imageUrl || '');
  }
};
  
  useEffect(() => {
    if (selectedProduct && selectedWoodSpecies && selectedStain) {
        onSelect && onSelect({
        selectedProduct,
        selectedProductId: selectedProduct._id,
        woodSpecies: selectedWoodSpecies,
        stain: selectedStain,
      });
    }
  }, [selectedProduct, selectedWoodSpecies, selectedStain, onSelect]);

  const isNextEnabled = () => {
    if (step === 1) {
      return tableStyle && tableSize;
    } else if (step === 2) {
      return selectedWoodSpecies && selectedStain;
    }
    // Add similar conditions for other steps if necessary
    return true;
  };

  const handleAddToCart = () => {
    // Calculate the total price
    const totalPrice = calculateTotalPrice();
  
    const customTable = {
      _id: 'custom-table-' + new Date().getTime(),
      name: 'Custom Table',
      price: totalPrice, // use the calculated price directly
      quantity: 1,
      image: [step1ImageUrl, step2ImageUrl, step3ImageUrl].filter(url => url), // Array of images
      selectedOptions: {
        tableStyle: tableStyleName,
        tableSize: tableSizeName,
        woodSpecies: selectedWoodSpeciesName,
        stain: selectedStainDetail.name || selectedStain,
        legStyle: selectedLegStyleDetail.name || selectedLegStyle,
        legMaterial: selectedLegMaterialDetail.name || selectedLegMaterial,
      }
    };
  
    onAdd(customTable, 1); // Add the custom table to the cart
  };
  
  

  return (
    <div className={`stepper-container ${currentStep === 4 ? 'full-width' : ''}`}>
     <div className="stepper-column"> 
     <div className="step-indicator">
        <span className="step-number">{currentStep}</span>
        <h5 className="stepper-heading">
          {currentStep === 1 ? "Select Size & Table Style" : 
           currentStep === 2 ? "Select Species & Stain" : 
           currentStep === 3 ? "Select Leg Style & Material" : 
           "Review and Confirm"} {/* Update as needed */}
        </h5>
      </div>
      {currentStep === 1 && (
        <div style={{display: 'flex'}}>
          <div className='stepper-dropdown'>
            <label className='stepper-label'>Table Style</label>
            <select value={tableStyle} onChange={handleTableStyleChange}>
              <option value="">Select an option</option>
              {filteredProducts.map(product => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className='stepper-dropdown'>
            <label className='stepper-label'>Table Size</label>
            <select value={tableSize} onChange={handleTableSizeChange}>
              <option value="">Select an option</option>
              {selectedProduct?.size?.map((size, index) => (
                <option key={index} value={size._id}>{size.size || 'Unnamed Size'}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div style={{display: 'flex'}}>
            <div className='stepper-dropdown'>
              <label className='stepper-label'>Wood Species</label>
              <select value={selectedWoodSpecies} onChange={handleWoodSpeciesChange}>
  <option value="">Select a wood species</option>
  {woodSpeciesOptions.map((species, index) => (
    <option key={index} value={species.name}>{species.name}</option>
  ))}
</select>


            </div>
            <div className='stepper-dropdown'>
              <label className='stepper-label'>Stain</label>
              <select value={selectedStain} onChange={handleStainChange}>
  <option value="">Select a stain</option>
  {stainOptions.map((option, index) => (
    <option key={index} value={option.name}>{option.name}</option>
  ))}
</select>

            </div>
        </div>
      )}
      {currentStep === 3 && (
        <div style={{display: 'flex'}}>
            <div className='stepper-dropdown'>
              <label className='stepper-label'>Leg Style</label>
              <select value={selectedLegStyle} onChange={handleLegStyleChange}>
                <option value="">Select a leg style</option>
                {legStyleOptions.map((option, index) => (
                  <option key={index} value={option.name}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className='stepper-dropdown'>
              <label className='stepper-label'>Leg Material</label>
              <select value={selectedLegMaterial} onChange={handleLegMaterialChange}>
                <option value="">Select a leg material</option>
                {legMaterialOptions.map((option, index) => (
                  <option key={index} value={option.name}>{option.name}</option>
                ))}
              </select>
          </div>
        </div>
      )}
      {currentStep === 4 && (
  <div>
    {/* <h5 className="stepper-heading">Step 4: Review Your Selections</h5> */}
    <div className="review-section">
      <p><strong>Table Style:</strong> {tableStyleName}</p>
      <p><strong>Table Size:</strong> {tableSizeName}</p>
      <p><strong>Wood Species:</strong> {selectedWoodSpecies}</p>
      <p><strong>Stain:</strong> {selectedStain}</p>
      <p><strong>Leg Style:</strong> {selectedLegStyle}</p>
      <p><strong>Leg Material:</strong> {selectedLegMaterial}</p>
    </div>
  </div>
)}

      <div className="button-group">
        {currentStep > 1 && (
          <button className="stepper-button" onClick={goToPrevStep}>Previous</button>
        )}
        {currentStep < 4 && (
        <button 
          className="stepper-button" 
          onClick={goToNextStep} 
          disabled={!isNextEnabled()}
        >
          Next
        </button>
        )}
        {currentStep == 4 && (
        <button 
          className="stepper-button"  
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        )}
      </div>
    </div>
    <div className="info-column">
      {renderSelectionInfo()}
    </div>

    <div className="image-column">
  {currentStep === 1 && step1ImageUrl ? (
    <img src={step1ImageUrl} alt="Table Style Image" style={{ width: '100%', height: 'auto' }} />
  ) : currentStep === 2 && step2ImageUrl ? (
    <img src={step2ImageUrl} alt="Wood Species Image" style={{ width: '100%', height: 'auto' }} />
  ) : currentStep === 3 && step3ImageUrl ? (
    <img src={step3ImageUrl} alt="Leg Style Image" style={{ width: '100%', height: 'auto' }} />
  ) : (
    <p>No image available</p>
  )}
</div>




<div className="total-row">
<p><strong>Total Price:</strong>{formatPrice(calculateTotalPrice())}</p>

    </div>
  </div>
);
}

export default SelectTableSizeAndStyle;
