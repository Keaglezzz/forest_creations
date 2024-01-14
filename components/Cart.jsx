import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import { useStateContext } from '../context/StateContext';
import { urlFor, client } from '../lib/client';
import axios from 'axios';

// import getStripe from '../lib/getStripe'

const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    width: '450px', // or any other value
    height: 'auto', // or any other value
    margin: 'auto',
    padding: '20px', // or any other value
    backgroundColor: 'white', // or any other value
    border: '1px solid #ccc', // or any other value
    borderRadius: '4px', // or any other value
    position: 'relative',
  },
};

const Cart = (props) => {

  const sendConfirmationEmail = (email, items, shippingInfo) => {
    const serviceID = 'service_0g5l2vd';
    const templateID = 'template_y3ubn1m';
    const userID = 'I0nJghASCbiwlYwHT';
    
    const emailParams = {
      email: email,
      items: items.join(', '),  // make sure 'items' is an array of strings
      shippingInfo: JSON.stringify(shippingInfo),  // convert shippingInfo object to a string
    };
  
    emailjs
      .send(serviceID, templateID, emailParams, userID)
      .then(() => {
        console.log('Confirmation email sent!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}${Math.floor(
      Math.random() * 100000
    ).toString().padStart(5, '0')}`;
    return orderNumber;
  };
  
  
  function formatPrice(value) {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const company = document.getElementById("company").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    const contactNumber = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    
  
    closeModal();
    setShowCart(false);
    
    
    const yoco = new window.YocoSDK({
      publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY,
    });
    
    yoco.showPopup({
      amountInCents: totalPrice * 100,
      currency: 'ZAR',
      name: 'Synkhem',
      // description: generateDescription(),
      callback: async function (result) {
        if (result.error) {
          const errorMessage = result.error.message;
          setShowCart(true);
          toast.error("Error occurred: " + errorMessage + ". Please try again.");
        } else {
          try {

            const payload = {
              token: result.id,
              amountInCents: totalPrice * 100,
              shippingInfo: {
                company,
                name,
                address,
                city,
                zip,
                contactNumber,
              },
            };

            const response = await axios.post('/api/charge', payload ,{
              token: result.id,
              amountInCents: totalPrice * 100,
            });

            const message = payload.shippingInfo;
      
            clearCart();
            toast.success('Payment successful!');
            toast.success('A copy of your order has been emailed to you. Thank you for the support!')

            if (response.data.status === 'successful') {
              const items = cartItems.map(item => `${item.name} (Quantity: ${item.quantity})`);  // Modify this line as needed
              //To Client
              sendConfirmationEmail(email, items, JSON.stringify(payload.shippingInfo));
              //To Synkhem
              sendConfirmationEmail(email, items, JSON.stringify(payload.shippingInfo));
               // Create a new order in Sanity
const order = {
  _type: 'orders',
  name,
  email,
  orderNumber: generateOrderNumber(),
  shippingInfo: {
    company,
    address,
    city,
    zip,
    contactNumber,
  },
  items: cartItems.map((item, index) => ({  // Make sure to add 'index' here
    _type: 'orderItem',
    _key: `item-${index}`,  // Now 'index' will be defined
    name: item.name,
    quantity: item.quantity,
    customDetails: item.selectedOptions
    // other properties as needed
  })),
}

client.create(order)
  .then(res => {
    console.log(`Order was created, document ID is ${res._id}, order number is ${order.orderNumber}`)
  })
  .catch(err => {
    console.log('Error creating order:', err.message)
  })

                }                

          } catch (error) {
            setShowCart(true);
            toast.error("Error occurred: " + error.message + ". Please try again.");
          }
        }
      },
    });
  };
  

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, clearCart } = useStateContext();

  const getPriceForSelectedVolume = (item) => {
    if (item && item.selectedVolume && item.selectedVolume.price) {
      return item.selectedVolume.price;
    } else {
      // Handle cases where selectedVolume is undefined (e.g., return a default price or 0)
      return 0;
    }
  };

  // const generateDescription = () => {
  //   return cartItems
  //     .map(
  //       (item) =>
  //         `${item.name} - ${
  //           item.find(
  //             (volume) => volume.price === item.selectedVolumePrice
  //           )?.size
  //         } x ${item.quantity}`
  //     )
  //     .join(', ');
  // };
  

  useEffect(() => {
    if (typeof window !== 'undefined' && window.YocoSDK) {
      const yoco = new window.YocoSDK({
        publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY,
      });
  
      const handleYocoPayment = async () => {
        openModal();
      };
      
      
      const checkoutButton = document.querySelector('#checkout-button');
      if (checkoutButton) {
        checkoutButton.addEventListener('click', handleYocoPayment);
      }
  
      return () => {
        if (checkoutButton) {
          checkoutButton.removeEventListener('click', handleYocoPayment);
        }
      };
    }
  }, [totalPrice]);


  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Shipping Details Modal"
    style={customStyles} // Add this line
    >
    <h2>Enter Shipping Details</h2>
    <br></br>
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <label>
      Company:
      <input id="company" type="text" name="company" style={{ width: '100%' }} required/>
    </label>
    <label>
      Name:
      <input id="name" type="text" name="name" style={{ width: '100%' }} required/>
    </label>
    <label>
      Address:
      <input  id="address" type="text" name="address" style={{ width: '100%' }} required/>
    </label>
    <label>
      City:
      <input  id="city" type="text" name="city" style={{ width: '100%' }} required/>
    </label>
    <label>
      Zip:
      <input  id="zip" type="text" name="zip" style={{ width: '100%' }} required/>
    </label>
    <label>
      Contact Number:
      <input  id="contact" type="text" name="contact" style={{ width: '100%' }} required/>
    </label>
    <label>
      Email Address:
      <input  id="email" type="text" name="contact" style={{ width: '100%' }} required/>
    </label>
    <button type="submit" style={{...customStyles.close, marginTop: '5px'}} className="btn">Submit</button>
    <button className="btn" style={{...customStyles.close, marginTop: '5px'}} onClick={closeModal}>Close</button>
  </form>

</Modal>
      <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
          <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuantities} items)</span>
          </button>
  
          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping cart is empty</h3>
              <Link href="/services">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
  
          <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => {
  const isCustomTable = item._id.startsWith('custom-table-');
  return (
    <div className="product" key={item._id}>
      {item.image?.length > 0 && <img src={urlFor(item.image[0])} className="cart-product-image" alt={item.name} />}
      <div className="item-desc">
        <div className="flex top">
          <h5>{item.name}</h5>
          <h4>{formatPrice(item.price)}</h4>
        </div>
        {isCustomTable && (
          <div className="custom-table-details">
            {Object.entries(item.selectedOptions).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        )}
                <div className="flex bottom">
                  <div>
                  
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>{formatPrice(totalPrice)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={openModal} id="checkout-button">
                Proceed to shipping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);


          }
export default Cart;



