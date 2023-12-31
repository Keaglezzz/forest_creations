import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import Image from "next/image";

const highlightText = (text, keywords) => {
  let parts = [text];

  keywords.forEach((keyword, index) => {
    const re = new RegExp(`(${keyword})`, "gi");
    parts = parts
      .map((part) => part.split(re))
      .reduce((acc, val) => acc.concat(val), []);
  });
  // this is to test vercel

  return (
    <span>
      {parts.map((part, index) => {
        if (
          keywords.some(
            (keyword) => part.toLowerCase() === keyword.toLowerCase()
          )
        ) {
          return (
            <span key={index} className="highlight">
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

// const HeroBanner = ({ heroBanner }) => {
//   return (
//     <div className="hero-banner-container">
//       <div className="z-hero">
//         {/* <p className="beats-solo"> */}
//         {/* {highlightText(heroBanner.smallText, ["Leading Importer"])}
//         </p> */}
//         <h1>{highlightText(heroBanner.midText, ["Refined", "Cracked"])}</h1>
//         <h2>{highlightText(heroBanner.largeText1, ["Petrochemical"])}</h2>
//         //{" "}
//         <div>
//           //{" "}
//           <Link href="/services">
//             // <button type="button">{heroBanner.buttonText}</button>
//             //{" "}
//           </Link>
//           //{" "}
//         </div>
//         //{" "}
//       </div>
//       //{" "}
//     </div>
//   );
// };

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div className="z-hero">
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h1>
          {highlightText(heroBanner.largeText1, [
            "Timeless",
            "Timber",
            "Forest",
            "Creations",
          ])}
        </h1>
        <h3>{heroBanner.largeText2}</h3>
        {/* <h3>{heroBanner.midText}</h3> */}

        <img
          src={urlFor(heroBanner.image)}
          alt="Forest Creations Products"
          className="hero-banner-image"
        />

        <div>
          <Link href="/catalog">
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
