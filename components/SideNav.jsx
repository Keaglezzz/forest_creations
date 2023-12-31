import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter

const variants = {
  open: { x: 0 },
  closed: { x: "-100vw" },
};

const SideNav = (props) => {
  const { parents, onSubCategoryClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openSubDropdowns, setOpenSubDropdowns] = useState({});
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleDropdownClick = (slug) => {
    setOpenDropdowns({
      ...openDropdowns,
      [slug]: !openDropdowns[slug],
    });
  };

  const handleSubDropdownClick = (slug, subSlug, onSubCategoryClick) => {
    setOpenSubDropdowns({
      ...openSubDropdowns,
      [slug]: {
        ...openSubDropdowns[slug],
        [subSlug]: !openSubDropdowns[slug]?.[subSlug],
      },
    });

    if (onSubCategoryClick) {
      onSubCategoryClick(slug, subSlug);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        Click To View Categories
      </button>
      {isOpen && <div className="blur-bg" onClick={handleClick}></div>}
      <motion.nav
        className={`sidenav ${isOpen ? "open" : ""}`}
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        <ul>
          {parents.map((parent, index) => (
            <li key={index}>
              <a
                onClick={() => handleDropdownClick(parent.slug)}
                className="sidenav__headings"
              >
                {parent.name}
              </a>
              {openDropdowns[parent.slug] &&
                Object.values(parent.subcategories).map(
                  (subcategory, subIndex) => (
                    <ul key={subIndex}>
                      <a
                        onClick={() =>
                          handleSubDropdownClick(
                            parent.slug,
                            subcategory.slug,
                            props.onSubCategoryClick
                          )
                        }
                        className="sidenav__sub-headings"
                      >
                        {subcategory.name}
                      </a>

                      {openSubDropdowns[parent.slug]?.[subcategory.slug] && (
                        // Remove product list rendering here
                        <></>
                      )}
                    </ul>
                  )
                )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
};

export default SideNav;
