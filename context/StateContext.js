import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import {client} from '../lib/client';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Check if user exists, if not create new
        try {
          await client.create({
            _id: `user.${user.uid}`,
            _type: 'user',
            email: user.email,
            name: user.displayName,
            lastLogin: new Date().toISOString(),
          });
        } catch (err) {
          // If user already exists, then update last login
          await client
            .patch(`user.${user.uid}`)
            .set({ lastLogin: new Date().toISOString() })
            .commit();
        }
      } else {
        setUser(null);
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); 
  

  
// Prev onAdd
  // const onAdd = (product, quantity, selectedVolumePrice, selectedVolume = {}) => {
  //   const productWithVolumeId = `${product._id}-${product.price}`;
  //   const existingCartItem = cartItems.find((cartItem) => cartItem._id === productWithVolumeId);
  
  //   if (existingCartItem) {
  //     // If the item already exists in the cart, update the quantity
  //     const updatedCartItems = cartItems.map((cartItem) => {
  //       if (cartItem._id === productWithVolumeId) {
  //         return {
  //           ...cartItem,
  //           quantity: cartItem.quantity + quantity,
  //         };
  //       }
  //       return cartItem;
  //     });
  
  //     setCartItems(updatedCartItems);
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedVolumePrice * quantity);
  //     setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  //   } else {
  //     // If the item is new, add it to the cart
  //     const productWithVolume = {
  //       ...product,
  //       _id: productWithVolumeId,
  //       quantity,
  //       selectedVolume,
  //       selectedVolumePrice,
  //       price: selectedVolume ? selectedVolumePrice : product.price,
  //     };
  
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedVolumePrice * quantity);
  //     setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  //     setCartItems((prevCartItems) => [...prevCartItems, productWithVolume]);
  //   }
  
  //   toast.success(`${quantity} ${product.name} added to the cart.`);
  // };
  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.selectedVolumePrice * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const onAdd = (product, quantity) => {
    const productWithVolumeId = product.custom ? `custom-${product._id}-${Date.now()}` : `${product._id}-${product.price}`;
  
    const existingCartItem = cartItems.find((cartItem) => cartItem._id === productWithVolumeId);
  
    if (existingCartItem) {
      // Update quantity of existing item
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === productWithVolumeId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
        return cartItem;
      });
  
      setCartItems(updatedCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    } else {
      // Add new item
      const newProduct = {
        ...product,
        _id: productWithVolumeId,
        quantity,
      };
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      setCartItems((prevCartItems) => [...prevCartItems, newProduct]);
    }
  
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };
  
    
  const formatPrice = (value) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value);


  const toggleCartItemQuanitity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        const updatedItem = { ...item };
        if (value === 'inc') {
          updatedItem.quantity += 1;
          setTotalPrice((prevTotalPrice) => prevTotalPrice + updatedItem.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec' && updatedItem.quantity > 1) {
          updatedItem.quantity -= 1;
          if (updatedItem.selectedVolume) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice - updatedItem.selectedVolume.price);
          } else {
            setTotalPrice((prevTotalPrice) => prevTotalPrice - updatedItem.price);
          }
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
        return updatedItem;
      } else {
        return item;
      }
    });
    
    const newTotalPrice = updatedCartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    
    const newTotalQuantities = updatedCartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
    setTotalQuantities(newTotalQuantities);
  };
  
  
  
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  };
  
  
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        clearCart, 
        user,
        formatPrice,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);