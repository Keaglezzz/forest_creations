import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { useStateContext } from "../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart, Ptest } from "./";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signInWithGoogle, signOut, auth } from "../firebase";

const Navbar = (selectedVolume) => {
  const [toggle, setToggle] = useState(false);
  const { showCart, setShowCart, totalQuantities, user } = useStateContext();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <nav className={`nav ${toggle ? "mobile" : ""}`}>
      <div className="navbar-container">
        <div className="logo__img">
          <Link href="/">
            <Image src={logo} alt="Forest Creations Logo" />
          </Link>
        </div>
        {user ? (
          <div className="app__navbar-sign-out-container">
            <span className="app__navbar-greeting">
              Hello, {user.displayName}
            </span>
            <button onClick={handleSignOut} className="app__navbar-sign-out">
              Sign out
            </button>
          </div>
        ) : (
          <button onClick={signInWithGoogle} className="app__navbar-sign-in">
            Sign in
          </button>
        )}
        <div className={`app__navbar-links ${toggle ? "mobile" : ""}`}>
          <Link href="/services" className="app__navbar-link">
            Shop
          </Link>
          <Link href="/stackAways">Stack-Away Doors</Link>
          <Link href="/contact" className="app__navbar-link">
            Contact
          </Link>
          <Link href="/about" className="app__navbar-link">
            What We Do
          </Link>
          <Link href="/profile" className="app__navbar-link">
            Profile
          </Link>
        </div>

        <div
          className="app__navbar-menu-icon"
          onClick={() => setToggle(!toggle)}
        >
          <HiMenuAlt4 />
        </div>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart selectedVolume={selectedVolume} />}
      </div>

      {/* Mobile menu icon */}
      <div className="app__navbar-menu-icon" onClick={() => setToggle(!toggle)}>
        {toggle ? <HiX /> : <HiMenuAlt4 />}
      </div>

      {/* Cart icon */}
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}

      {/* Mobile menu */}
      {toggle && (
        <motion.div
          whileInView={{ x: [300, 0] }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="mobile"
        >
           {/* Corrected the onClick handler here */}
    <HiX onClick={() => setToggle(false)} className="close__icon" />
    <p
      className="logo"
      style={{ display: "contents" }}
      onClick={() => setToggle(false)}
    >
            <Link href="/">Home</Link>
            <Link href="/services">Shop</Link>
            <Link href="/stackAways">Stack-Away Doors</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">What We Do</Link>
            <Link href="/profile">Profile</Link>
          </p>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
