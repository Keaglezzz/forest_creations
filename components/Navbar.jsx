import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { useStateContext} from '../context/StateContext';
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './';
import Image from "next/image";
import logo2 from '../assets/logo2.png';




const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <nav className='nav' style={{paddingBottom:'70px', display:'flex', justifyContent:'space-between', marginTop: '-20px', marginBottom: '15px'}}>
    <div className="navbar-container">
    <div className='logo__img'>
        <Link href="/">
        <Image src={logo2} alt='Synkhem Logo' />
        </Link>
      </div>
      <p className="app__navbar-links">
      <Link href="/catalog" className='app__navbar-link'>Catalog</Link>
        <Link href="/about" className='app__navbar-link'>About Us</Link>
        <Link href="/contact" className='app__navbar-link'>Contact</Link>
    </p>
    <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
      
    </div>

    <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} className='close__icon'/>
            <p className="logo" style={{display:'contents'}} onClick={() => setToggle(false)}>
            <Link href="/">Home</Link>
            <Link href="/catalog">Products</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </p>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar