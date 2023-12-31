import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const highlightText = (text, keywords) => {
  let parts = [text];

  keywords.forEach((keyword, index) => {
    const re = new RegExp(`(${keyword})`, "gi");
    parts = parts
      // .map(part => part.split(re))
      .reduce((acc, val) => acc.concat(val), []);
  });
};

//   // return (
//   //   <span>
//   //     {parts.map((part, index) => {
//   //       if (
//   // keywords.some(
//   //   (keyword) => part.toLowerCase() === keyword.toLowerCase()
//   // )
//   // ) {
//   return (
//     <span key={index} className="highlight">
//       {part}
//     </span>
//   );
// };
// // return part;
// //       })}
// //     </span>
// //   );
// // };

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc z-hero">
        <h3 style={{ color: "white" }}>
          {highlightText(largeText2, ["Synkhem Solutions"])}
        </h3>
        <p>{desc}</p>
        <Link href="/services">
          <button type="button">{buttonText}</button>
        </Link>

        <img
          src={urlFor(image)}
          className="footer-banner-image"
          alt="Synkhem Product"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
